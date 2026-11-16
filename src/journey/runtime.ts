/**
 * Thin shared registry so the journey and narration stores can stay journey-aware
 * without importing journey-specific flags into force modules.
 *
 * Merge note: force continues to own BEAT_STAGING / THEATER_SITES / BEATS.
 * baseline2026 and korea own their own tables. This file is the shared wiring point.
 *
 * `registry.ts` re-exports the same helpers for documentation and for a later
 * three-way merge. Keep the function signatures here stable.
 */
import { BEATS as BASELINE_BEATS } from './baseline2026/content'
import { BEAT_COUNT as BASELINE_BEAT_COUNT, BEAT_STAGING as BASELINE_STAGING, SITE_INDEX as BASELINE_SITES } from './baseline2026/sites'
import { BEATS as FORCE_BEATS } from './force/content'
import { BEAT_COUNT as FORCE_BEAT_COUNT, BEAT_STAGING as FORCE_STAGING, THEATER_SITES as FORCE_SITES } from './force/sites'
import { BEATS as KOREA_BEATS } from './korea/content'
import { BEAT_COUNT as KOREA_BEAT_COUNT, BEAT_STAGING as KOREA_STAGING, SITE_INDEX as KOREA_SITES } from './korea/sites'
import { BEATS as MOBILIZE_BEATS } from './mobilize/content'
import { BEAT_COUNT as MOBILIZE_BEAT_COUNT, BEAT_STAGING as MOBILIZE_STAGING, SITE_INDEX as MOBILIZE_SITES } from './mobilize/sites'
import type { JourneyBeat, JourneyCameraStaging, JourneyId, JourneySite } from './types'

export function getJourneyBeatCount(id: JourneyId): number {
  if (id === 'mobilize') return MOBILIZE_BEAT_COUNT
  if (id === 'korea') return KOREA_BEAT_COUNT
  if (id === 'baseline2026') return BASELINE_BEAT_COUNT
  return FORCE_BEAT_COUNT
}

export function getJourneyStaging(id: JourneyId, index: number): JourneyCameraStaging {
  const staging = id === 'mobilize'
    ? MOBILIZE_STAGING
    : id === 'korea'
      ? KOREA_STAGING
      : id === 'baseline2026'
        ? BASELINE_STAGING
        : FORCE_STAGING
  const beatIndex = Math.min(staging.length - 1, Math.max(0, Math.round(index)))
  const row = staging[beatIndex] ?? staging[0]
  return { cursor: row.cursor, focus: row.focus }
}

export function getJourneySite(id: JourneyId | null, siteId: string): JourneySite | undefined {
  if (id === 'mobilize') return MOBILIZE_SITES[siteId]
  if (id === 'korea') return KOREA_SITES[siteId]
  if (id === 'baseline2026') return BASELINE_SITES[siteId]
  if (id === 'force') return FORCE_SITES[siteId]
  return undefined
}

export function getJourneyBeats(id: JourneyId): readonly JourneyBeat[] {
  if (id === 'mobilize') return MOBILIZE_BEATS
  if (id === 'korea') return KOREA_BEATS
  if (id === 'baseline2026') return BASELINE_BEATS
  return FORCE_BEATS
}

export function getNarrationManifestUrl(id: JourneyId) {
  const base = import.meta.env.BASE_URL || '/'
  const path = id === 'mobilize'
    ? 'audio/mobilize/zh/manifest.json'
    : id === 'korea'
      ? 'audio/korea/zh/manifest.json'
      : id === 'baseline2026'
        ? 'audio/baseline2026/zh/manifest.json'
        : 'audio/zh/manifest.json'
  const url = `${base}${base.endsWith('/') ? '' : '/'}${path}`
  return id === 'mobilize' || id === 'korea' || id === 'baseline2026' ? url : `${url}?v=20261116c`
}

export function getNarrationAudioBase(id: JourneyId) {
  if (id === 'mobilize') return '/audio/mobilize/zh'
  if (id === 'korea') return '/audio/korea/zh'
  if (id === 'baseline2026') return '/audio/baseline2026/zh'
  return '/audio/zh'
}
