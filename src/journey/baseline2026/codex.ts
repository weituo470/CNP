/**
 * Lore-surface mapping for the 2026 baseline.
 * Plates are typological / schematic dossier inserts, never photographs of events
 * and never operational charts.
 */
import type { Localized } from '../types'
import { UI } from './content'

export type CodexAspect = '3:4' | '4:3'
export type CodexVoice = 'dossier' | 'estimate'

export type CodexPlate = {
  src: string
  aspect: CodexAspect
  alt: Localized
  caption: Localized
  note?: Localized
  overlayTitle?: Localized
  overlayNote?: Localized
}

export type CodexBeatSpec = {
  id: string
  emphasize: readonly CodexVoice[]
  plate: CodexPlate
}

function art(file: string) {
  const base = import.meta.env.BASE_URL || '/'
  const root = base.endsWith('/') ? base : `${base}/`
  return `${root}art/baseline2026/${file}`
}

const typo = UI.illustrationCaution

export const CODEX_BEATS: readonly CodexBeatSpec[] = [
  {
    id: 'hook',
    emphasize: ['dossier', 'estimate'],
    plate: {
      src: art('hook.svg'),
      aspect: '4:3',
      alt: { zh: '三条轴与一把尺子的基线示意', en: 'Schematic of a ruler and three baseline axes' },
      caption: { zh: '先把尺子摆正 · 示意', en: 'Straighten the ruler first · schematic' },
      note: typo,
    },
  },
  {
    id: 'timeline',
    emphasize: ['dossier', 'dossier'],
    plate: {
      src: art('timeline.svg'),
      aspect: '4:3',
      alt: { zh: '战国、一九五〇到五三年与二〇二六年三条刻度的时间尺示意', en: 'Schematic time ruler with ticks for the Warring States, 1950–53, and 2026' },
      caption: { zh: '同一颗地球上的三条刻度 · 示意', en: 'Three ticks on the same Earth · schematic' },
      note: typo,
    },
  },
  {
    id: 'structure',
    emphasize: ['dossier', 'dossier', 'estimate'],
    plate: {
      src: art('structure.svg'),
      aspect: '4:3',
      alt: { zh: '军委、五大战区与军兵种的公开结构示意', en: 'Schematic of the official CMC, theater, and service layout' },
      caption: { zh: '官方公开结构 · 示意，不是总部地址', en: 'Official public structure · schematic, not a headquarters map' },
      note: typo,
    },
  },
  {
    id: 'equipment',
    emphasize: ['dossier', 'dossier', 'dossier'],
    plate: {
      src: art('platforms.svg'),
      aspect: '4:3',
      alt: { zh: '航母、驱逐舰与歼-20的类型学剪影示意', en: 'Typological silhouettes of carriers, a destroyer, and a J-20' },
      caption: { zh: '已公开亮相的装备类型学剪影 · 示意', en: 'Typological silhouettes of officially shown platforms · schematic' },
      note: typo,
    },
  },
  {
    id: 'scale',
    emphasize: ['estimate', 'estimate', 'estimate'],
    plate: {
      src: art('scale.svg'),
      aspect: '4:3',
      alt: { zh: '主要国家现役人数、军费与作战飞机的类型学对照示意', en: 'Typological comparison of active personnel, military spending, and combat aircraft' },
      caption: { zh: '三轴对照，阴影为外部估计 · 示意，不是记分牌', en: 'Three-axis comparison, hatched = external estimate · schematic, not a scoreboard' },
      note: typo,
    },
  },
  {
    id: 'seas',
    emphasize: ['dossier', 'estimate'],
    plate: {
      src: art('westpac.svg'),
      aspect: '4:3',
      alt: { zh: '西太平洋开阔取景的示意，不是作战图', en: 'Wide western-Pacific framing schematic, not a targeting plot' },
      caption: { zh: '西太平洋取景 · 示意，不是目标图', en: 'Western Pacific framing · schematic, not a targeting plot' },
      note: typo,
    },
  },
  {
    id: 'doctrine',
    emphasize: ['dossier', 'dossier'],
    plate: {
      src: art('doctrine.svg'),
      aspect: '4:3',
      alt: { zh: '世界一流、信息化、智能化与联合作战等官方公开词汇示意', en: 'Schematic of official public vocabulary: world-class, informatized, intelligentized, joint' },
      caption: { zh: '官方公开词汇 · 示意', en: 'Official public vocabulary · schematic' },
      note: typo,
    },
  },
  {
    id: 'close',
    emphasize: ['dossier', 'dossier'],
    plate: {
      src: art('close.svg'),
      aspect: '4:3',
      alt: { zh: '古代刻度、二〇二六年刻度与朝鲜战争接口的收束示意', en: 'Closing schematic of the ancient tick, the 2026 tick, and a Korea-journey interface' },
      caption: { zh: '公开记录能站住的结论 · 示意', en: 'What the public record can defend · schematic' },
      note: typo,
    },
  },
]

export const CODEX_IMAGE_URLS = CODEX_BEATS.map((beat) => beat.plate.src)

export function preloadCodexArt() {
  if (typeof window === 'undefined') return
  for (const src of CODEX_IMAGE_URLS) {
    const image = new Image()
    image.src = src
  }
}
