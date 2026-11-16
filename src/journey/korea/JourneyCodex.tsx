import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useJourney } from '../../store/journey'
import { useNarration } from '../../store/narration'
import { paragraphs, t, type JourneyLang } from '../types'
import { BEATS, UI } from './content'
import { KOREA_PLATES, preloadKoreaPlates, type KoreaPlate } from './plates'
import { focusForParagraph } from './sites'
import { KoreaJourneyPlayer } from './JourneyPlayer'
import './korea.css'

const CLOSE_MS = 420
const OPEN_MS = 720

function asideFor(beatId: string, language: JourneyLang) {
  if (beatId === 'campaigns' || beatId === 'equipment' || beatId === 'mobilization') {
    return t(UI.clickSites, language)
  }
  if (beatId === 'close') return t(UI.comparisonReady, language)
  return ''
}

function PlateView({ plate, language }: { plate: KoreaPlate; language: JourneyLang }) {
  return (
    <div className="korea-plate">
      <figure>
        <img src={plate.src} alt={t(plate.alt, language)} />
        {(plate.overlayTitle || plate.overlayNote) && (
          <figcaption className="korea-overlay-caption">
            {plate.overlayTitle && <strong>{t(plate.overlayTitle, language)}</strong>}
            {plate.overlayNote && <span>{t(plate.overlayNote, language)}</span>}
          </figcaption>
        )}
      </figure>
      <p className="korea-plate-caption">
        {t(plate.caption, language)}
        {plate.note && <span>{t(plate.note, language)}</span>}
      </p>
    </div>
  )
}

function SpokenLine({ line, dropCap }: { line: string; dropCap: boolean }) {
  if (!dropCap || !line) return <p className="korea-spoken">{line}</p>
  return (
    <p className="korea-spoken is-drop">
      <span className="korea-drop">{line[0]}</span>
      {line.slice(1)}
    </p>
  )
}

export function KoreaJourneyCodex() {
  const beatIndex = useJourney((store) => store.beatIndex)
  const language = useJourney((store) => store.language)
  const setFocus = useJourney((store) => store.setFocus)
  const status = useNarration((store) => store.status)
  const paragraphIndex = useNarration((store) => store.paragraphIndex)
  const reducedMotion = useReducedMotion()

  const [visible, setVisible] = useState({ beatIndex, paragraphIndex })
  const [motion, setMotion] = useState<'open' | 'closing' | 'opening'>('opening')

  useEffect(() => {
    preloadKoreaPlates()
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
  const plate = KOREA_PLATES[beat.id]
  const aside = showTitle ? asideFor(beat.id, language) : ''

  const stageClass = [
    'korea-stage',
    `is-${motion}`,
    plate ? 'has-plate' : '',
    reducedMotion ? 'is-static' : '',
    status === 'playing' ? 'is-playing' : '',
    status === 'paused' ? 'is-paused' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="korea-codex" aria-live="polite" data-beat={beat.id}>
      <div className="korea-vignette" aria-hidden="true" />
      <div className={stageClass}>
        <article className={`korea-brief${plate ? ' has-plate' : ''}`}>
          <div className="korea-brief-sheet">
            {showTitle && <p className="korea-material-tag">{t(UI.briefingRoll, language)}</p>}
            {showTitle && <p className="korea-kicker">{t(beat.kicker, language)}</p>}
            {showTitle && <h1 className="korea-title">{t(beat.title, language)}</h1>}
            <div className="korea-brief-split">
              <div className="korea-copy">
                {aside && <p className="korea-aside">{aside}</p>}
                <SpokenLine line={line} dropCap={showTitle} />
                <p className="korea-geo-caution">{t(UI.coordinateCaution, language)}</p>
              </div>
              {plate && <PlateView plate={plate} language={language} />}
            </div>
          </div>
        </article>
      </div>
      <div className="korea-footer">
        <KoreaJourneyPlayer placement="codex" />
      </div>
    </div>
  )
}
