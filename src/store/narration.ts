import { create } from 'zustand'
import { getJourneyBeatCount, getJourneyBeats, getNarrationAudioBase, getNarrationManifestUrl } from '../journey/runtime'
import type { JourneyId } from '../journey/types'
import { useJourney } from './journey'

export type NarrationStatus = 'idle' | 'playing' | 'paused' | 'ended'
export type NarrationEngine = 'audio' | 'speech' | null
export type VoiceNote = 'chinese-only' | 'error' | null

export type NarrationParagraph = {
  index: number
  start: number
  end: number
  text: string
}

export type NarrationBeatClip = {
  id: string
  src: string
  duration: number
  paragraphs: NarrationParagraph[]
}

export type NarrationManifest = {
  voice: string
  rate: string
  lang: string
  beats: NarrationBeatClip[]
}

type NarrationState = {
  status: NarrationStatus
  currentTime: number
  duration: number
  paragraphIndex: number
  engine: NarrationEngine
  ready: boolean
  hasStarted: boolean
  voiceNote: VoiceNote
  manifest: NarrationManifest | null
  play: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  playBeat: (index: number) => void
  replay: () => void
}

const BEAT_GAP_MS = 2000

function gapAfterBeat(beatIndex: number) {
  if (beatIndex === 0) return 3200
  if (beatIndex === 5) return 2800
  return BEAT_GAP_MS
}
const TIME_EPS = 0.08
let audio: HTMLAudioElement | null = null
let manifestCache: NarrationManifest | null = null
let manifestPromise: Promise<NarrationManifest | null> | null = null
let manifestJourneyId: JourneyId | null = null
let gapTimer: number | null = null
let rafId = 0
let advancingFromAudio = false
let bound = false
let loadedBeatIndex = -1
let usingSpeech = false
let speechStartedAt = 0
let speechElapsed = 0

function activeJourneyId(): JourneyId {
  return useJourney.getState().activeJourney ?? 'force'
}

function clampBeat(index: number) {
  return Math.min(getJourneyBeatCount(activeJourneyId()) - 1, Math.max(0, Math.round(index)))
}

function resolveSrc(src: string) {
  if (/^https?:/i.test(src)) return src
  const base = import.meta.env.BASE_URL || '/'
  const path = src.replace(/^\/+/, '')
  return `${base}${base.endsWith('/') ? '' : '/'}${path}`
}

function paragraphAt(clip: NarrationBeatClip, time: number) {
  let index = 0
  for (const paragraph of clip.paragraphs) {
    if (time + TIME_EPS >= paragraph.start) index = paragraph.index
  }
  return index
}

function currentClip(): NarrationBeatClip | null {
  const manifest = manifestCache ?? useNarration.getState().manifest
  if (!manifest) return null
  return manifest.beats[useJourney.getState().beatIndex] ?? manifest.beats[0] ?? null
}

function fallbackManifest(id: JourneyId): NarrationManifest {
  const base = getNarrationAudioBase(id)
  return {
    voice: 'speechSynthesis',
    rate: '-8%',
    lang: 'zh-CN',
    beats: getJourneyBeats(id).map((beat) => {
      const paragraphs = beat.narration.zh
      const duration = Math.max(24, paragraphs.reduce((sum, line) => sum + line.length, 0) / 4.2)
      return {
        id: beat.id,
        src: `${base}/${beat.id}.mp3`,
        duration,
        paragraphs: paragraphs.map((text, index) => ({
          index,
          start: (index / paragraphs.length) * duration,
          end: ((index + 1) / paragraphs.length) * duration,
          text,
        })),
      }
    }),
  }
}

function resetManifestCache() {
  manifestCache = null
  manifestPromise = null
  manifestJourneyId = null
  loadedBeatIndex = -1
}

async function loadManifest(): Promise<NarrationManifest | null> {
  const id = activeJourneyId()
  if (manifestCache && manifestJourneyId === id) return manifestCache
  if (manifestPromise && manifestJourneyId === id) return manifestPromise
  manifestJourneyId = id
  manifestPromise = fetch(getNarrationManifestUrl(id))
    .then(async (response) => {
      if (!response.ok) throw new Error(`manifest ${response.status}`)
      const data = (await response.json()) as NarrationManifest
      if (!data?.beats?.length) throw new Error('empty manifest')
      if (activeJourneyId() !== id) return data
      manifestCache = data
      manifestJourneyId = id
      useNarration.setState({
        manifest: data,
        ready: true,
        duration: data.beats[useJourney.getState().beatIndex]?.duration ?? data.beats[0].duration,
      })
      return data
    })
    .catch(() => {
      if (activeJourneyId() !== id) return fallbackManifest(id)
      manifestCache = fallbackManifest(id)
      manifestJourneyId = id
      useNarration.setState({
        manifest: manifestCache,
        ready: true,
        duration: manifestCache.beats[0]?.duration ?? 0,
      })
      return manifestCache
    })
  return manifestPromise
}

function haltPlayback() {
  clearGap()
  stopRaf()
  cancelSpeech()
  if (audio) {
    audio.pause()
    audio.removeAttribute('src')
    try { audio.load() } catch { /* ignore */ }
  }
  loadedBeatIndex = -1
  advancingFromAudio = false
}

function switchNarrationJourney(id: JourneyId | null) {
  haltPlayback()
  resetManifestCache()
  useNarration.setState({
    status: 'idle',
    currentTime: 0,
    paragraphIndex: 0,
    duration: 0,
    engine: null,
    ready: false,
    hasStarted: false,
    voiceNote: null,
    manifest: null,
  })
  if (id) {
    manifestJourneyId = id
    void loadManifest()
  }
}

function clearGap() {
  if (gapTimer != null) {
    window.clearTimeout(gapTimer)
    gapTimer = null
  }
}

function stopRaf() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
}

function startRaf() {
  stopRaf()
  const tick = () => {
    rafId = 0
    const { status } = useNarration.getState()
    if (status !== 'playing') return
    syncClock()
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

function syncClock() {
  const clip = currentClip()
  if (!clip) return
  let currentTime = useNarration.getState().currentTime
  if (!usingSpeech && audio && Number.isFinite(audio.currentTime)) {
    currentTime = audio.currentTime
  } else if (usingSpeech && useNarration.getState().status === 'playing') {
    const elapsed = speechElapsed + (performance.now() - speechStartedAt) / 1000
    const para = clip.paragraphs[useNarration.getState().paragraphIndex]
    if (para) {
      const span = Math.max(0.2, para.end - para.start)
      currentTime = Math.min(para.end - 0.01, para.start + elapsed)
      if (currentTime - para.start > span) currentTime = para.end - 0.01
    } else {
      currentTime = Math.min(clip.duration, elapsed)
    }
  }
  const duration = clip.duration || (audio?.duration && Number.isFinite(audio.duration) ? audio.duration : 0)
  const paragraphIndex = paragraphAt(clip, currentTime)
  const prev = useNarration.getState()
  if (
    Math.abs(prev.currentTime - currentTime) < 0.008
    && prev.paragraphIndex === paragraphIndex
    && Math.abs(prev.duration - duration) < 0.01
  ) return
  useNarration.setState({ currentTime, duration, paragraphIndex })
}

function getAudio() {
  if (typeof Audio === 'undefined') return null
  if (!audio) {
    audio = new Audio()
    audio.preload = 'auto'
    audio.addEventListener('timeupdate', () => {
      if (!usingSpeech) syncClock()
    })
    audio.addEventListener('ended', () => {
      if (usingSpeech) return
      const clip = currentClip()
      if (clip) useNarration.setState({ currentTime: clip.duration, paragraphIndex: Math.max(0, clip.paragraphs.length - 1) })
      onClipEnded()
    })
    audio.addEventListener('error', () => {
      if (useNarration.getState().status !== 'playing' && useNarration.getState().status !== 'paused') return
      if (usingSpeech) return
      startSpeechFallback(useJourney.getState().beatIndex)
    })
    audio.addEventListener('loadedmetadata', () => {
      const clip = currentClip()
      const duration = clip?.duration ?? (Number.isFinite(audio?.duration) ? audio!.duration : 0)
      useNarration.setState({ duration })
    })
  }
  return audio
}

function cancelSpeech() {
  usingSpeech = false
  speechElapsed = 0
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

function pickZhVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((voice) => voice.lang === 'zh-CN' && /Yunyang/i.test(voice.name))
    ?? voices.find((voice) => voice.lang === 'zh-CN')
    ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('zh'))
    ?? null
  )
}

function languageIsZh() {
  return useJourney.getState().language === 'zh'
}

function startSpeechFallback(index: number) {
  const clip = manifestCache?.beats[clampBeat(index)]
  if (!clip) {
    useNarration.setState({ voiceNote: 'error', status: 'idle', engine: null })
    return
  }
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    useNarration.setState({ voiceNote: 'error', status: 'idle', engine: null })
    return
  }
  cancelSpeech()
  if (audio) {
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
    loadedBeatIndex = -1
  }
  usingSpeech = true
  const voice = pickZhVoice()
  const speak = (paragraph: number) => {
    if (!usingSpeech) return
    if (paragraph >= clip.paragraphs.length) {
      const latest = useNarration.getState()
      useNarration.setState({ currentTime: clip.duration, paragraphIndex: Math.max(0, clip.paragraphs.length - 1) })
      if (latest.status === 'playing') onClipEnded()
      return
    }
    const item = clip.paragraphs[paragraph]
    const utterance = new SpeechSynthesisUtterance(item.text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.86
    if (voice) utterance.voice = voice
    utterance.onstart = () => {
      speechStartedAt = performance.now()
      speechElapsed = 0
      useNarration.setState({
        status: 'playing',
        engine: 'speech',
        paragraphIndex: item.index,
        currentTime: item.start,
        duration: clip.duration,
        voiceNote: null,
        hasStarted: true,
      })
      startRaf()
    }
    utterance.onend = () => {
      if (!usingSpeech || useNarration.getState().status !== 'playing') return
      speak(paragraph + 1)
    }
    utterance.onerror = () => {
      if (!usingSpeech) return
      usingSpeech = false
      stopRaf()
      useNarration.setState({ voiceNote: 'error', status: 'idle', engine: null })
    }
    try {
      window.speechSynthesis.speak(utterance)
    } catch {
      usingSpeech = false
      useNarration.setState({ voiceNote: 'error', status: 'idle', engine: null })
    }
  }
  speak(0)
}

function onClipEnded() {
  clearGap()
  const beatIndex = useJourney.getState().beatIndex
  gapTimer = window.setTimeout(() => {
    gapTimer = null
    if (useNarration.getState().status !== 'playing') return
    const next = beatIndex + 1
    if (next >= getJourneyBeatCount(activeJourneyId())) {
      stopRaf()
      if (audio) audio.pause()
      cancelSpeech()
      const clip = currentClip()
      useNarration.setState({
        status: 'ended',
        currentTime: clip?.duration ?? useNarration.getState().duration,
        paragraphIndex: Math.max(0, (clip?.paragraphs.length ?? 1) - 1),
      })
      return
    }
    advancingFromAudio = true
    useJourney.getState().setBeat(next)
    void playClip(next)
  }, gapAfterBeat(beatIndex))
}

async function playClip(index: number) {
  if (!languageIsZh()) {
    useNarration.setState({ voiceNote: 'chinese-only', status: 'idle' })
    return
  }
  const clipIndex = clampBeat(index)
  const data = await loadManifest()
  const clip = data?.beats[clipIndex]
  if (!clip) {
    useNarration.setState({ voiceNote: 'error', status: 'idle', engine: null })
    return
  }
  clearGap()
  cancelSpeech()
  const element = getAudio()
  useNarration.setState({
    status: 'playing',
    hasStarted: true,
    voiceNote: null,
    duration: clip.duration,
    currentTime: 0,
    paragraphIndex: 0,
    engine: 'audio',
  })
  if (!element) {
    startSpeechFallback(clipIndex)
    return
  }
  try {
    const src = resolveSrc(clip.src)
    if (loadedBeatIndex !== clipIndex || !element.src.endsWith(clip.src.replace(/^\//, '')) && element.getAttribute('src') !== src) {
      element.src = src
      loadedBeatIndex = clipIndex
      element.load()
    }
    element.currentTime = 0
    const playAttempt = element.play()
    if (playAttempt) await playAttempt
    usingSpeech = false
    useNarration.setState({ engine: 'audio', voiceNote: null, status: 'playing' })
    startRaf()
  } catch {
    startSpeechFallback(clipIndex)
  }
}

function loadClipPaused(index: number) {
  const clipIndex = clampBeat(index)
  const clip = manifestCache?.beats[clipIndex]
  clearGap()
  cancelSpeech()
  stopRaf()
  if (audio) {
    audio.pause()
    if (clip) {
      const src = resolveSrc(clip.src)
      if (loadedBeatIndex !== clipIndex) {
        audio.src = src
        loadedBeatIndex = clipIndex
        audio.load()
      }
      try { audio.currentTime = 0 } catch { /* metadata may be pending */ }
    }
  }
  useNarration.setState({
    status: useNarration.getState().status === 'playing' || useNarration.getState().status === 'paused'
      ? 'paused'
      : useNarration.getState().status === 'ended'
        ? 'idle'
        : useNarration.getState().status,
    currentTime: 0,
    paragraphIndex: 0,
    duration: clip?.duration ?? 0,
    engine: audio && clip ? 'audio' : useNarration.getState().engine,
  })
}

function onExternalBeatChange(index: number) {
  const { status } = useNarration.getState()
  if (status === 'playing') {
    void playClip(index)
    return
  }
  if (status === 'paused') {
    loadClipPaused(index)
    return
  }
  const clip = manifestCache?.beats[clampBeat(index)]
  clearGap()
  useNarration.setState({
    currentTime: 0,
    paragraphIndex: 0,
    duration: clip?.duration ?? useNarration.getState().duration,
    status: status === 'ended' ? 'idle' : status,
  })
}

export function peekAudioTime() {
  if (!usingSpeech && audio && Number.isFinite(audio.currentTime)) return audio.currentTime
  return useNarration.getState().currentTime
}

export function readNarrationClock() {
  const narration = useNarration.getState()
  const beatIndex = useJourney.getState().beatIndex
  const clip = narration.manifest?.beats[beatIndex] ?? manifestCache?.beats[beatIndex]
  const currentTime = peekAudioTime()
  let paragraphIndex = narration.paragraphIndex
  let progress = 1
  if (clip) {
    paragraphIndex = paragraphAt(clip, currentTime)
    const paragraph = clip.paragraphs[paragraphIndex] ?? clip.paragraphs[0]
    if (paragraph) {
      const span = Math.max(0.001, paragraph.end - paragraph.start)
      progress = Math.min(1, Math.max(0, (currentTime - paragraph.start) / span))
    }
    if (narration.status === 'idle' && currentTime <= 0.01 && !narration.hasStarted) {
      progress = 1
      paragraphIndex = Math.max(0, clip.paragraphs.length - 1)
    } else if (narration.status === 'idle' && currentTime <= 0.01) {
      progress = 1
      paragraphIndex = Math.max(0, clip.paragraphs.length - 1)
    } else if (narration.status === 'ended') {
      progress = 1
      paragraphIndex = Math.max(0, clip.paragraphs.length - 1)
    }
  }
  return {
    beatIndex,
    paragraphIndex,
    progress,
    currentTime,
    duration: clip?.duration ?? narration.duration,
    status: narration.status,
    hasStarted: narration.hasStarted,
    clip,
  }
}

export const useNarration = create<NarrationState>((set, get) => ({
  status: 'idle',
  currentTime: 0,
  duration: 0,
  paragraphIndex: 0,
  engine: null,
  ready: false,
  hasStarted: false,
  voiceNote: null,
  manifest: null,

  play: () => {
    const { status, resume, replay, playBeat } = get()
    if (!languageIsZh()) {
      set({ voiceNote: 'chinese-only' })
      return
    }
    if (status === 'playing') return
    if (status === 'paused') {
      resume()
      return
    }
    if (status === 'ended') {
      replay()
      return
    }
    playBeat(useJourney.getState().beatIndex)
  },

  pause: () => {
    const { status } = get()
    if (status !== 'playing') return
    clearGap()
    stopRaf()
    if (usingSpeech && window.speechSynthesis) {
      window.speechSynthesis.pause()
      speechElapsed += (performance.now() - speechStartedAt) / 1000
    } else if (audio) {
      audio.pause()
      syncClock()
    }
    set({ status: 'paused' })
  },

  resume: () => {
    const { status, playBeat } = get()
    if (!languageIsZh()) {
      set({ voiceNote: 'chinese-only' })
      return
    }
    if (status === 'ended') {
      playBeat(useJourney.getState().beatIndex)
      return
    }
    if (status !== 'paused') return
    const clip = currentClip()
    const almostDone = clip && get().currentTime >= clip.duration - 0.05
    if (almostDone) {
      set({ status: 'playing' })
      onClipEnded()
      return
    }
    if (usingSpeech && window.speechSynthesis) {
      window.speechSynthesis.resume()
      speechStartedAt = performance.now()
      set({ status: 'playing', engine: 'speech', voiceNote: null })
      startRaf()
      return
    }
    const element = getAudio()
    if (!element) {
      startSpeechFallback(useJourney.getState().beatIndex)
      return
    }
    const attempt = element.play()
    const go = () => {
      set({ status: 'playing', engine: 'audio', voiceNote: null })
      startRaf()
    }
    if (attempt) attempt.then(go).catch(() => startSpeechFallback(useJourney.getState().beatIndex))
    else go()
  },

  stop: () => {
    clearGap()
    stopRaf()
    cancelSpeech()
    if (audio) {
      audio.pause()
      try { audio.currentTime = 0 } catch { /* ignore */ }
    }
    loadedBeatIndex = -1
    advancingFromAudio = false
    set({
      status: 'idle',
      currentTime: 0,
      paragraphIndex: 0,
      engine: null,
      hasStarted: false,
      voiceNote: languageIsZh() ? (get().voiceNote === 'error' ? 'error' : null) : 'chinese-only',
    })
  },

  playBeat: (index) => {
    if (!languageIsZh()) {
      set({ voiceNote: 'chinese-only' })
      return
    }
    const clipIndex = clampBeat(index)
    if (useJourney.getState().beatIndex !== clipIndex) {
      advancingFromAudio = true
      useJourney.getState().setBeat(clipIndex)
    }
    void playClip(clipIndex)
  },

  replay: () => {
    if (!languageIsZh()) {
      set({ voiceNote: 'chinese-only' })
      return
    }
    if (useJourney.getState().beatIndex !== 0) {
      advancingFromAudio = true
      useJourney.getState().setBeat(0)
    }
    void playClip(0)
  },
}))

export function bindNarrationToJourney() {
  if (bound) return
  bound = true
  useJourney.subscribe((state, previous) => {
    if (state.activeJourney !== previous.activeJourney) {
      if (!state.activeJourney) {
        useNarration.getState().stop()
        resetManifestCache()
        return
      }
      switchNarrationJourney(state.activeJourney)
      return
    }
    if (state.language !== previous.language) {
      if (state.language !== 'zh') {
        const { status, pause } = useNarration.getState()
        if (status === 'playing') pause()
        useNarration.setState({ voiceNote: 'chinese-only' })
      } else if (useNarration.getState().voiceNote === 'chinese-only') {
        useNarration.setState({ voiceNote: null })
      }
    }
    if (state.beatIndex !== previous.beatIndex && state.activeJourney) {
      if (advancingFromAudio) {
        advancingFromAudio = false
        return
      }
      onExternalBeatChange(state.beatIndex)
    }
  })
}

export async function initNarration(journeyId?: JourneyId) {
  bindNarrationToJourney()
  const id = journeyId ?? useJourney.getState().activeJourney ?? 'force'
  if (manifestJourneyId !== id) {
    haltPlayback()
    resetManifestCache()
    manifestJourneyId = id
    useNarration.setState({
      status: 'idle',
      currentTime: 0,
      paragraphIndex: 0,
      duration: 0,
      engine: null,
      ready: false,
      hasStarted: false,
      voiceNote: null,
      manifest: null,
    })
  }
  await loadManifest()
}

export function getNarrationAudio() {
  return audio
}
