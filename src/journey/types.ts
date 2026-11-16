import type { CalendarModel, CoordinateCertainty, HistoryLens, SpaceMode, TimelineGranularity } from '../types'

export type JourneyId = 'force' | 'baseline2026' | 'korea' | 'mobilize'

export type JourneyLang = 'en' | 'zh'
export type JourneyCardKind =
  | 'theater'
  | 'weapon'
  | 'institution'
  | 'formation'
  | 'changping'
  | 'platform'
  | 'estimate'
  | 'doctrine'
  | 'campaign'
  | 'equipment'
  | 'site'

export type Localized = { en: string; zh: string }
export type LocalizedParagraphs = { en: readonly string[]; zh: readonly string[] }

export type JourneyBeat = {
  id: string
  name: Localized
  kicker: Localized
  title: Localized
  body: Localized
  narration: LocalizedParagraphs
}

export type ExperienceSnapshot = {
  spaceMode: SpaceMode
  historyLens: HistoryLens
  granularity: TimelineGranularity
  calendarCursor: string
  calendarModel: CalendarModel
  isPlaying: boolean
  selectedEventId: string | null
  selectedSpacecraftId: string | null
  selectedMarsLandmarkId: string | null
  progress: number
  hasEnteredDeepTime: boolean
  cameraPosition: [number, number, number] | null
}

export type JourneySite = {
  id: string
  lat: number
  lon: number
  certainty: CoordinateCertainty
  precisionNote: Localized
}

/** Close-up approach used by Chapter I battle dives. Distances are scene units (Earth radius = 1.5). */
export type JourneyDive = {
  /** Height above the globe surface at the end of the dive. */
  altitude: number
  /** 0 = look along the horizon, 1 = look straight down. */
  pitch?: number
  /** How far south of the aim point the camera stands, along the surface. */
  back?: number
}

export type JourneyFocus = {
  lat: number
  lon: number
  distance: number
  dive?: JourneyDive
}

/**
 * Staging shape used by Chapter I (`force`). Other journeys may define their
 * own staging types; the shared store only reads `cursor` and `focus`.
 */
export type JourneyStaging = {
  cursor: string
  focus: JourneyFocus
  visibleTheaters: string[]
  showInstitutions: boolean
  showWeapons: boolean
  showFormations: boolean
  showChangping: boolean
}

/** The fields the shared journey store needs from any registered journey. */
export type JourneyStoreStaging = {
  cursor: string
  focus: JourneyFocus
}

/** Alias used by `runtime.ts` and the Korea journey. */
export type JourneyCameraStaging = JourneyStoreStaging

export function t(node: Localized | string | undefined, lang: JourneyLang): string {
  if (node == null) return ''
  if (typeof node === 'string') return node
  return node[lang] ?? node.en ?? ''
}

export function paragraphs(node: LocalizedParagraphs | Localized | undefined, lang: JourneyLang): string[] {
  if (!node) return []
  const value = node[lang] ?? node.en
  return (Array.isArray(value) ? [...value] : [value]).filter((line) => line.length > 0)
}
