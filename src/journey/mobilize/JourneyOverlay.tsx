import { useMemo } from 'react'
import { useJourney } from '../../store/journey'
import { useNarration } from '../../store/narration'
import { t } from '../types'
import { BEATS, SOURCE_SECTIONS, UI, findMobilizeCard, type SourceKind } from './content'
import { BEAT_COUNT, SITE_INDEX } from './sites'
import { MobilizeJourneyCodex } from './JourneyCodex'
import { MobilizeJourneyPlayer } from './JourneyPlayer'
import './mobilize.css'

export function MobilizeOverlay() {
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
  const card = useMemo(() => {
    if (!selectedCardKind || !selectedCardId) return null
    const found = findMobilizeCard(selectedCardKind, selectedCardId)
    if (!found) return null
    const site = SITE_INDEX[selectedCardId]
    return {
      kicker: found.kicker,
      title: found.title,
      body: found.body,
      note: 'note' in found ? found.note : undefined,
      sourceKind: found.sourceKind as SourceKind,
      site: site ? t(site.precisionNote, language) : '',
    }
  }, [language, selectedCardId, selectedCardKind])

  if (activeJourney !== 'mobilize') return null

  const sourceLabels: Record<SourceKind, string> = {
    official: t(UI.officialLabel, language),
    estimate: t(UI.estimateLabel, language),
    typological: t(UI.typological, language),
  }
  const sourceLabel = card ? sourceLabels[card.sourceKind] : t(UI.typological, language)

  return (
    <div
      className={`journey-shell mobilize-shell${narrationStatus === 'playing' ? ' is-cinematic' : ''}`}
      data-journey-chapter="mobilize"
      data-journey-beat={beat.id}
      lang={language === 'zh' ? 'zh-CN' : 'en'}
    >
      <div className="journey-top">
        <div className="journey-brand">
          <small>{t(UI.brandKicker, language)}  ·  {t(UI.brandTitle, language)}</small>
          <span>{language === 'zh' ? '今地图上的代表性或遗址坐标  ·  官方公布与外部估计分开标注' : 'Representative or site coordinates on the present-day globe  ·  official announcements kept distinct from external estimates'}</span>
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

      <MobilizeJourneyCodex />

      {card && (
        <article className="journey-card" aria-label={t(card.title, language)}>
          <header>
            <small>{t(card.kicker, language)}</small>
            <button type="button" onClick={closeCard} aria-label={t(UI.close, language)}>{t(UI.close, language)}</button>
          </header>
          <span className={`source-tag is-${card.sourceKind}`}>{sourceLabel}</span>
          <h2>{t(card.title, language)}</h2>
          <p>{t(card.body, language)}</p>
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
        <MobilizeJourneyPlayer placement="progress" />
        <div className="journey-progress-actions">
          <button type="button" onClick={() => advance(-1)} disabled={beatIndex <= 0} aria-label={language === 'zh' ? '上一段' : 'Previous beat'}>←</button>
          <button type="button" onClick={() => advance(1)} disabled={beatIndex >= BEAT_COUNT - 1} aria-label={language === 'zh' ? '下一段' : 'Next beat'}>{language === 'zh' ? '继续' : 'Next'} →</button>
        </div>
        <p className="journey-hints">{t(UI.hints, language)}</p>
        <p className="journey-window">{t(UI.windowNote, language)}</p>
      </nav>

      {sourcesOpen && (
        <div className="journey-sources" role="dialog" aria-modal="true" aria-labelledby="mobilize-sources-title">
          <div className="journey-sources-panel">
            <header>
              <div>
                <small>{t(UI.sourcesKicker, language)}</small>
                <h2 id="mobilize-sources-title">{t(UI.sourcesTitle, language)}</h2>
              </div>
              <button type="button" onClick={() => toggleSources(false)}>{t(UI.close, language)}</button>
            </header>
            <div className="journey-sources-body">
              {SOURCE_SECTIONS.map((section) => (
                <section key={t(section.title, 'en')}>
                  <h3>{t(section.title, language)}</h3>
                  {'paragraphs' in section && section.paragraphs?.map((paragraph) => <p key={paragraph.en}>{t(paragraph, language)}</p>)}
                  {'items' in section && section.items && (
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
