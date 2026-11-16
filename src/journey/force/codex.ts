/**
 * Lore-surface mapping for Chapter I.
 * Plates are typological / historical-imagination paintings, never photographs of events.
 */
import type { Localized } from '../types'
import { UI } from './content'

export type CodexAspect = '3:4' | '4:3'
export type CodexMaterial = 'bamboo' | 'parchment' | 'both'
export type CodexLayout = 'bamboo' | 'diptych' | 'shared'

export type CodexPlate = {
  src: string
  aspect: CodexAspect
  alt: Localized
  caption: Localized
  note?: Localized
  overlayTitle?: Localized
  overlayNote?: Localized
  dual?: { east: Localized; west: Localized }
}

export type CodexBeatSpec = {
  id: string
  layout: CodexLayout
  /** Which surface comes forward for each narration paragraph. */
  emphasize: readonly CodexMaterial[]
  bambooParagraphs: readonly number[]
  parchmentParagraphs: readonly number[]
  bambooPlate?: CodexPlate
  parchmentPlate?: CodexPlate
  sharedPlate?: CodexPlate
}

function art(file: string) {
  const base = import.meta.env.BASE_URL || '/'
  const root = base.endsWith('/') ? base : `${base}/`
  return `${root}art/codex/${file}`
}

const typo = UI.illustrationCaution

export const CODEX_BEATS: readonly CodexBeatSpec[] = [
  {
    id: 'hook',
    layout: 'diptych',
    emphasize: ['bamboo', 'bamboo', 'parchment', 'parchment'],
    bambooParagraphs: [0, 1],
    parchmentParagraphs: [2, 3],
    bambooPlate: {
      src: art('hook-east.jpg'),
      aspect: '3:4',
      alt: { zh: '战国黎明行军的历史想象图', en: 'Typological illustration of a Warring States dawn march' },
      caption: { zh: '战国黎明行军 · 历史想象图', en: 'Warring States dawn march · typological illustration' },
      note: typo,
    },
    parchmentPlate: {
      src: art('hook-west.jpg'),
      aspect: '3:4',
      alt: { zh: '地中海海岸与三列桨战船的历史想象图', en: 'Typological illustration of a Mediterranean coast with triremes' },
      caption: { zh: '地中海海岸 · 历史想象图', en: 'A Mediterranean coast · typological illustration' },
      note: typo,
    },
  },
  {
    id: 'timeline',
    layout: 'diptych',
    emphasize: ['bamboo', 'parchment'],
    bambooParagraphs: [0],
    parchmentParagraphs: [1],
    bambooPlate: {
      src: art('timeline-east.jpg'),
      aspect: '4:3',
      alt: { zh: '列国在黄土丘陵间连续交战的类型学想象图', en: 'Typological illustration of continuous interstate war across loess hills' },
      caption: { zh: '列国交战示意 · 历史想象图', en: 'Schematic interstate war · typological illustration' },
      note: typo,
    },
    parchmentPlate: {
      src: art('timeline-west.jpg'),
      aspect: '4:3',
      alt: { zh: '重装步兵与较短东方远征的历史想象图', en: 'Typological illustration of a hoplite company and a shorter eastern expedition' },
      caption: { zh: '同时代西方战争示意 · 历史想象图', en: 'Contemporaneous western campaigns · typological illustration' },
      note: typo,
    },
  },
  {
    id: 'institutions',
    layout: 'diptych',
    emphasize: ['bamboo', 'parchment'],
    bambooParagraphs: [0],
    parchmentParagraphs: [1],
    bambooPlate: {
      src: art('institutions.jpg'),
      aspect: '4:3',
      alt: { zh: '户籍、粮仓、县廷与征发的类型学想象图', en: 'Typological illustration of registers, a granary, a county office, and a muster' },
      caption: { zh: '户籍、粮仓、县廷与征发 · 类型学想象图', en: 'Registers, granary, county, and muster · typological illustration' },
      note: typo,
    },
  },
  {
    id: 'weapons',
    layout: 'bamboo',
    emphasize: ['bamboo', 'bamboo'],
    bambooParagraphs: [0, 1],
    parchmentParagraphs: [],
    bambooPlate: {
      src: art('weapons.jpg'),
      aspect: '4:3',
      alt: { zh: '战国兵器的类型学想象图，不是出土器', en: 'Typological still life of Warring States weapons, not an excavated object' },
      caption: { zh: '类型学想象图，不是某一件出土器', en: 'Typological illustration, not a named excavated object' },
      note: UI.weaponsPlateCaution,
    },
  },
  {
    id: 'scale',
    layout: 'diptych',
    emphasize: ['parchment', 'bamboo'],
    bambooParagraphs: [1],
    parchmentParagraphs: [0],
    sharedPlate: {
      src: art('scale.jpg'),
      aspect: '4:3',
      alt: { zh: '文献记载规模感与可计数登陆对照的历史想象图', en: 'Typological diptych: a literature-claim host beside a countable landing' },
      caption: typo,
      dual: { east: UI.scaleEastCaption, west: UI.scaleWestCaption },
    },
  },
  {
    id: 'changping',
    layout: 'bamboo',
    emphasize: ['bamboo', 'bamboo'],
    bambooParagraphs: [0, 1],
    parchmentParagraphs: [],
    bambooPlate: {
      src: art('changping.jpg'),
      aspect: '4:3',
      alt: { zh: '长平包围与断粮的战役示意想象图，无尸骸', en: 'Campaign-map illustration of encirclement and a cut supply road, with no corpses' },
      caption: UI.changpingPlateTitle,
      note: UI.changpingPlateNote,
      overlayTitle: UI.changpingPlateTitle,
      overlayNote: UI.changpingPlateNote,
    },
  },
  {
    id: 'strategy',
    layout: 'diptych',
    emphasize: ['bamboo', 'parchment', 'both'],
    bambooParagraphs: [0, 2],
    parchmentParagraphs: [1],
    bambooPlate: {
      src: art('strategy-east.jpg'),
      aspect: '4:3',
      alt: { zh: '厅堂、竹书与沙盘上金银朱线的历史想象图', en: 'Typological illustration of a hall, bamboo texts, and a silk sand-table' },
      caption: { zh: '庙算与沙盘 · 历史想象图', en: 'Deliberation and a sand-table · typological illustration' },
      note: typo,
    },
    parchmentPlate: {
      src: art('strategy-west.jpg'),
      aspect: '4:3',
      alt: { zh: '西西里与东方路线的历史想象图', en: 'Typological illustration of a Sicily map and an eastern route' },
      caption: { zh: '同时代西方谋略示意 · 历史想象图', en: 'Contemporaneous western strategy · typological illustration' },
      note: typo,
    },
  },
  {
    id: 'close',
    layout: 'shared',
    emphasize: ['both'],
    bambooParagraphs: [0],
    parchmentParagraphs: [0],
    sharedPlate: {
      src: art('close.jpg'),
      aspect: '4:3',
      alt: { zh: '竹简、青铜残件、羊皮卷与盔形在同一黄昏前的历史想象图', en: 'Typological still life of bamboo slips, a small bronze, parchment, and a helmet at a shared dusk' },
      caption: { zh: '三种能力的余响 · 历史想象图', en: 'The aftertone of three capacities · typological illustration' },
      note: typo,
    },
  },
]

export const CODEX_IMAGE_URLS = [
  ...new Set(
    CODEX_BEATS.flatMap((beat) => [beat.bambooPlate?.src, beat.parchmentPlate?.src, beat.sharedPlate?.src].filter(Boolean) as string[]),
  ),
]

export function preloadCodexArt() {
  if (typeof window === 'undefined') return
  for (const src of CODEX_IMAGE_URLS) {
    const image = new Image()
    image.src = src
  }
}
