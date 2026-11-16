import { useMemo } from 'react'
import { useJourney } from '../../store/journey'
import { useNarration } from '../../store/narration'
import { ComparisonLegend } from './ComparisonChart'
import { JourneyPlayer } from './JourneyPlayer'
import { JourneyCodex } from './JourneyCodex'
import { t, type JourneyLang, type Localized } from '../types'
import {
  BEATS,
  DOCTRINE_CARDS,
  ESTIMATE_CARDS,
  INDUSTRY_CARDS,
  INTERFACE_CARDS,
  PLATFORM_CARDS,
  SOURCE_SECTIONS,
  THEATER_CARDS,
  UI,
} from './content'
import {
  BASELINE_WINDOW,
  BEAT_COUNT,
  DOCTRINE_SITE,
  INDUSTRY_SITES,
  KOREA_INTERFACE_SITE,
  PLATFORM_SITES,
  COMPARISON_SITES,
  THEATER_SITES,
} from './sites'

function siteNote(id: string, language: JourneyLang) {
  const site = THEATER_SITES[id]
    ?? INDUSTRY_SITES[id]
    ?? PLATFORM_SITES[id]
    ?? COMPARISON_SITES[id]
    ?? (id === DOCTRINE_SITE.id ? DOCTRINE_SITE : undefined)
    ?? (id === KOREA_INTERFACE_SITE.id ? KOREA_INTERFACE_SITE : undefined)
  return site ? t(site.precisionNote, language) : ''
}

type CardView = {
  kicker: Localized
  title: Localized
  body?: Localized
  note?: Localized
  site?: string
}

export function Baseline2026Overlay() {
  const activeJourney = useJourney((store) => store.activeJourney)
  const beatIndex = useJourney((store) => store.beatIndex)
  const language = useJourney((store) => store.language)
  const setLanguage = useJourney((store) => store.setLanguage)
  const setBeat = useJourney((store) => store.setBeat)
  const advance = useJourney((store) => store.advance)
  const exitJourney = useJourney((store) => store.exitJourney)
  const selectedCardKind = useJourney((store) => store.selectedCardKind)
  const selectedCardId = useJourney((store) => store.selectedCardId)
  const closeCard = useJourney((store) => store.closeCard)
  const sourcesOpen = useJourney((store) => store.sourcesOpen)
  const toggleSources = useJourney((store) => store.toggleSources)
  const narrationStatus = useNarration((store) => store.status)

  const beat = BEATS[beatIndex] ?? BEATS[0]
  const card = useMemo<CardView | null>(() => {
    if (!selectedCardKind || !selectedCardId) return null
    if (selectedCardKind === 'theater') {
      const theater = THEATER_CARDS.find((item) => item.id === selectedCardId)
      if (!theater) return null
      return { kicker: theater.kicker, title: theater.title, body: theater.body, note: theater.note, site: siteNote(theater.id, language) }
    }
    if (selectedCardKind === 'platform') {
      const platform = PLATFORM_CARDS.find((item) => item.id === selectedCardId)
        ?? INDUSTRY_CARDS.find((item) => item.id === selectedCardId)
      if (!platform) return null
      return { kicker: platform.kicker, title: platform.title, body: platform.body, note: platform.note, site: siteNote(platform.id, language) }
    }
    if (selectedCardKind === 'estimate') {
      const estimate = ESTIMATE_CARDS.find((item) => item.id === selectedCardId)
      if (!estimate) return null
      return { kicker: estimate.kicker, title: estimate.title, body: estimate.body, note: estimate.note, site: siteNote(estimate.id, language) }
    }
    if (selectedCardKind === 'doctrine') {
      if (selectedCardId === 'korea-interface') {
        const item = INTERFACE_CARDS[0]
        return { kicker: item.kicker, title: item.title, body: item.body, note: item.note, site: siteNote(item.id, language) }
      }
      const doctrine = DOCTRINE_CARDS.find((item) => item.id === selectedCardId)
      if (!doctrine) return null
      return { kicker: doctrine.kicker, title: doctrine.title, body: doctrine.body, note: doctrine.note, site: siteNote(doctrine.id, language) }
    }
    return null
  }, [language, selectedCardId, selectedCardKind])

  if (activeJourney !== 'baseline2026') return null

  return (
    <div className={`journey-shell baseline-shell${narrationStatus === 'playing' ? ' is-cinematic' : ''}`} data-journey-chapter="baseline2026" data-journey-beat={beat.id} lang={language === 'zh' ? 'zh-CN' : 'en'}>
      <div className="journey-top">
        <div className="journey-brand">
          <small>{t(UI.brandKicker, language)}  ·  {t(UI.brandTitle, language)}</small>
          <span>{t(UI.brandWindow, language)}</span>
        </div>
        <div className="journey-toolbar">
          <div className="journey-lang" role="group" aria-label={t(UI.languageLabel, language)}>
            <button type="button" className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>{UI.langEn}</button>
            <button type="button" className={language === 'zh' ? 'is-active' : ''} aria-pressed={language === 'zh'} onClick={() => setLanguage('zh')}>{UI.langZh}</button>
          </div>
          <button type="button" className="journey-text-button" onClick={() => toggleSources(true)}>{t(UI.sourcesBtn, language)}</button>
          <button type="button" className="journey-text-button" onClick={() => exitJourney()}>{t(UI.exit, language)}</button>
        </div>
      </div>

      <JourneyCodex />

      {beat.id === 'scale' && <ComparisonLegend language={language} />}


      {card && (
        <article className="journey-card baseline-card" aria-label={t(card.title, language)}>
          <header>
            <small>{t(card.kicker, language)}</small>
            <button type="button" onClick={closeCard} aria-label={t(UI.close, language)}>{t(UI.close, language)}</button>
          </header>
          <h2>{t(card.title, language)}</h2>
          {card.body && <p>{t(card.body, language)}</p>}
          {card.note && <blockquote>{t(card.note, language)}</blockquote>}
          {card.site && <footer>{card.site}</footer>}
        </article>
      )}

      <nav className="journey-progress" aria-label={language === 'zh' ? '章节进度' : 'Chapter progress'}>
        <ol>
          {BEATS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={`${index === beatIndex ? 'is-active' : ''}${index === beatIndex && narrationStatus === 'playing' ? ' is-playing' : ''}`}
                onClick={() => setBeat(index)}
                aria-current={index === beatIndex ? 'step' : undefined}
              >
                <i>{index}</i>
                <span>{t(item.name, language)}</span>
              </button>
            </li>
          ))}
        </ol>
        <JourneyPlayer placement="progress" />
        <div className="journey-progress-actions">
          <button type="button" onClick={() => advance(-1)} disabled={beatIndex <= 0} aria-label={language === 'zh' ? '上一段' : 'Previous beat'}>←</button>
          <button type="button" onClick={() => advance(1)} disabled={beatIndex >= BEAT_COUNT - 1} aria-label={language === 'zh' ? '下一段' : 'Next beat'}>{language === 'zh' ? '继续' : 'Next'} →</button>
        </div>
        <p className="journey-hints">{t(UI.hints, language)}</p>
        <p className="journey-window">
          {language === 'zh'
            ? `时间窗：${BASELINE_WINDOW.year} 年（光标 ${BASELINE_WINDOW.cursor}）`
            : `Window: ${BASELINE_WINDOW.year}  ·  cursor ${BASELINE_WINDOW.cursor}`}
        </p>
      </nav>

      {sourcesOpen && (
        <div className="journey-sources" role="dialog" aria-modal="true" aria-labelledby="baseline-sources-title">
          <div className="journey-sources-panel">
            <header>
              <div>
                <small>{t(UI.sourcesKicker, language)}</small>
                <h2 id="baseline-sources-title">{t(UI.sourcesTitle, language)}</h2>
              </div>
              <button type="button" onClick={() => toggleSources(false)}>{t(UI.close, language)}</button>
            </header>
            <div className="journey-sources-body">
              {SOURCE_SECTIONS.map((section) => (
                <section key={t(section.title, 'en')}>
                  <h3>{t(section.title, language)}</h3>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph.en}>{t(paragraph, language)}</p>)}
                  {section.items && (
                    <ul>
                      {section.items.map((item) => <li key={item.en}>{t(item, language)}</li>)}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { Baseline2026Overlay as JourneyOverlay }
