import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useJourney } from '../../store/journey'
import { useNarration } from '../../store/narration'
import { paragraphs, t, type JourneyLang } from '../types'
import { ComparisonChart } from './ComparisonChart'
import { BEATS, UI } from './content'
import { CODEX_BEATS, preloadCodexArt, type CodexBeatSpec, type CodexPlate, type CodexVoice } from './codex'
import { focusForParagraph } from './sites'
import { JourneyPlayer } from './JourneyPlayer'
import '../../styles/baseline2026.css'

const CLOSE_MS = 420
const OPEN_MS = 720

function asideFor(beatId: string, language: JourneyLang) {
  if (beatId === 'structure') return t(UI.theaterHint, language)
  if (beatId === 'equipment') return t(UI.platformHint, language)
  if (beatId === 'scale') return t(UI.blockLegend, language)
  if (beatId === 'seas') return t(UI.westPacHint, language)
  if (beatId === 'close') return t(UI.closeHint, language)
  return ''
}

function PlateView({ plate, language }: { plate: CodexPlate; language: JourneyLang }) {
  return (
    <div className="codex-plate baseline-plate" data-aspect={plate.aspect}>
      <figure>
        <img src={plate.src} alt={t(plate.alt, language)} />
        {(plate.overlayTitle || plate.overlayNote) && (
          <figcaption className="codex-overlay-caption">
            {plate.overlayTitle && <strong>{t(plate.overlayTitle, language)}</strong>}
            {plate.overlayNote && <span>{t(plate.overlayNote, language)}</span>}
          </figcaption>
        )}
      </figure>
      <p className="codex-plate-caption">
        {t(plate.caption, language)}
        {plate.note && <span>{t(plate.note, language)}</span>}
      </p>
    </div>
  )
}

function BaselinePaper({
  voice,
  beat,
  language,
  line,
  showTitle,
  plate,
  showChart,
}: {
  voice: CodexVoice
  beat: (typeof BEATS)[number]
  language: JourneyLang
  line: string
  showTitle: boolean
  plate?: CodexPlate
  showChart?: boolean
}) {
  const aside = showTitle ? asideFor(beat.id, language) : ''
  const tag = voice === 'estimate' ? UI.estimateLabel : UI.dossierLabel
  const hasPainting = Boolean(showChart || plate)
  return (
    <article className={`baseline-paper is-${voice}${hasPainting ? ' has-plate' : ''}${showTitle ? '' : ' is-quiet'}`}>
      <div className="baseline-paper-sheet">
        <span className="codex-material-tag">{t(tag, language)}</span>
        {showTitle && <p className="codex-kicker">{t(beat.kicker, language)}</p>}
        {showTitle && <h1 className="codex-title">{t(beat.title, language)}</h1>}
        <div className="baseline-paper-split">
          <div className="baseline-copy">
            {aside && <p className="codex-aside">{aside}</p>}
            <p className="codex-spoken">{line}</p>
            <p className="codex-geo-caution">{t(UI.coordinateCaution, language)}</p>
          </div>
          {showChart ? <ComparisonChart language={language} /> : plate ? <PlateView plate={plate} language={language} /> : null}
        </div>
      </div>
    </article>
  )
}

export function JourneyCodex() {
  const beatIndex = useJourney((store) => store.beatIndex)
  const language = useJourney((store) => store.language)
  const setFocus = useJourney((store) => store.setFocus)
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

  const spec: CodexBeatSpec = CODEX_BEATS[visible.beatIndex] ?? CODEX_BEATS[0]
  const beat = BEATS[visible.beatIndex] ?? BEATS[0]
  const lines = paragraphs(beat.narration, language)
  const line = lines[Math.min(visible.paragraphIndex, Math.max(0, lines.length - 1))] ?? lines[0] ?? ''
  const voice = spec.emphasize[Math.min(visible.paragraphIndex, spec.emphasize.length - 1)] ?? 'dossier'
  const showTitle = visible.paragraphIndex === 0

  const stageClass = [
    'codex-stage',
    'baseline-stage',
    `is-${motion}`,
    `is-${voice}`,
    reducedMotion ? 'is-static' : '',
    status === 'playing' ? 'is-playing' : '',
    status === 'paused' ? 'is-paused' : '',
    showTitle ? '' : 'is-compact',
  ].filter(Boolean).join(' ')

  return (
    <div
      className="journey-codex baseline-codex"
      aria-live="polite"
      data-beat={spec.id}
      data-material={voice}
    >
      <div className="codex-vignette" aria-hidden="true" />
      <div className={stageClass}>
        <BaselinePaper
          voice={voice}
          beat={beat}
          language={language}
          line={line}
          showTitle={showTitle}
          plate={spec.id === 'scale' ? undefined : spec.plate}
          showChart={spec.id === 'scale'}
        />
      </div>
      <div className="codex-footer">
        <JourneyPlayer placement="codex" />
      </div>
    </div>
  )
}

