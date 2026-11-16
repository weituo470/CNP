import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useJourney } from '../../store/journey'
import { useNarration } from '../../store/narration'
import { paragraphs, t, type JourneyLang } from '../types'
import { BEATS, UI } from './content'
import { MOBILIZE_PLATES, preloadMobilizePlates, type MobilizePlate } from './plates'
import { focusForParagraph } from './sites'
import { MobilizeJourneyPlayer } from './JourneyPlayer'
import '../../styles/codex.css'
import './mobilize.css'

const CLOSE_MS = 420
const OPEN_MS = 720

function asideFor(beatId: string, language: JourneyLang) {
  if (beatId === 'close') return t(UI.mergeReady, language)
  if (beatId === 'wenchuan' || beatId === 'floods' || beatId === 'epidemic' || beatId === 'rebuild' || beatId === 'warning' || beatId === 'system') {
    return t(UI.clickSites, language)
  }
  return ''
}

function PlateView({ plate, language }: { plate: MobilizePlate; language: JourneyLang }) {
  return (
    <div className="codex-plate">
      <figure>
        <img src={plate.src} alt={t(plate.alt, language)} />
      </figure>
      <p className="codex-plate-caption">{t(plate.caption, language)}</p>
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

export function MobilizeJourneyCodex() {
  const beatIndex = useJourney((store) => store.beatIndex)
  const language = useJourney((store) => store.language)
  const setFocus = useJourney((store) => store.setFocus)
  const status = useNarration((store) => store.status)
  const paragraphIndex = useNarration((store) => store.paragraphIndex)
  const reducedMotion = useReducedMotion()

  const [visible, setVisible] = useState({ beatIndex, paragraphIndex })
  const [motion, setMotion] = useState<'open' | 'closing' | 'opening'>('opening')

  useEffect(() => {
    preloadMobilizePlates()
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

  const beat = BEATS[visible.beatIndex] ?? BEATS[0]
  const lines = paragraphs(beat.narration, language)
  const line = lines[Math.min(visible.paragraphIndex, Math.max(0, lines.length - 1))] ?? lines[0] ?? ''
  const showTitle = visible.paragraphIndex === 0
  const plate = MOBILIZE_PLATES[beat.id]
  const aside = showTitle ? asideFor(beat.id, language) : ''

  const stageClass = [
    'codex-stage',
    'is-parchment',
    `is-${motion}`,
    reducedMotion ? 'is-static' : '',
    status === 'playing' ? 'is-playing' : '',
    status === 'paused' ? 'is-paused' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className="journey-codex mobilize-codex"
      aria-live="polite"
      data-beat={beat.id}
      data-material="parchment"
    >
      <div className="codex-vignette" aria-hidden="true" />
      <div className={stageClass}>
        <article className={`torn-parchment${plate ? ' has-plate' : ''}`}>
          <div className="torn-parchment-sheet">
            {showTitle && <p className="codex-kicker">{t(beat.kicker, language)}</p>}
            {showTitle && <h1 className="codex-title">{t(beat.title, language)}</h1>}
            <div className="torn-parchment-split">
              <div className="torn-copy">
                {aside && <p className="codex-aside">{aside}</p>}
                <SpokenLine line={line} dropCap={showTitle} />
                <p className="codex-geo-caution">{t(UI.coordinateCaution, language)}</p>
              </div>
              {plate && <PlateView plate={plate} language={language} />}
            </div>
          </div>
        </article>
      </div>
      <div className="codex-footer">
        <MobilizeJourneyPlayer placement="codex" />
      </div>
    </div>
  )
}
