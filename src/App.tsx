import { useEffect, useMemo } from 'react'
import { EarthCanvas } from './components/earth/EarthScene'
import { JourneyOverlay, KoreaJourneyOverlay, MobilizeOverlay, useAppJourney } from './journey'
import { Baseline2026Overlay } from './journey/baseline2026/JourneyOverlay'
import { UI as BASELINE_UI } from './journey/baseline2026/content'
import { UI as FORCE_UI } from './journey/force/content'
import { UI as KOREA_UI } from './journey/korea/content'
import { UI as MOBILIZE_UI } from './journey/mobilize/content'
import { t, type JourneyId } from './journey/types'
import { useJourney } from './store/journey'
import './App.css'

const TITLES: Record<JourneyId, { en: string; zh: string }> = {
  force: { en: 'Force · Chapter I — Warring States', zh: '力 · 第一章：战国' },
  korea: { en: 'Force · Resist US Aggression and Aid Korea', zh: '力 · 抗美援朝' },
  baseline2026: { en: 'Force · 2026 Military Baseline', zh: '力 · 2026 军力基线' },
  mobilize: { en: 'Force · Disaster Response and Mobilization', zh: '力 · 灾难应对与动员' },
}

const BRAND: Record<JourneyId, { kicker: { en: string; zh: string }; title: { en: string; zh: string } }> = {
  force: {
    kicker: { en: 'Earth Force', zh: '地球·力' },
    title: { en: 'Force  ·  Chapter I: Warring States', zh: '力  ·  第一章：战国' },
  },
  korea: {
    kicker: { en: 'Earth Force', zh: '地球·力' },
    title: { en: 'Resist US Aggression and Aid Korea  ·  1950–1953', zh: '抗美援朝  ·  1950–1953' },
  },
  baseline2026: {
    kicker: { en: 'Earth Force', zh: '地球·力' },
    title: { en: 'Force  ·  2026 Military Baseline', zh: '力  ·  2026 军力基线' },
  },
  mobilize: {
    kicker: { en: 'Earth Force', zh: '地球·力' },
    title: { en: 'Disaster Response and Mobilization', zh: '灾难应对与动员能力' },
  },
}

const JOURNEY_ORDER: JourneyId[] = ['force', 'baseline2026', 'korea', 'mobilize']

function enterLabel(id: JourneyId, language: 'en' | 'zh', reenter: boolean) {
  if (id === 'korea') return t(reenter ? KOREA_UI.reenter : KOREA_UI.enterKorea, language)
  if (id === 'baseline2026') return t(BASELINE_UI.enter, language)
  if (id === 'mobilize') return t(reenter ? MOBILIZE_UI.reenter : MOBILIZE_UI.enter, language)
  return t(FORCE_UI.enter, language)
}

export default function App() {
  useAppJourney()
  const activeJourney = useJourney((store) => store.activeJourney)
  const lastExitedJourney = useJourney((store) => store.lastExitedJourney)
  const language = useJourney((store) => store.language)
  const startJourney = useJourney((store) => store.startJourney)
  const journeyFocus = useJourney((store) => store.focus)
  const canvasFocus = useMemo(
    () => journeyFocus ? { lat: journeyFocus.lat, lon: journeyFocus.lon } : undefined,
    [journeyFocus],
  )
  const journeyActive = activeJourney === 'force' || activeJourney === 'korea' || activeJourney === 'baseline2026' || activeJourney === 'mobilize'
  const chromeJourney = activeJourney ?? lastExitedJourney ?? 'force'
  const otherJourneys = JOURNEY_ORDER.filter((id) => id !== chromeJourney)

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    const titleFor = activeJourney ?? lastExitedJourney
    document.title = titleFor
      ? (language === 'zh' ? TITLES[titleFor].zh : TITLES[titleFor].en)
      : (language === 'zh' ? '地球·力' : 'Earth Force')
  }, [activeJourney, language, lastExitedJourney])

  return (
    <div className={`app-root${journeyActive ? ' is-journey' : ''}`} data-lang={language} data-journey={activeJourney ?? ''}>
      {!journeyActive && (
        <header className="app-chrome">
          <div className="app-brand">
            <small>{language === 'zh' ? BRAND[chromeJourney].kicker.zh : BRAND[chromeJourney].kicker.en}</small>
            <strong>{language === 'zh' ? BRAND[chromeJourney].title.zh : BRAND[chromeJourney].title.en}</strong>
          </div>
          <div className="app-chrome-actions">
            <button type="button" className="is-primary" onClick={() => startJourney(chromeJourney)}>
              {enterLabel(chromeJourney, language, chromeJourney === lastExitedJourney)}
            </button>
            {otherJourneys.map((id) => (
              <button type="button" key={id} onClick={() => startJourney(id)}>
                {enterLabel(id, language, false)}
              </button>
            ))}
          </div>
        </header>
      )}

      <EarthCanvas focus={canvasFocus} journeyActive={journeyActive} />
      <JourneyOverlay />
      <Baseline2026Overlay />
      <KoreaJourneyOverlay />
      <MobilizeOverlay />
    </div>
  )
}
