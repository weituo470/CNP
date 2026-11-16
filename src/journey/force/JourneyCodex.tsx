import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useJourney } from '../../store/journey'
import { useNarration } from '../../store/narration'
import { paragraphs, t, type JourneyLang } from '../types'
import { BEATS, UI } from './content'
import { CODEX_BEATS, preloadCodexArt, type CodexBeatSpec, type CodexPlate } from './codex'
import { focusForParagraph } from './sites'
import { JourneyPlayer } from './JourneyPlayer'
import '../../styles/codex.css'

const CLOSE_MS = 420
const OPEN_MS = 720

type Surface = {
  key: string
  material: 'bamboo' | 'parchment'
  plate?: CodexPlate
  compact: boolean
  crop?: 'east' | 'west'
  line: string
  showTitle: boolean
}

function asideFor(beatId: string, language: JourneyLang) {
  if (beatId === 'weapons') return t(UI.inspectHint, language)
  if (beatId === 'scale') return t(UI.blockLegend, language)
  if (beatId === 'strategy') return t(UI.strategyHint, language)
  if (beatId === 'close') return t(UI.continueHint, language)
  return ''
}

function resolveSurface(spec: CodexBeatSpec, beatId: string, line: string, paragraphIndex: number, showTitle: boolean): Surface {
  const emphasis = spec.emphasize[Math.min(paragraphIndex, spec.emphasize.length - 1)] ?? spec.emphasize[0]
  const compact = beatId === 'hook' && paragraphIndex === 3

  // One surface for the whole chapter: the torn cream parchment the user referenced.
  // Keep east/west plates so the illustration still follows the narration.
  if (beatId === 'scale' && spec.sharedPlate) {
    return {
      key: `${beatId}-${paragraphIndex}`,
      material: 'parchment',
      plate: spec.sharedPlate,
      compact: false,
      crop: paragraphIndex === 0 ? 'west' : 'east',
      line,
      showTitle,
    }
  }

  if (beatId === 'close' && spec.sharedPlate) {
    return {
      key: `${beatId}-${paragraphIndex}`,
      material: 'parchment',
      plate: spec.sharedPlate,
      compact: false,
      line,
      showTitle,
    }
  }

  const plate = compact
    ? undefined
    : emphasis === 'parchment'
      ? (spec.parchmentPlate ?? spec.bambooPlate)
      : (spec.bambooPlate ?? spec.parchmentPlate)

  return {
    key: `${beatId}-${paragraphIndex}-parchment`,
    material: 'parchment',
    plate,
    compact,
    line,
    showTitle,
  }
}

function PlateView({
  plate,
  language,
  crop,
}: {
  plate: CodexPlate
  language: JourneyLang
  crop?: 'east' | 'west'
}) {
  return (
    <div className="codex-plate" data-aspect={plate.aspect} data-crop={crop}>
      <figure>
        <img src={plate.src} alt={t(plate.alt, language)} />
        {(plate.overlayTitle || plate.overlayNote) && (
          <figcaption className="codex-overlay-caption">
            {plate.overlayTitle && <strong>{t(plate.overlayTitle, language)}</strong>}
            {plate.overlayNote && <span>{t(plate.overlayNote, language)}</span>}
          </figcaption>
        )}
      </figure>
      {plate.dual && (
        <div className="codex-dual">
          <p>
            <i>{language === 'zh' ? '左 · 东' : 'Left · East'}</i>
            <strong>{t(plate.dual.east, language)}</strong>
          </p>
          <p>
            <i>{language === 'zh' ? '右 · 西' : 'Right · West'}</i>
            <strong>{t(plate.dual.west, language)}</strong>
          </p>
        </div>
      )}
      <p className="codex-plate-caption">
        {t(plate.caption, language)}
        {plate.note && <span>{t(plate.note, language)}</span>}
      </p>
    </div>
  )
}

function SpokenLine({ line, dropCap }: { line: string; dropCap: boolean }) {
  if (!dropCap || !line) return <p className="codex-spoken">{line}</p>
  return (
    <p className="codex-spoken is-drop">
      <span className="codex-drop">{line[0]}</span>
      {line.slice(1)}
    </p>
  )
}

function TornParchment({
  surface,
  beat,
  language,
  note,
}: {
  surface: Surface
  beat: (typeof BEATS)[number]
  language: JourneyLang
  note?: string
}) {
  const aside = surface.showTitle ? asideFor(beat.id, language) : ''
  return (
    <article className={`torn-parchment${surface.compact ? ' is-compact' : ''}${surface.plate ? ' has-plate' : ''}`}>
      <div className="torn-parchment-sheet">
        {surface.showTitle && <p className="codex-kicker">{t(beat.kicker, language)}</p>}
        {surface.showTitle && <h1 className="codex-title">{t(beat.title, language)}</h1>}
        <div className="torn-parchment-split">
          <div className="torn-copy">
            {aside && <p className="codex-aside">{aside}</p>}
            {note && <p className="codex-aside">{note}</p>}
            <SpokenLine line={surface.line} dropCap={surface.showTitle} />
            <p className="codex-geo-caution">{t(UI.coordinateCaution, language)}</p>
          </div>
          {surface.plate && <PlateView plate={surface.plate} language={language} crop={surface.crop} />}
        </div>
      </div>
    </article>
  )
}

export function JourneyCodex() {
  const beatIndex = useJourney((store) => store.beatIndex)
  const language = useJourney((store) => store.language)
  const setFocus = useJourney((store) => store.setFocus)
  const diveProgress = useJourney((store) => store.diveProgress)
  const status = useNarration((store) => store.status)
  const paragraphIndex = useNarration((store) => store.paragraphIndex)
  const reducedMotion = useReducedMotion()

  const [visible, setVisible] = useState({ beatIndex, paragraphIndex })
  const [motion, setMotion] = useState<'open' | 'closing' | 'opening'>('opening')

  useEffect(() => {
    preloadCodexArt()
  }, [])

  useEffect(() => {
    setFocus(focusForParagraph(beatIndex, paragraphIndex))
  }, [beatIndex, paragraphIndex, setFocus])

  useEffect(() => {
    if (visible.beatIndex === beatIndex && visible.paragraphIndex === paragraphIndex) return
    if (reducedMotion) {
      setVisible({ beatIndex, paragraphIndex })
      setMotion('open')
      return
    }
    setMotion('closing')
    const closeTimer = window.setTimeout(() => {
      setVisible({ beatIndex, paragraphIndex })
      setMotion('opening')
    }, CLOSE_MS)
    return () => window.clearTimeout(closeTimer)
  }, [beatIndex, paragraphIndex, reducedMotion, visible.beatIndex, visible.paragraphIndex])

  useEffect(() => {
    if (motion !== 'opening') return
    if (reducedMotion) {
      setMotion('open')
      return
    }
    const openTimer = window.setTimeout(() => setMotion('open'), OPEN_MS)
    return () => window.clearTimeout(openTimer)
  }, [motion, reducedMotion, visible])

  const spec = CODEX_BEATS[visible.beatIndex] ?? CODEX_BEATS[0]
  const beat = BEATS[visible.beatIndex] ?? BEATS[0]
  const lines = paragraphs(beat.narration, language)
  const line = lines[Math.min(visible.paragraphIndex, Math.max(0, lines.length - 1))] ?? lines[0] ?? ''
  const surface = resolveSurface(spec, beat.id, line, visible.paragraphIndex, visible.paragraphIndex === 0)
  const strategyNote = beat.id === 'strategy' && visible.paragraphIndex === 2
    ? t(UI.farNear, language)
    : undefined

  const diving = diveProgress > 0.12
  const divingDeep = diveProgress > 0.58
  const battleCaption = language === 'zh'
    ? '示意：列国交战的阵列与密度，不是某一战场的复原，也不把文献里的巨大数字铺到画面上。'
    : 'Typological: formations and density of Warring States armies — not a reconstruction of one battlefield, and not a source’s unverified total.'

  const stageClass = [
    'codex-stage',
    `is-${motion}`,
    `is-${surface.material}`,
    reducedMotion ? 'is-static' : '',
    status === 'playing' ? 'is-playing' : '',
    status === 'paused' ? 'is-paused' : '',
    surface.compact ? 'is-compact' : '',
    diving ? 'is-diving' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={`journey-codex${diving ? ' is-diving' : ''}${divingDeep ? ' is-diving-deep' : ''}`}
      aria-live="polite"
      data-beat={spec.id}
      data-material={surface.material}
    >
      <div className="codex-vignette" aria-hidden="true" />
      <div className={stageClass}>
        <TornParchment surface={surface} beat={beat} language={language} note={strategyNote} />
      </div>
      <p className="battle-caption">{battleCaption}</p>
      <div className="codex-footer">
        <JourneyPlayer placement="codex" />
      </div>
      <JourneyPlayer placement="ghost" />
    </div>
  )
}
