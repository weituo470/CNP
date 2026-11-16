import { useJourney } from '../../store/journey'
import { t, type JourneyLang } from '../types'
import {
  COMPARISON_AXES,
  COMPARISON_COUNTRIES,
  COMPARISON_MAX,
  formatAircraft,
  formatPersonnel,
  formatSpendingBillions,
  type ComparisonAxisId,
  type ComparisonCountry,
} from './comparison'

function barWidth(axis: ComparisonAxisId, value: number | undefined): string {
  if (value == null || value <= 0) return '0%'
  return `${Math.max(3, (value / COMPARISON_MAX[axis]) * 100)}%`
}

function cellValue(country: ComparisonCountry, axis: ComparisonAxisId, language: JourneyLang): string {
  if (axis === 'personnel') {
    return country.personnel != null ? formatPersonnel(country.personnel, language) : '—'
  }
  if (axis === 'spending') {
    if (country.spending == null) {
      return language === 'zh' ? '表1未列' : 'not in Table 1'
    }
    return formatSpendingBillions(country.spending, language, Boolean(country.spendingEstimated))
  }
  return country.aircraft != null ? formatAircraft(country.aircraft, language) : '—'
}

function axisValue(country: ComparisonCountry, axis: ComparisonAxisId): number | undefined {
  if (axis === 'personnel') return country.personnel
  if (axis === 'spending') return country.spending
  return country.aircraft
}

export function ComparisonChart({ language }: { language: JourneyLang }) {
  const openCard = useJourney((store) => store.openCard)
  const selectedCardKind = useJourney((store) => store.selectedCardKind)
  const selectedCardId = useJourney((store) => store.selectedCardId)

  return (
    <div className="baseline-compare-chart" role="group" aria-label={language === 'zh' ? '主要力量量级对照，示意' : 'Schematic magnitude comparison'}>
      <header>
        <p className="baseline-compare-kicker">{language === 'zh' ? '对照表  ·  示意  ·  不是记分牌' : 'Comparison  ·  schematic  ·  not a scoreboard'}</p>
        <ul className="baseline-compare-swatches">
          {COMPARISON_AXES.map((axis) => (
            <li key={axis.id}>
              <i className={`is-${axis.id}`} aria-hidden="true" />
              <span>{t(axis.label, language)}</span>
            </li>
          ))}
        </ul>
      </header>
      <div className="baseline-compare-table" role="table">
        <div className="baseline-compare-head" role="row">
          <span role="columnheader">{language === 'zh' ? '国家' : 'Country'}</span>
          {COMPARISON_AXES.map((axis) => (
            <span key={axis.id} role="columnheader">{t(axis.short, language)}</span>
          ))}
        </div>
        {COMPARISON_COUNTRIES.map((country) => {
          const active = selectedCardKind === 'estimate' && selectedCardId === country.id
          const focus = country.site
            ? { lat: country.site.lat, lon: country.site.lon, distance: 3.85 }
            : undefined
          return (
            <button
              key={country.id}
              type="button"
              className={`baseline-compare-row${active ? ' is-active' : ''}${country.onGlobe ? '' : ' is-chart-only'}`}
              role="row"
              onClick={() => openCard('estimate', country.id, focus)}
            >
              <strong role="cell">
                {t(country.name, language)}
                {!country.onGlobe && (
                  <em>{language === 'zh' ? '仅表' : 'chart only'}</em>
                )}
              </strong>
              {COMPARISON_AXES.map((axis) => {
                const value = axisValue(country, axis.id)
                return (
                  <span key={axis.id} role="cell" className={`is-${axis.id}`}>
                    <b style={{ width: barWidth(axis.id, value) }} />
                    <small>{cellValue(country, axis.id, language)}</small>
                  </span>
                )
              })}
            </button>
          )
        })}
      </div>
      <footer>
        <p>
          {language === 'zh'
            ? '阴影为外部估计。人数：IISS 2026 公开转述（2025 年现役）。军费：SIPRI 2025 年表1，方括号为估计；世界军费 28,870 亿美元，前五名占 58%。作战飞机：FlightGlobal 2026，不可与全部军用飞机总数混用。海军口径差得太远，不叠成柱。不是记分牌。点击一行打开说明。'
            : 'Hatched = external estimate. Personnel: IISS 2026 open summary (active, 2025). Spending: SIPRI 2025 Table 1, brackets = estimate; world $2,887 billion, top five 58%. Combat aircraft: FlightGlobal 2026, not interchangeable with all-aircraft totals. Navy hulls are not stacked. Not a scoreboard. Click a row for sources.'}
        </p>
      </footer>
    </div>
  )
}

export function ComparisonLegend({ language }: { language: JourneyLang }) {
  return (
    <aside className="baseline-compare-legend" aria-label={language === 'zh' ? '量级图例' : 'Magnitude legend'}>
      <small>{language === 'zh' ? '三轴  ·  示意' : 'Three axes  ·  schematic'}</small>
      <ul>
        {COMPARISON_AXES.map((axis) => (
          <li key={axis.id}>
            <i className={`is-${axis.id}`} aria-hidden="true" />
            <span>
              <b>{t(axis.short, language)}</b>
              <em>{t(axis.unit, language)}</em>
            </span>
          </li>
        ))}
      </ul>
      <p>{language === 'zh' ? '阴影 = 外部估计。不是总部或基地，也不是记分牌。' : 'Hatched = external estimate. Not HQs or bases, and not a scoreboard.'}</p>
    </aside>
  )
}
