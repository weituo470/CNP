import type { Localized } from '../types'
import { UI } from './content'

export type KoreaPlate = {
  src: string
  alt: Localized
  caption: Localized
  note?: Localized
  overlayTitle?: Localized
  overlayNote?: Localized
}

const typo = UI.illustrationCaution
const asset = (file: string) => `${import.meta.env.BASE_URL}art/korea/${file}`

/**
 * Typological story-paintings printed on the brief-sheet.
 * These are historical-imagination plates, never photographs and never casualty charts.
 */
export const KOREA_PLATES: Record<string, KoreaPlate> = {
  hook: {
    src: asset('peninsula.jpg'),
    alt: {
      en: 'Typological painting of a border river and a narrow mountainous peninsula at dawn, a historical imagination, not a photograph.',
      zh: '边境江面与狭窄山地半岛黎明的类型学想象图，不是照片。',
    },
    caption: {
      en: 'The peninsula and the Yalu, typological — not a photograph of the crossing.',
      zh: '半岛与鸭绿江的类型学想象图，并非渡江现场照片。',
    },
    note: typo,
    overlayTitle: { en: 'The peninsula, 1950', zh: '半岛  ·  一九五〇年' },
    overlayNote: { en: 'Schematic  ·  typological', zh: '示意  ·  类型学' },
  },
  timeline: {
    src: asset('timeline.jpg'),
    alt: {
      en: 'Typological story-painting of a narrow peninsula read through changing seasons, with a vermillion time-path, not a timeline chart.',
      zh: '以季节变迁阅读狭窄半岛、并画出朱线时路的类型学故事画，不是时间表。',
    },
    caption: {
      en: 'A typological time-path: outbreak, Incheon, the Yalu crossing, five campaigns, talks, armistice.',
      zh: '类型学时路：爆发、仁川、渡江、五次战役、谈判、停战。',
    },
    note: typo,
  },
  mobilization: {
    src: asset('logistics.jpg'),
    alt: {
      en: 'Typological painting of a supply column and a repaired pontoon on a border river under a distant sky, not a traffic count.',
      zh: '边境江上补给队伍与修复中的浮桥类型学想象图，不是车次统计。',
    },
    caption: {
      en: 'Typological logistics — damaged and repaired, not a traffic count.',
      zh: '类型学补给线：被打断，也被抢修，不是车次统计。',
    },
    note: typo,
  },
  equipment: {
    src: asset('mig-alley.jpg'),
    alt: {
      en: 'Typological painting of light infantry in a winter valley under typological early jets, not a museum scan of a particular aircraft.',
      zh: '冬季谷地中的轻装步兵与上空类型学喷气机的想象图，不是某一架飞机的博物馆扫描件。',
    },
    caption: {
      en: 'Typological equipment contrast, not a museum scan of a particular aircraft.',
      zh: '装备对照的类型学想象图，不是某一架飞机的博物馆扫描件。',
    },
    note: typo,
  },
  strategy: {
    src: asset('strategy.jpg'),
    alt: {
      en: 'Typological painting of a dim hall, a campaign map, and a lamp — deliberation as a craft of the state, not a reconstructed war room.',
      zh: '灯下厅堂与作战图的类型学想象图，谋略作为国家技艺，不是某一作战室的复原。',
    },
    caption: {
      en: 'Strategy as a state decision — typological, not a reconstructed war room.',
      zh: '谋略作为国家决策的类型学想象图，不是作战室复原。',
    },
    note: typo,
  },
  campaigns: {
    src: asset('campaigns.jpg'),
    alt: {
      en: 'Typological campaign-map painting of approach, envelopment, a hill, and a withdrawal bearing, with no casualty totals.',
      zh: '接近、包围、高地与撤离方向的类型学战图，没有伤亡总数。',
    },
    caption: {
      en: 'Operational process only: approach, envelopment, the hill, withdrawal. No casualty totals.',
      zh: '只演示作战过程：接近、包围、阵地、撤离。没有伤亡总数。',
    },
    note: typo,
  },
  close: {
    src: asset('armistice.jpg'),
    alt: {
      en: 'Typological painting of a document table at dusk and a pale line in the landscape near, not on, a latitude — an armistice, not a victory scene.',
      zh: '黄昏案头与风景中淡线的类型学想象图，线靠近而不是落在某一纬线上。这是停战，不是胜利场面。',
    },
    caption: {
      en: 'An armistice, not a peace treaty. The military demarcation line runs near, not on, the 38th parallel.',
      zh: '这是停战，不是和平条约。军事分界线靠近三八线，并不与它重合。',
    },
    note: typo,
  },
}

export function preloadKoreaPlates() {
  if (typeof document === 'undefined') return
  for (const plate of Object.values(KOREA_PLATES)) {
    const image = new Image()
    image.src = plate.src
  }
}
