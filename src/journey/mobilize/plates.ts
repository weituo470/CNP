import type { Localized } from '../types'

export type MobilizePlate = {
  src: string
  alt: Localized
  caption: Localized
}

export const MOBILIZE_PLATES: Record<string, MobilizePlate> = {
  hook: {
    src: '/art/mobilize/hook.svg',
    alt: {
      en: 'Typological plate of the three axes of this chapter: plans and institutions, projection and engineering, and social mobilization. A historical imagination, not a photograph.',
      zh: '本章三条轴的类型学图版：预案与体制、投送与工程、社会动员。类型学想象图，并非照片。',
    },
    caption: {
      en: 'Typological illustration — three axes, not a photograph of any event.',
      zh: '类型学想象图：三条轴，不是任何事件的照片。',
    },
  },
  system: {
    src: '/art/mobilize/system.svg',
    alt: {
      en: 'Typological diagram of the emergency-management system around the Ministry of Emergency Management, plans, a four-level response, fire-and-rescue teams, and defense mobilization.',
      zh: '以应急管理部为中心的应急体制类型学图：预案、四级响应、消防救援队伍与国防动员。',
    },
    caption: {
      en: 'Schematic of institutions — not a ministry floor plan.',
      zh: '体制示意，不是部委办公楼平面图。',
    },
  },
  floods: {
    src: '/art/mobilize/floods.svg',
    alt: {
      en: 'Typological diagram of the mid-Yangtze defense line in 1998, from the later Three Gorges works through the Jingjiang reach to Wuhan and Jiujiang.',
      zh: '一九九八年长江中游防线类型学图：从后来的三峡工程，经荆江河段，到武汉与九江。',
    },
    caption: {
      en: 'Dike-line schematic — not a surveyed embankment.',
      zh: '堤防示意，不是已测绘的堤防。',
    },
  },
  wenchuan: {
    src: '/art/mobilize/wenchuan.svg',
    alt: {
      en: 'Typological diagram of projection into Yingxiu and of counterpart reconstruction arrows toward Sichuan.',
      zh: '向映秀投送、以及通向四川的对口援建箭头的类型学图。',
    },
    caption: {
      en: 'Projection and pairing, typological — not GPS tracks.',
      zh: '投送与对口示意，不是定位轨迹。',
    },
  },
  epidemic: {
    src: '/art/mobilize/epidemic.svg',
    alt: {
      en: 'Typological plate of official Huoshenshan and Leishenshan construction timelines, and cabin hospitals as officially described.',
      zh: '火神山、雷神山官方建设工期，以及官方所说明的方舱医院的类型学图版。',
    },
    caption: {
      en: 'Official timelines, shown typologically — not a photograph of the construction site.',
      zh: '官方工期的类型学展示，不是工地照片。',
    },
  },
  warning: {
    src: '/art/mobilize/warning.svg',
    alt: {
      en: 'Typological net of meteorological and earthquake warning, professional rescue, aviation rescue, and central stockpiles.',
      zh: '气象与地震预警、专业救援、航空救援和中央储备的类型学网络。',
    },
    caption: {
      en: 'A typological net — not one tragedy, and not a warehouse directory.',
      zh: '一张类型学的网，不是某一次悲剧，也不是仓库名录。',
    },
  },
  rebuild: {
    src: '/art/mobilize/rebuild.svg',
    alt: {
      en: 'Typological sequence from temporary shelter, through the restoration of lifelines, to counterpart reconstruction.',
      zh: '从临时安置，经生命线抢通，到对口援建的类型学顺序。',
    },
    caption: {
      en: 'From shelter to a lasting rebuild, typological.',
      zh: '从安置到重建的类型学顺序。',
    },
  },
  close: {
    src: '/art/mobilize/close.svg',
    alt: {
      en: 'Typological plate of the merge interfaces with the Warring States, Korea, and 2026 baseline chapters.',
      zh: '与战国、抗美援朝、二〇二六军力基线三章接口的类型学图版。',
    },
    caption: {
      en: 'Interfaces left explicit — this screen does not score the comparison.',
      zh: '接口已经留好，本屏不作打分。',
    },
  },
}

export function preloadMobilizePlates() {
  Object.values(MOBILIZE_PLATES).forEach((plate) => {
    const image = new Image()
    image.src = plate.src
  })
}
