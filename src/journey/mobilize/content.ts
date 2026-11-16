/**
 * Bilingual copy for the 灾难应对与动员能力 guided journey.
 * Chinese is the default overlay language; English is a complete peer, not a gloss.
 * Spoken narration is Chinese-only. Figures, if they appear, are attributed.
 * Official announcements and external estimates are kept visually and textually distinct.
 * Fatality totals are kept out of the spoken hook and off the globe.
 */
import { BEAT_COUNT, BEAT_STAGING } from './sites'
import type { JourneyBeat, JourneyCardKind, Localized } from '../types'

export const JOURNEY_META = {
  id: 'mobilize' as const,
  queryValue: 'mobilize',
  title: { en: 'Disaster Response and Mobilization', zh: '灾难应对与动员能力' } satisfies Localized,
  window: { en: '1998–2020, and the present system', zh: '1998–2020年，以及现行体制' } satisfies Localized,
}

export const UI = {
  brandKicker: { en: 'A chapter of Force', zh: '「力」的一章' } satisfies Localized,
  brandTitle: { en: 'Disaster Response and Mobilization', zh: '灾难应对与动员能力' } satisfies Localized,
  exit: { en: 'Exit journey', zh: '退出导览' } satisfies Localized,
  enter: { en: 'Disaster Response and Mobilization', zh: '灾难应对与动员' } satisfies Localized,
  reenter: { en: 'Re-enter the journey', zh: '再次进入导览' } satisfies Localized,
  sourcesBtn: { en: 'Sources', zh: '信源与注释' } satisfies Localized,
  sourcesKicker: { en: 'Notes for presenters and readers', zh: '供讲解者与听众核对' } satisfies Localized,
  sourcesTitle: { en: 'Sources & cautions', zh: '信源与审慎说明' } satisfies Localized,
  close: { en: 'Close', zh: '关闭' } satisfies Localized,
  langEn: 'EN',
  langZh: '中文',
  languageLabel: { en: 'Language', zh: '语言' } satisfies Localized,
  hints: {
    en: '0–7 jump beats   ·   ← → change beat   ·   Space play/pause   ·   Drag the globe   ·   Click a site or mark   ·   Esc to exit',
    zh: '0–7 跳转段落   ·   ← → 切换段落   ·   空格播放或暂停   ·   拖动地球   ·   点击地点或标记   ·   Esc 退出',
  } satisfies Localized,
  coordinateCaution: {
    en: 'Pins use representative or site coordinates on the present-day globe, not surveyed meter precision.',
    zh: '图钉为今地图上的代表性或遗址坐标，并非测绘测得的米级精度。',
  } satisfies Localized,
  playNarration: { en: 'Play narration', zh: '播放解说' } satisfies Localized,
  pauseNarration: { en: 'Pause', zh: '暂停' } satisfies Localized,
  resumeNarration: { en: 'Resume', zh: '继续播放' } satisfies Localized,
  replayNarration: { en: 'Replay from the start', zh: '从头播放' } satisfies Localized,
  playHint: {
    en: 'After you click, the globe turns to each region and the mobilization is shown schematically.',
    zh: '点击后，镜头会转到对应位置，并以示意方式演示动员。',
  } satisfies Localized,
  voiceChineseOnly: {
    en: 'Spoken narration is Chinese-only for now. On-screen text stays in English.',
    zh: '语音解说目前仅为中文。画面文字仍可切换为英文。',
  } satisfies Localized,
  narrationError: {
    en: 'Voice could not be loaded. You can still walk the globe and read the commentary.',
    zh: '语音未能载入。仍可浏览地球并阅读解说。',
  } satisfies Localized,
  typological: {
    en: 'Schematic / typological — not exact routes, rosters, or a casualty ledger.',
    zh: '示意 / 类型学，并非精确路线或名册，也不是伤亡账本。',
  } satisfies Localized,
  illustrationCaution: {
    en: 'Typological illustration — a historical imagination, not a photograph of the event.',
    zh: '类型学想象图，并非事件照片。',
  } satisfies Localized,
  briefingRoll: { en: 'Emergency brief', zh: '应急简报' } satisfies Localized,
  officialLabel: { en: 'Official announcement', zh: '官方公布' } satisfies Localized,
  estimateLabel: { en: 'External estimate', zh: '外部估计' } satisfies Localized,
  clickSites: {
    en: 'Click a site or typological mark on the globe.',
    zh: '可点击地球上的地点或类型学标记。',
  } satisfies Localized,
  mergeReady: {
    en: 'Merge interfaces with the Warring States, Korea, and 2026 baseline chapters are left explicit; this screen does not score them.',
    zh: '与战国、抗美援朝、2026 军力基线三章的比较接口已经留好，本屏不作打分。',
  } satisfies Localized,
  windowNote: {
    en: 'Cursors are civil dates such as 12 May 2008, 23 January 2020, and 16 April 2018.',
    zh: '时间光标为民用日期，如 2008-05-12、2020-01-23、2018-04-16。',
  } satisfies Localized,
}

export type SourceKind = 'official' | 'estimate' | 'typological'

export const BEATS = [
  {
    id: 'hook',
    name: { en: 'Hook', zh: '开场' },
    kicker: { en: 'A chapter on getting back up', zh: '关于站起来的一章' },
    title: { en: 'How fast a country can stand up again.', zh: '倒下以后，能多快站起来。' },
    body: {
      en: 'A country’s strength also includes how quickly it can get back on its feet. This chapter is about response and mobilization — plans and institutions, projection and engineering, and social mobilization — not a contest of death tolls.',
      zh: '一个国家的力量，也包括它倒下后能多快站起来。这一章讲的是应对与动员：预案与体制，投送与工程，以及社会动员。它不是一场死亡数字的竞赛。',
    },
    narration: {
      en: [
        'Look at China. This chapter is not about how grim a disaster was, and it is not a contest over who has the larger number. A country’s strength also includes how quickly it can stand up again after it has been knocked down.',
        'What we will look at is response and mobilization: plans and institutions; how people, supplies, and engineering capacity are sent to the scene; and how society is mobilized. The routes and pins on the globe are schematic. They are not a casualty ledger.',
        'Chapter I spoke of the “state machinery” of the Warring States — household registers, granaries, and counties. This chapter looks at a modern state, and at how, after floods, earthquakes, and an epidemic, it can concentrate medical, engineering, military, and civic capacity in a short time.',
      ],
      zh: [
        '请看中国。这一章要讲的，不是灾难本身有多惨，也不是去比谁的数字更大。一个国家的力量，也包括它倒下以后，能多快站起来。',
        '我们要看的是应对和动员：预案与体制，怎样把人、物资和工程力量送到现场，以及社会怎样被动员起来。地球上的路线和钉位，都是示意，不是伤亡账本。',
        '第一章讲过战国的「国家机器」。那一章看户籍、粮仓和县制。这一章看的是当代国家，在洪水、地震和疫情之后，怎样把医疗、工程、军队和民间的力量迅速集中起来。',
      ],
    },
  },
  {
    id: 'system',
    name: { en: 'Institutions', zh: '体制' },
    kicker: { en: 'Beat 1  ·  Plans and institutions', zh: '第一段  ·  预案与体制' },
    title: { en: 'A ministry, a plan, a four-level response.', zh: '一个部门，一套预案，四级响应。' },
    body: {
      en: 'In 2018 the State Council institutional reform created the Ministry of Emergency Management, formally inaugurated on 16 April. National contingency plans, a four-level response, the national comprehensive fire-and-rescue teams, PLA and PAP emergency relief, and national defense mobilization as a civilian-facing capacity.',
      zh: '二〇一八年国务院机构改革组建应急管理部，同年四月十六日正式挂牌。国家应急预案、四级响应、国家综合性消防救援队伍，以及解放军、武警的应急救援和面向民用的国防动员能力。',
    },
    narration: {
      en: [
        'First, turn the camera to Beijing. In 2018, the State Council institutional reform created the Ministry of Emergency Management, which was formally inaugurated on 16 April that year. This is an official institutional reform: duties for workplace safety, firefighting, disaster relief, geological hazards, parts of flood and drought and forest-fire prevention, and earthquake emergency rescue were brought together in one constituent ministry of the State Council.',
        'In this system, the state maintains an overall contingency plan and special plans. Emergencies are classed as particularly major, major, large, or ordinary, corresponding to a Level I to Level IV response, with Level I the highest. The national comprehensive fire-and-rescue teams were formed, after the public-security fire forces and the PAP forest forces were reorganized, as a standing professional backbone.',
        'The PLA and the People’s Armed Police remain an important force in major disaster relief. National defense mobilization, on its civilian-facing side, is about organizing transport, supplies, and reserve capacity, which in peacetime can also be turned to emergency work. Please read these as types of institution, not as the reconstruction of any one office.',
      ],
      zh: [
        '先把镜头转到北京。二〇一八年，国务院机构改革组建应急管理部，同年四月十六日正式挂牌。这是一次官方公布的机构改革：把安全生产、消防、救灾、地质灾害防治和部分水旱、森林防火，以及震灾应急救援等职责，整合到国务院的一个组成部门。',
        '在这套体制里，国家有总体应急预案和专项预案。突发事件按特别重大、重大、较大、一般分级，对应一级到四级响应，一级最高。国家综合性消防救援队伍，是公安消防部队和武警森林部队转制后组建的常备专业骨干力量。',
        '解放军和武警部队，仍然是重大灾害救援的重要力量。国防动员面对的是民用一侧的组织能力：交通、物资、预备力量，在平时也可以转用于抢险。请把这些看成体制的类型，而不是某一间办公室的复原。',
      ],
    },
  },
  {
    id: 'floods',
    name: { en: 'Floods', zh: '抗洪' },
    kicker: { en: 'Beat 2  ·  1998, the Yangtze', zh: '第二段  ·  一九九八年长江' },
    title: { en: 'Troops on the dike, people moved in time.', zh: '部队上堤，群众转移。' },
    body: {
      en: 'The 1998 Yangtze flood is remembered as a large-scale mobilization: troops, militia, dike defense, and organized transfer. Flood-control works such as the Three Gorges Dam are cited only as official project facts — capacity deployed in advance, not a dam already operating in 1998.',
      zh: '一九九八年长江洪水，是一次被广泛记住的大规模动员：部队、民兵、守堤与有组织的转移。三峡等防洪工程只按官方公布的工程事实来引用——那是提前部署的能力，不是一九九八年已经投入运行的大坝。',
    },
    narration: {
      en: [
        'Set the clock to 1998. That year the Yangtze saw a basin-wide flood, and a large-scale flood-fighting mobilization that many people still remember. What we will look at is how troops, militia, and people along the river went up on the dikes, and how transfers were organized — not pictures of inundation.',
        'Look at the Jingjiang reach. On the Yangtze, this is the notoriously dangerous stretch. The water level at Shashi reached 45.22 metres. People in the Jingjiang flood-diversion area were organized for transfer; the diversion area was in the end not opened, and troops and civilians continued to hold the dike. These facts appear in the State Council’s report that year to the Standing Committee of the National People’s Congress, and in the hydrological record.',
        'The State Council report of 26 August 1998 said that the PLA and the People’s Armed Police had successively deployed 66 divisions, brigades and PAP corps, totalling 274,000 troops, and had organized more than five million militia and reserve personnel. The later Three Gorges Project, in official descriptions, has flood control as its primary task: a flood-control storage of 22.15 billion cubic metres, raising the flood-protection standard of the Jingjiang reach from a ten-year to a hundred-year event. Please read it as engineering capacity deployed in advance, not as a dam already in flood-control operation in 1998.',
      ],
      zh: [
        '把时间拨到一九九八年。那一年长江发生全流域性大洪水，也是许多人记忆里一次大规模的抗洪动员。我们要看的，是部队、民兵和沿岸群众怎样上堤防守、怎样组织转移，而不是去描绘洪水吞没的画面。',
        '请看荆江一带。万里长江，险在荆江。当年沙市水位曾到四十五点二二米。荆江分洪区的群众被组织转移；分洪区最终没有启用，军民继续在堤上防守。这些经过，见国务院当年向全国人大常委会的报告，以及水文记录。',
        '国务院一九九八年八月二十六日的报告写道：解放军和武警部队先后调动六十六个师、旅和武警总队，共二十七点四万兵力；并组织民兵预备役部队五百多万人。后来建成的三峡工程，官方说明其首要任务是防洪：防洪库容二百二十一点五亿立方米，并把荆江河段的防洪标准由十年一遇提高到百年一遇。请把它理解为提前部署的工程能力，而不是一九九八年当时已经投入防洪运行的大坝。',
      ],
    },
  },
  {
    id: 'wenchuan',
    name: { en: 'Wenchuan', zh: '汶川' },
    kicker: { en: 'Beat 3  ·  12 May 2008', zh: '第三段  ·  二〇〇八年五月十二日' },
    title: { en: 'Getting there, and then pairing for the rebuild.', zh: '先送到，再对口援建。' },
    body: {
      en: 'After the 12 May 2008 Wenchuan earthquake, the official report to the NPC Standing Committee recorded a rapid projection of troops and rescuers. A later State Council notice arranged counterpart reconstruction on the principle of “one province helps one hard-hit county.”',
      zh: '二〇〇八年五月十二日汶川地震之后，国务院向全国人大常委会的报告记录了部队和救援力量的迅速投送。随后的对口支援方案，按「一省帮一重灾县」安排重建。',
    },
    narration: {
      en: [
        'On 12 May 2008, a major earthquake struck Wenchuan, Sichuan. The pins at Yingxiu and Wenchuan are site or representative coordinates on the present-day globe, not a surveyed inventory of every ruined building. This beat looks at how capacity was projected quickly into fractured mountain country.',
        'According to the State Council’s report that year to the Standing Committee of the National People’s Congress, the PLA and the People’s Armed Police deployed more than 140,000 troops; public-security police, firefighters and special police more than 28,000; and militia and reserve personnel more than 75,000; 7,084 aircraft sorties were also used. The same report, with figures as of 23 June, said that more than 1.46 million trapped people had been freed or transferred, and that 84,017 people had been rescued from the rubble. These are the relief figures as then announced. They are not a new fatality total.',
        'The State Council then issued a counterpart-support plan: nineteen provinces and municipalities were assigned on the principle of “one province helps one hard-hit county,” for a term of three years. The arrows on the globe are schematic, so that this cross-province mobilization can be seen. They are not the GPS tracks of construction crews.',
      ],
      zh: [
        '二〇〇八年五月十二日，四川汶川发生特大地震。钉位在映秀、汶川一带，是今地图上的遗址或代表性坐标，不是测过的每一处废墟。这一段要看的，是力量怎样快速投送到断裂的山地。',
        '据国务院同年向全国人大常委会报告：解放军和武警部队出动十四万余人，公安民警、消防和特警二点八万余人，民兵预备役七点五万余人；并动用飞机七千零八十四架次。同一份报告在六月二十三日的统计中写道，已解救转移被困群众一百四十六万余人，从废墟中抢救被掩埋人员八万四千零十七人。这些是当时公布的救援数字，不是一份新的死亡统计。',
        '随后，国务院印发对口支援方案，按「一省帮一重灾县」安排十九个省市，支援期限按三年。地球上的箭头是示意，用来看见这种跨省动员，不是施工队的定位轨迹。',
      ],
    },
  },
  {
    id: 'epidemic',
    name: { en: 'Epidemic', zh: '疫情' },
    kicker: { en: 'Beat 4  ·  From SARS to 2020', zh: '第四段  ·  从SARS到二〇二〇年' },
    title: { en: 'Hospitals built in days, medical teams sent in.', zh: '医院按天建成，医疗队开来。' },
    body: {
      en: 'From SARS in 2003 to COVID-19 in 2020: official construction timelines for Huoshenshan and Leishenshan, medical teams sent to Wuhan, and cabin hospitals as officially described. Official announcements and external estimates are kept distinct. This is neither propaganda nor denunciation.',
      zh: '从二〇〇三年SARS到二〇二〇年：火神山、雷神山的官方建设工期，驰援武汉的医疗队，以及官方所说明的方舱医院。官方公布与外部估计分开标注。既不作宣传，也不作控诉。',
    },
    narration: {
      en: [
        'Turn the camera to Wuhan again. SARS in 2003 had already put public-health emergency response back on the national agenda. On 23 January 2020, the Wuhan epidemic-prevention headquarters issued a notice that, from 10:00 that day, outbound routes from Wuhan would be closed. This beat looks at how medical and engineering capacity was organized. It does not argue over any one fatality figure.',
        'Huoshenshan Hospital, in Caidian, began construction on 24 January and was handed over on 2 February: official announcements give a construction period of ten days and 1,000 beds. Leishenshan Hospital, in Jiangxia, began on 26 January and was handed over on 6 February: twelve days, and 1,600 beds. PLA medical personnel were organized to undertake treatment at Huoshenshan. These are official construction and task arrangements.',
        'The National Health Commission reported on 8 March 2020 that 346 medical teams, 42,600 medical workers, had already gone to support Wuhan and Hubei. Cabin hospitals, as officially described, were public buildings such as exhibition centres and gymnasiums converted to receive patients with mild illness, as a way of expanding treatment capacity. The routes on the globe are a typological picture of medical-team projection. If you meet an external study that estimates the scale of the epidemic, keep it visually and textually separate from official bulletins. Do not merge them into one number.',
      ],
      zh: [
        '再把镜头转到武汉。二〇〇三年的SARS，已经让公共卫生应急被重新放进国家议程。二〇二〇年一月二十三日，武汉市疫情防控指挥部发布通告，从当天十时起关闭离汉通道。这一段要看的，是医疗和工程力量怎样被组织起来，而不是去争论某一个死亡数字。',
        '火神山医院在蔡甸，一月二十四日开工，二月二日交付，官方公布建设工期十天、设置床位一千张。雷神山医院在江夏，一月二十六日开工，二月六日交付，工期十二天、床位一千六百张。解放军抽组医护人员承担火神山的医疗救治任务。这些都是官方公布的建设与任务安排。',
        '国家卫生健康委二〇二〇年三月八日通报：已有三百四十六支医疗队、四点二六万名医护人员支援武汉和湖北。方舱医院，是把会展中心、体育馆等公共空间改成收治轻症患者的设施，官方把它作为扩大收治能力的办法来说明。图上的路线是医疗队投送的示意。若看到外部研究对疫情规模的估计，请把它和官方通报区分开来，不要混成一个数。',
      ],
    },
  },
  {
    id: 'warning',
    name: { en: 'Warning', zh: '预警' },
    kicker: { en: 'Beat 5  ·  Warning and professional rescue', zh: '第五段  ·  预警与专业救援' },
    title: { en: 'A net that is meant to work before the hit.', zh: '尽量在倒下之前，先提醒一声。' },
    body: {
      en: 'Modern warning and professional rescue, as officially described: meteorological and earthquake early warning, the national comprehensive fire-and-rescue teams, aviation rescue, and central emergency stockpiles. Typological, not the reconstruction of one tragedy.',
      zh: '当代预警与专业救援，按官方公开的表述来介绍：气象和地震预警，国家综合性消防救援队伍，航空救援，以及中央救灾物资储备。这是类型学说明，不是某一次悲剧的复原。',
    },
    narration: {
      en: [
        'Modern mobilization does not begin only after a disaster has already happened. Meteorological services issue warnings, and a “call-and-response” mechanism is officially described as reaching responsible persons at the grassroots. Earthquake early warning, in official presentations and plans, is described as offering second-scale alerts in key regions. Please read them as types of monitoring and notice, not as the reconstruction of any one tragedy.',
        'The national comprehensive fire-and-rescue teams were established, and presented with a flag, in 2018, as a standing professional force. Aviation rescue, professional rescue teams, and central emergency stockpiles are ways of placing people and supplies where they can be called on. The pins are typological locations, not the street number of any one warehouse.',
        'Look, from the coast inland, at this net: warning, professional teams, projection, and stockpiles are different faces of the same capacity. It cannot cancel disasters. It can mean that a state has to improvise less when one occurs.',
      ],
      zh: [
        '当代的动员，不只发生在灾害已经发生之后。气象部门发布预警，并建立直达基层责任人的「叫应」；地震预警在官方介绍与规划中，被描述为重点地区的秒级提醒。请把它们看成监测与提醒的类型，而不是某一次悲剧的复原。',
        '国家综合性消防救援队伍，是二〇一八年授旗成立的常备专业力量。航空救援、专业救援队伍，以及中央救灾物资储备，都是把力量和物资预先放在可调用的位置上。钉位是类型学位置，不是某一座仓库的门牌。',
        '请从沿海到内陆看一眼这张网：预警、专业队伍、投送和储备，是同一套能力的不同面。它不能取消灾害，但可以让国家在灾害发生时，少一些临时拼凑。',
      ],
    },
  },
  {
    id: 'rebuild',
    name: { en: 'Rebuild', zh: '重建' },
    kicker: { en: 'Beat 6  ·  From shelter to a lasting rebuild', zh: '第六段  ·  从安置到重建' },
    title: { en: 'After the tents, the harder work of rebuilding.', zh: '帐篷之后，更难的是把城镇重新立起来。' },
    body: {
      en: 'From temporary shelter to a lasting rebuild. Counterpart assistance after Wenchuan is the clearest documented case. Restoring transport and power is itself a mobilization of engineering capacity.',
      zh: '从临时安置，到把城镇重新立起来。汶川对口援建是目前记载最清楚的一次。交通和电力的抢通，本身就是工程能力的动员。',
    },
    narration: {
      en: [
        'The second half of mobilization is the move from temporary shelter to putting roads, power, and housing back up. Tents and prefabricated houses meet the immediate need. The harder task is to rebuild a damaged place into a town that can be lived in for the long term.',
        'Counterpart reconstruction after Wenchuan is the most clearly documented cross-province rebuilding arrangement we have. The plan assigned support on the principle of “one province helps one hard-hit county,” for three years. Later official coverage, including a 2018 Xinhua report, said that the eighteen provinces and municipalities supporting Sichuan had carried out 3,668 reconstruction projects, with assistance amounting to 78.4 billion yuan. That is a later official tally. Please read it as published, not as a figure newly calculated on this screen.',
        'Restoring transport and power is itself a mobilization of engineering capacity: first reconnect the lifelines, then rebuild schools, hospitals, and housing to plan. The globe shows only typological connections. It does not turn ruins into a spectacle.',
      ],
      zh: [
        '从临时安置，到把路、电和住房重新立起来，是动员的后半段。帐篷和活动板房解决眼前；更难的是把一个损坏的地方，重新修成可以长期居住的城镇。',
        '汶川的对口援建，是目前记载最清楚的一次跨省重建安排。方案按「一省帮一重灾县」，期限三年。后来的官方报道，包括二〇一八年新华社的报道，写到对口支援四川的十八个省市累计实施援建项目三千六百六十八个，援建金额七百八十四亿元。这是事后公布的汇总，请按官方报道来读，而不是当成我在这里新算出来的数。',
        '交通和电力的抢通，本身就是工程能力的动员：先把生命线接上，再把学校、医院和住房按规划重建。地球上只画连通的示意，不把废墟做成景观。',
      ],
    },
  },
  {
    id: 'close',
    name: { en: 'Close', zh: '收束' },
    kicker: { en: 'Beat 7  ·  The same state capacity, another face', zh: '第七段  ·  同一套国家能力的另一面' },
    title: { en: 'Disasters still happen. The state can still concentrate.', zh: '灾害仍会发生。国家仍可以把力量集中起来。' },
    body: {
      en: 'The point is not that disasters cease. It is that a modern state can concentrate medical, engineering, military, and civic capacity quickly. Explicit interfaces remain for the Warring States, Korea, and 2026 baseline chapters.',
      zh: '要点不是从此再无灾难，而是一个现代国家可以把医疗、工程、军队和民间的力量迅速集中起来。与战国、抗美援朝、二〇二六军力基线三章的接口已经明确留好。',
    },
    narration: {
      en: [
        'Disasters still happen. What this chapter should leave behind is not the claim that catastrophes will cease, but this: a modern state can concentrate medical, engineering, military, and civic capacity in one place, in a short time.',
        'If this chapter is set beside the other three, the interfaces are already in place. Household registers, granaries, and counties in the Warring States chapter are an earlier state machinery. The chapter on resisting US aggression and aiding Korea looks at wartime mobilization. Defense mobilization, projection, and dual-use capacity in the 2026 military baseline are another face of the same state capability.',
        'Today we simply leave the globe resting over this land. Please remember: the pins are typological; every figure that appears is sourced; official announcements and external estimates should be read apart.',
      ],
      zh: [
        '灾害仍会发生。这一章要留下的，不是「从此再无灾难」，而是：一个现代国家，可以把医疗、工程、军队和民间的力量，在短时间内集中到一个地方。',
        '如果把这一章和另外三章放在一起看，接口已经留好。战国章里的户籍、粮仓和县制，是更早的国家机器；抗美援朝看的是战时动员；二〇二六军力基线里的国防动员、投送和军民两用能力，是同一套国家能力的另一面。',
        '今天只把地球停在这片土地上。请记住：钉位是示意，数字凡出现都标明来源，官方公布和外部估计要分开看。',
      ],
    },
  },
] as const satisfies readonly JourneyBeat[]

type _BeatsMatchStaging = typeof BEATS['length'] extends typeof BEAT_STAGING['length']
  ? typeof BEAT_STAGING['length'] extends typeof BEATS['length']
    ? true
    : never
  : never
true satisfies _BeatsMatchStaging

const _beatsMatchCount: typeof BEATS.length extends typeof BEAT_COUNT
  ? typeof BEAT_COUNT extends typeof BEATS.length ? true : never
  : never = true
void _beatsMatchCount

if (BEATS.length !== BEAT_STAGING.length) {
  throw new Error(`mobilize beat/staging length mismatch: ${BEATS.length} vs ${BEAT_STAGING.length}`)
}

export const SITE_CARDS = [
  {
    id: 'beijing',
    kind: 'institution' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Beijing  ·  16 April 2018', zh: '北京  ·  二〇一八年四月十六日' },
    title: { en: 'Ministry of Emergency Management', zh: '应急管理部' },
    body: {
      en: 'On 17 March 2018 the National People’s Congress approved the State Council institutional reform plan, which created the Ministry of Emergency Management as a constituent department. It was inaugurated on 16 April 2018. The plan brought together duties that had been scattered among workplace safety, firefighting, disaster relief, and several hazard-prevention offices.',
      zh: '二〇一八年三月十七日，全国人民代表大会批准国务院机构改革方案，组建应急管理部，作为国务院组成部门。同年四月十六日正式挂牌。方案把原来分散在安全生产、消防、救灾和若干灾害防治机构中的职责整合到一起。',
    },
    note: {
      en: 'Official announcement — State Council institutional reform plan, and official coverage of the 16 April inauguration. The pin is a typological mark at present-day Beijing, not a floor plan of the ministry.',
      zh: '官方公布——国务院机构改革方案，以及四月十六日挂牌的官方报道。钉位是今北京的类型学标记，不是部委办公楼平面图。',
    },
  },
  {
    id: 'wuhan',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Wuhan  ·  mid-Yangtze and 2020', zh: '武汉  ·  长江中游与二〇二〇年' },
    title: { en: 'A city that appears twice', zh: '一座出现两次的城市' },
    body: {
      en: 'Present-day Wuhan is used in this chapter as a regional anchor for two different mobilizations: dike defense on the mid-Yangtze in 1998, and medical and engineering mobilization in 2020. The pin is not a single hospital campus, and it is not a flood footprint.',
      zh: '今武汉在这一章里出现两次，分别作为一九九八年长江中游守堤，以及二〇二〇年医疗与工程动员的地区锚点。钉位不是某一所医院的院区，也不是洪水淹没范围。',
    },
  },
  {
    id: 'jingzhou',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Jingzhou / Shashi  ·  16–17 August 1998', zh: '荆州 / 沙市  ·  一九九八年八月十六至十七日' },
    title: { en: 'The Jingjiang reach', zh: '荆江河段' },
    body: {
      en: 'The water level at Shashi reached 45.22 metres, a figure in the hydrological record and in official accounts of the 1998 defense. The Jingjiang flood-diversion area was prepared; it was not in the end opened. The pin is a site / representative coordinate, not a surveyed dike chain.',
      zh: '沙市水位曾到四十五点二二米，见水文记录和当年防守的官方叙述。荆江分洪区作了运用准备，最终没有启用。钉位是遗址/代表性坐标，不是已测绘的堤防链。',
    },
    note: {
      en: 'Official announcement / hydrological record — State Council report of 26 August 1998 to the NPC Standing Committee; later official hydrological retellings of the 45.22-metre peak.',
      zh: '官方公布 / 水文记录——国务院一九九八年八月二十六日向全国人大常委会的报告；后来官方水文回顾中的四十五点二二米峰值。',
    },
  },
  {
    id: 'gongan',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Gong’an  ·  typological transfer', zh: '公安  ·  转移示意' },
    title: { en: 'The Jingjiang flood-diversion area', zh: '荆江分洪区' },
    body: {
      en: 'Official and local accounts describe an organized transfer of people from the Jingjiang flood-diversion area, commonly given as 330,000, in mid-August 1998. The diversion area was not opened. The mark is typological, not a household-by-household route map.',
      zh: '官方与地方记载描述了一九九八年八月中旬荆江分洪区有组织的群众转移，通常记为三十三万人。分洪区最终没有启用。这一标记是类型学示意，不是逐户路线图。',
    },
    note: {
      en: 'The 330,000 figure is widely cited in official local flood-control accounts of the diversion area. This tour treats it as a published official local figure, and does not invent a replacement.',
      zh: '三十三万这一数字，在分洪区防汛的官方地方叙述中被广泛记载。本导览把它作为已公布的官方地方数字来引用，不另造一个替代数字。',
    },
  },
  {
    id: 'three-gorges',
    kind: 'institution' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Three Gorges  ·  official project facts', zh: '三峡  ·  官方工程事实' },
    title: { en: 'Capacity deployed in advance', zh: '提前部署的能力' },
    body: {
      en: 'Official project descriptions state that the Three Gorges Project has a flood-control storage of 22.15 billion cubic metres, and that it raises the flood-protection standard of the Jingjiang reach from a ten-year to a hundred-year event. Construction had begun before 1998; the dam was not yet in designed flood-control operation during that flood.',
      zh: '官方工程说明写明：三峡工程防洪库容二百二十一点五亿立方米，并将荆江河段防洪标准由十年一遇提高到百年一遇。工程在一九九八年之前已经开工，但当年大洪水时，大坝尚未按设计投入防洪运行。',
    },
    note: {
      en: 'Official announcement — official project descriptions by the China Three Gorges Group and water-resources authorities. The pin is at present-day Sandouping. It is not a claim that the dam held the 1998 flood.',
      zh: '官方公布——中国三峡集团和水利主管部门的工程说明。钉位在今三斗坪。它并不表示这座大坝拦下了一九九八年的洪水。',
    },
  },
  {
    id: 'yichang',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Yichang  ·  typological', zh: '宜昌  ·  类型学' },
    title: { en: 'Above the Jingjiang reach', zh: '进入荆江之前' },
    body: {
      en: 'A regional typological mark at present-day Yichang, used only to place the mid-Yangtze approach above the Jingjiang reach.',
      zh: '今宜昌的地区性类型学标记，仅用于标出进入荆江河段之前的长江中游。',
    },
  },
  {
    id: 'jiujiang',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Jiujiang  ·  typological bound', zh: '九江  ·  类型学边界' },
    title: { en: 'The eastern bound of the mid-Yangtze line', zh: '中游防线的东端示意' },
    body: {
      en: 'A typological mark at present-day Jiujiang, used only to bound the mid-Yangtze defense line shown on the globe. This chapter does not reconstruct the 1998 breach.',
      zh: '今九江的类型学标记，仅用于框定地球上的长江中游防线。本章不复原一九九八年的决口。',
    },
  },
  {
    id: 'yingxiu',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Yingxiu  ·  12 May 2008', zh: '映秀  ·  二〇〇八年五月十二日' },
    title: { en: 'Yingxiu, typological', zh: '映秀，类型学' },
    body: {
      en: 'Yingxiu, in Wenchuan County, is the town most often identified with the meizoseismal area of the 12 May 2008 earthquake. The pin is a site / representative coordinate on the present-day globe, not a surveyed inventory of ruined buildings, and not a fatality ledger.',
      zh: '汶川县映秀镇，是二〇〇八年五月十二日地震极震区最常被指认的乡镇。钉位是今地图上的遗址/代表性坐标，不是损毁房屋的测绘清单，也不是伤亡账本。',
    },
  },
  {
    id: 'wenchuan',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Wenchuan  ·  county seat', zh: '汶川  ·  县城' },
    title: { en: 'The county is larger than this pin', zh: '县域大于这一钉位' },
    body: {
      en: 'The present-day county seat at Weizhou is a representative coordinate. Guangdong was assigned to help Wenchuan County under the official counterpart-support plan. Yingxiu marks the more widely identified meizoseismal town.',
      zh: '今县城威州是代表性坐标。官方对口支援方案中，由广东支援汶川县。映秀用于标出更常被指认的极震乡镇。',
    },
  },
  {
    id: 'chengdu',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Chengdu  ·  typological hub', zh: '成都  ·  类型学枢纽' },
    title: { en: 'A projection hub, not a named depot', zh: '投送枢纽，不是某一座仓库' },
    body: {
      en: 'Present-day Chengdu is used as a typological hub for projection into the mountain disaster area, and later as a point on typological lifelines. It is not a named airfield, warehouse, or unit roster.',
      zh: '今成都用作向山地灾区投送的类型学枢纽，后来也出现在生命线示意上。这不是某一座机场、仓库或单位名册。',
    },
  },
  {
    id: 'dujiangyan',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Dujiangyan  ·  approach and pairing', zh: '都江堰  ·  通道与对口' },
    title: { en: 'On the road to Yingxiu; paired with Shanghai', zh: '通往映秀的路上；对口上海' },
    body: {
      en: 'Dujiangyan sits on the typological road approach from Chengdu to Yingxiu. Under the official plan of 18 June 2008, Shanghai was assigned to help Dujiangyan.',
      zh: '都江堰位于成都通往映秀的道路示意上。按二〇〇八年六月十八日的官方方案，由上海对口支援都江堰。',
    },
  },
  {
    id: 'beichuan',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Beichuan  ·  rebuilt seat', zh: '北川  ·  新县城' },
    title: { en: 'A rebuilt county seat, typological', zh: '重建后的县城，类型学' },
    body: {
      en: 'The pin marks the rebuilt Beichuan county seat at Yongchang on the present-day globe. The pre-earthquake seat at Qushan is a different place. Shandong was assigned to help Beichuan under the official counterpart-support plan. This is a typological reconstruction mark, not a tour of the old town.',
      zh: '钉位标出今北川新县城永昌。地震前的曲山县城是另一处地点。官方对口支援方案中，由山东支援北川。这是重建的类型学标记，不是旧城导览。',
    },
  },
  {
    id: 'mianzhu',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Mianzhu  ·  Jiangsu', zh: '绵竹  ·  江苏' },
    title: { en: 'A counterpart-reconstruction county', zh: '一个对口援建县' },
    body: {
      en: 'Under the official plan, Jiangsu was assigned to help Mianzhu. The pin is representative, not a project-by-project map.',
      zh: '按官方方案，由江苏对口支援绵竹。钉位是代表性坐标，不是逐个项目的地图。',
    },
  },
  {
    id: 'shifang',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Shifang  ·  Beijing', zh: '什邡  ·  北京' },
    title: { en: 'A counterpart-reconstruction county', zh: '一个对口援建县' },
    body: {
      en: 'Under the official plan, Beijing was assigned to help Shifang. The pin is representative.',
      zh: '按官方方案，由北京对口支援什邡。钉位是代表性坐标。',
    },
  },
  {
    id: 'qingchuan',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Qingchuan  ·  Zhejiang', zh: '青川  ·  浙江' },
    title: { en: 'A counterpart-reconstruction county', zh: '一个对口援建县' },
    body: {
      en: 'Under the official plan, Zhejiang was assigned to help Qingchuan. The pin is representative.',
      zh: '按官方方案，由浙江对口支援青川。钉位是代表性坐标。',
    },
  },
  {
    id: 'huoshenshan',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Huoshenshan  ·  Caidian  ·  official timeline', zh: '火神山  ·  蔡甸  ·  官方工期' },
    title: { en: 'Ten days, one thousand beds', zh: '十天，一千张床位' },
    body: {
      en: 'Official announcements state that Huoshenshan Hospital began construction on 24 January 2020 and was handed over on 2 February, with a construction period of ten days and 1,000 beds, in Caidian, Wuhan. PLA medical personnel were organized to undertake treatment there. The pin is a site / representative coordinate, not a surveyed building footprint.',
      zh: '官方公布：火神山医院于二〇二〇年一月二十四日开工，二月二日交付，建设工期十天，设置床位一千张，位于武汉蔡甸。解放军抽组医护人员在此承担救治任务。钉位是遗址/代表性坐标，不是建筑物测绘轮廓。',
    },
    note: {
      en: 'Official announcement — Xinhua coverage of the completion, and later official accounts including a SASAC / China State Construction description of the ten-day, 1,000-bed project.',
      zh: '官方公布——新华社关于落成的报道，以及后来国资委 / 中国建筑等官方叙述中关于十日工期、一千张床位的说明。',
    },
  },
  {
    id: 'leishenshan',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Leishenshan  ·  Jiangxia  ·  official timeline', zh: '雷神山  ·  江夏  ·  官方工期' },
    title: { en: 'Twelve days, sixteen hundred beds', zh: '十二天，一千六百张床位' },
    body: {
      en: 'Official announcements state that Leishenshan Hospital began construction on 26 January 2020 and was handed over on 6 February, with a construction period of twelve days and 1,600 beds, in Jiangxia, Wuhan. The pin is a site / representative coordinate near Huangjiahu, not a surveyed building footprint.',
      zh: '官方公布：雷神山医院于二〇二〇年一月二十六日开工，二月六日交付，建设工期十二天，设置床位一千六百张，位于武汉江夏。钉位是黄家湖一带的遗址/代表性坐标，不是建筑物测绘轮廓。',
    },
    note: {
      en: 'Official announcement — official construction accounts, including the SASAC / China State Construction description of the twelve-day, 1,600-bed project.',
      zh: '官方公布——官方建设叙述，包括国资委 / 中国建筑等关于十二日工期、一千六百张床位的说明。',
    },
  },
  {
    id: 'shanghai',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Shanghai  ·  typological', zh: '上海  ·  类型学' },
    title: { en: 'A coastal node', zh: '一个沿海节点' },
    body: {
      en: 'A typological mark at present-day Shanghai, used in the coastal warning frame and as a typological origin for medical and reconstruction support.',
      zh: '今上海的类型学标记，用于沿海预警框，也作为医疗与重建支援的示意起点。',
    },
  },
  {
    id: 'guangzhou',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Guangzhou  ·  typological', zh: '广州  ·  类型学' },
    title: { en: 'A southern coastal node', zh: '一个南方沿海节点' },
    body: {
      en: 'A typological mark at present-day Guangzhou, used in the southern coastal warning frame and as a typological origin for support.',
      zh: '今广州的类型学标记，用于南方沿海预警框，也作为支援出发的示意。',
    },
  },
  {
    id: 'harbin',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Harbin  ·  typological', zh: '哈尔滨  ·  类型学' },
    title: { en: 'The net is national', zh: '这张网是全国的' },
    body: {
      en: 'A typological mark at present-day Harbin, used only to show that warning and support are not coastal-only.',
      zh: '今哈尔滨的类型学标记，仅用于表明预警与支援不只在沿海。',
    },
  },
  {
    id: 'urumqi',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Ürümqi  ·  typological origin', zh: '乌鲁木齐  ·  类型学起点' },
    title: { en: 'A western origin, not a named unit', zh: '西部起点，不是某一支队伍' },
    body: {
      en: 'A typological western origin for national medical projection. It is not a claim about a specific team roster.',
      zh: '全国医疗投送的西部类型学起点。不是某支队伍的名册。',
    },
  },
  {
    id: 'lhasa',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Lhasa  ·  typological origin', zh: '拉萨  ·  类型学起点' },
    title: { en: 'A western origin, typological', zh: '西部起点，类型学' },
    body: {
      en: 'A typological origin used only to show the geographic span of medical projection, not a named unit.',
      zh: '仅用于显示医疗投送地理跨度的类型学起点，不是某一支队伍。',
    },
  },
  {
    id: 'kunming',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Kunming  ·  typological origin', zh: '昆明  ·  类型学起点' },
    title: { en: 'A southwestern origin', zh: '一个西南起点' },
    body: {
      en: 'A typological southwestern origin for medical projection, not a named unit.',
      zh: '医疗投送的西南类型学起点，不是某一支队伍。',
    },
  },
  {
    id: 'xian',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Xi’an  ·  typological', zh: '西安  ·  类型学' },
    title: { en: 'An inland node', zh: '一个内陆节点' },
    body: {
      en: 'A typological mark at present-day Xi’an, used in the inland warning frame and as a typological support origin.',
      zh: '今西安的类型学标记，用于内陆预警框，也作为支援出发的示意。',
    },
  },
  {
    id: 'shenyang',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Shenyang  ·  typological origin', zh: '沈阳  ·  类型学起点' },
    title: { en: 'A northeastern origin', zh: '一个东北起点' },
    body: {
      en: 'A typological northeastern origin for medical projection, not a named unit.',
      zh: '医疗投送的东北类型学起点，不是某一支队伍。',
    },
  },
  {
    id: 'lanzhou',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'Lanzhou  ·  typological', zh: '兰州  ·  类型学' },
    title: { en: 'An inland western node', zh: '一个内陆西部节点' },
    body: {
      en: 'A typological mark at present-day Lanzhou, used in the inland warning frame.',
      zh: '今兰州的类型学标记，用于内陆预警框。',
    },
  },
  {
    id: 'china',
    kind: 'site' as const satisfies JourneyCardKind,
    sourceKind: 'typological' as const satisfies SourceKind,
    kicker: { en: 'China  ·  typological stage', zh: '中国  ·  类型学舞台' },
    title: { en: 'The country as a stage', zh: '把国家当作舞台' },
    body: {
      en: 'A regional typological anchor for China on the present-day globe. It is not a single disaster site, and it is not a scoreboard.',
      zh: '今地图上中国的地区性类型学锚点。它不是某一处灾点，也不是一块记分牌。',
    },
  },
] as const

export const INSTITUTION_CARDS = [
  {
    id: 'response-levels',
    kind: 'doctrine' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Institutions  ·  official system', zh: '体制  ·  官方制度' },
    title: { en: 'Four-level response', zh: '四级响应' },
    body: {
      en: 'Under the Emergency Response Law and the national overall contingency plan, emergencies are classed as particularly major, major, large, or ordinary. National-level emergency response is divided, from high to low, into Level I, II, III and IV, with Level I the highest. This card describes the system. It does not reconstruct any one activation.',
      zh: '依据《突发事件应对法》和国家总体应急预案，突发事件分为特别重大、重大、较大、一般。国家层面的应急响应由高到低分为一级、二级、三级、四级，一级最高。本卡只说明制度，不复原某一次启动。',
    },
  },
  {
    id: 'fire-rescue',
    kind: 'institution' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Institutions  ·  9 November 2018', zh: '体制  ·  二〇一八年十一月九日' },
    title: { en: 'National comprehensive fire-and-rescue teams', zh: '国家综合性消防救援队伍' },
    body: {
      en: 'After the 2018 reform, the public-security fire forces and the PAP forest forces were reorganized and, together with other emergency-rescue forces, became a standing professional backbone under the Ministry of Emergency Management. On 9 November 2018 the teams were presented with a flag in an official ceremony.',
      zh: '二〇一八年改革后，公安消防部队和武警森林部队转制，与其他应急救援力量一并作为综合性常备骨干，由应急管理部管理。二〇一八年十一月九日，队伍在官方仪式上授旗。',
    },
  },
  {
    id: 'defense-mobilization',
    kind: 'doctrine' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Institutions  ·  civilian-facing', zh: '体制  ·  民用一侧' },
    title: { en: 'National defense mobilization, in peacetime', zh: '平时的国防动员' },
    body: {
      en: 'National defense mobilization, on its civilian-facing side, is about organizing transport, supplies, and reserve capacity. In peacetime this capacity can also be turned to emergency rescue. This chapter treats it as a type of state capability, and leaves an explicit interface to the 2026 military baseline.',
      zh: '国防动员面对的是民用一侧的组织能力：交通、物资和预备力量。在平时，这套能力也可以转用于抢险救援。本章把它当作一种国家能力的类型，并给二〇二六军力基线留出明确接口。',
    },
  },
  {
    id: 'pairing',
    kind: 'institution' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Rebuild  ·  18 June 2008', zh: '重建  ·  二〇〇八年六月十八日' },
    title: { en: 'Counterpart support: one province, one county', zh: '对口支援：一省帮一重灾县' },
    body: {
      en: 'The State Council General Office notice of 18 June 2008 established a counterpart-support mechanism. Nineteen provinces and municipalities were assigned, on the principle of “one province helps one hard-hit county,” to support eighteen hard-hit counties and cities in Sichuan, plus hard-hit areas in Gansu and Shaanxi, for a term of three years. The arrows on the globe are schematic.',
      zh: '二〇〇八年六月十八日，国务院办公厅印发对口支援方案，建立灾后恢复重建对口支援机制。按「一省帮一重灾县」，安排十九个省市，支援四川十八个重灾县市以及甘肃、陕西受灾严重地区，期限三年。地球上的箭头是示意。',
    },
    note: {
      en: 'Official announcement — Notice of the General Office of the State Council on printing and issuing the Wenchuan Earthquake Post-disaster Recovery and Reconstruction Counterpart Support Plan (18 June 2008).',
      zh: '官方公布——《国务院办公厅关于印发汶川地震灾后恢复重建对口支援方案的通知》（二〇〇八年六月十八日）。',
    },
  },
  {
    id: 'medical-teams',
    kind: 'campaign' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Epidemic  ·  8 March 2020', zh: '疫情  ·  二〇二〇年三月八日' },
    title: { en: 'Medical teams to Wuhan and Hubei', zh: '驰援武汉和湖北的医疗队' },
    body: {
      en: 'The National Health Commission reported on 8 March 2020 that 346 medical teams, 42,600 medical workers, had already arrived to support Wuhan and Hubei. The routes on the globe are typological origins, not a complete roster of those teams.',
      zh: '国家卫生健康委二〇二〇年三月八日通报：已有三百四十六支医疗队、四点二六万名医护人员抵达，支援武汉和湖北。地球上的路线是类型学起点，不是这三百四十六支队伍的完整名册。',
    },
    note: {
      en: 'Official announcement — National Health Commission briefing, 8 March 2020, as reported by official media. This is a dated snapshot, not a later closing total invented on this screen.',
      zh: '官方公布——国家卫生健康委二〇二〇年三月八日通报，见官方媒体报道。这是有日期的时点数字，不是本屏另算的截止总数。',
    },
  },
  {
    id: 'cabin-hospitals',
    kind: 'doctrine' as const satisfies JourneyCardKind,
    sourceKind: 'official' as const satisfies SourceKind,
    kicker: { en: 'Epidemic  ·  official description', zh: '疫情  ·  官方表述' },
    title: { en: 'Cabin hospitals, as officially described', zh: '官方所说明的方舱医院' },
    body: {
      en: 'Cabin hospitals, as officially described in 2020, were public buildings such as exhibition centres and gymnasiums converted to receive patients with mild illness, as a way of expanding treatment capacity. This card follows that official description. It does not invent a closing bed total.',
      zh: '二〇二〇年官方把方舱医院说明为：把会展中心、体育馆等公共空间改成收治轻症患者的设施，用以扩大收治能力。本卡按这一官方表述来介绍，不另造一个收官床位总数。',
    },
  },
] as const

export type MobilizeCard = (typeof SITE_CARDS)[number] | (typeof INSTITUTION_CARDS)[number]

export function findMobilizeCard(kind: string, id: string): MobilizeCard | null {
  const fromSites = SITE_CARDS.find((item) => item.id === id)
  if (fromSites && (kind === fromSites.kind || kind === 'site' || kind === 'institution' || kind === 'campaign' || kind === 'doctrine')) {
    if (fromSites.id === id) return fromSites
  }
  const fromInstitutions = INSTITUTION_CARDS.find((item) => item.id === id)
  if (fromInstitutions) return fromInstitutions
  return fromSites ?? null
}

export const SOURCE_SECTIONS = [
  {
    title: { en: 'How this chapter treats numbers', zh: '本章如何对待数字' },
    paragraphs: [
      {
        en: 'This is a popular-science tour for a general audience, not a literature recitation and not a casualty ledger. Official announcements and external estimates are labeled separately. If a figure could not be verified in a citable public source, it was omitted rather than approximated. The globe never visualizes a body count, and spoken narration does not offer a replacement fatality figure for 1998, 2008, 2003, or 2020.',
        zh: '这是面向一般听众的科普导览，不是文献背诵，也不是伤亡账本。官方公布与外部估计分开标注。凡是无法在可引用的公开来源中核对的数字，宁缺不编。地球上从不把死亡人数可视化，口播也不为一九九八年、二〇〇八年、二〇〇三年或二〇二〇年另造一个替代死亡数字。',
      },
    ],
  },
  {
    title: { en: 'Official announcements used in the tour', zh: '导览中采用的官方公布' },
    items: [
      {
        en: 'State Council institutional reform plan, approved by the first session of the 13th National People’s Congress on 17 March 2018, creating the Ministry of Emergency Management; official coverage of the ministry’s inauguration on 16 April 2018 (gov.cn / Xinhua).',
        zh: '二〇一八年三月十七日第十三届全国人民代表大会第一次会议批准的《国务院机构改革方案》，组建应急管理部；同年四月十六日挂牌的官方报道（中国政府网 / 新华社）。',
      },
      {
        en: 'Emergency Response Law of the People’s Republic of China, and the national overall contingency plan: emergencies classed as particularly major, major, large, or ordinary; national-level response divided into Levels I–IV, with Level I the highest.',
        zh: '《中华人民共和国突发事件应对法》和国家突发事件总体应急预案：突发事件分为特别重大、重大、较大、一般；国家层面应急响应分为一级至四级，一级最高。',
      },
      {
        en: 'Official accounts of the 2018 reform and the 9 November 2018 flag presentation establishing the national comprehensive fire-and-rescue teams, formed after the public-security fire forces and the PAP forest forces were reorganized, under the Ministry of Emergency Management (gov.cn).',
        zh: '二〇一八年改革及十一月九日授旗的官方报道：公安消防部队和武警森林部队转制后，组建国家综合性消防救援队伍，由应急管理部管理（中国政府网）。',
      },
      {
        en: 'Wen Jiabao, Report on the current nationwide flood-fighting situation, delivered to the fourth meeting of the Standing Committee of the Ninth NPC on 26 August 1998, on behalf of the State Council: 66 divisions, brigades and PAP corps, 274,000 troops; more than five million militia and reserve personnel; a Shashi water level of 45.22 metres is also recorded in official hydrological accounts.',
        zh: '温家宝受国务院委托，一九九八年八月二十六日在第九届全国人大常委会第四次会议上所作《关于当前全国抗洪抢险情况的报告》：先后调动六十六个师、旅和武警总队，共二十七点四万兵力；组织民兵预备役部队五百多万人。沙市水位四十五点二二米，亦见官方水文记载。',
      },
      {
        en: 'Official project descriptions of the Three Gorges Project: flood-control storage of 22.15 billion cubic metres; the flood-protection standard of the Jingjiang reach raised from a ten-year to a hundred-year event (China Three Gorges Group and water-resources authorities). The tour is careful to state that the dam was not yet in designed flood-control operation in 1998.',
        zh: '三峡工程的官方说明：防洪库容二百二十一点五亿立方米；将荆江河段防洪标准由十年一遇提高到百年一遇（中国三峡集团及水利主管部门）。导览明确写明：一九九八年时大坝尚未按设计投入防洪运行。',
      },
      {
        en: 'State Council report to the NPC Standing Committee on the Wenchuan earthquake relief and recovery work (figures as of 23 June 2008): more than 140,000 PLA and PAP troops; more than 28,000 public-security police, firefighters and special police; more than 75,000 militia and reserve personnel; 7,084 aircraft sorties; more than 1.46 million people freed or transferred; 84,017 people rescued from the rubble. These are used only as dated official relief figures, not as a fatality total.',
        zh: '国务院向全国人大常委会报告汶川地震抗震救灾及灾后恢复重建工作情况（统计截至二〇〇八年六月二十三日）：解放军和武警部队十四万余人，公安民警、消防官兵和特警二点八万余人，民兵预备役七点五万余人，飞机七千零八十四架次；解救转移被困群众一百四十六万余人，从废墟中抢救被掩埋人员八万四千零十七人。只作为有日期的官方救援数字使用，不用作死亡总数。',
      },
      {
        en: 'Notice of the General Office of the State Council on printing and issuing the Wenchuan Earthquake Post-disaster Recovery and Reconstruction Counterpart Support Plan, 18 June 2008: nineteen provinces and municipalities, “one province helps one hard-hit county,” a three-year term, with the official pairing list used for the typological arrows.',
        zh: '《国务院办公厅关于印发汶川地震灾后恢复重建对口支援方案的通知》，二〇〇八年六月十八日：十九个省市，「一省帮一重灾县」，期限三年；对口名单用于地球上的示意箭头。',
      },
      {
        en: 'A 2018 Xinhua report, in official commemorative coverage, stated that the eighteen provinces and municipalities supporting Sichuan had carried out 3,668 reconstruction projects, with assistance amounting to 78.4 billion yuan. This is cited as a later official tally, not as a figure calculated here.',
        zh: '二〇一八年新华社在官方纪念报道中写道：对口支援四川的十八个省市累计实施援建项目三千六百六十八个，援建金额七百八十四亿元。作为事后官方汇总引用，不是本屏计算的结果。',
      },
      {
        en: 'Notice No. 1 of the Wuhan headquarters for the prevention and control of pneumonia caused by the novel coronavirus, 23 January 2020: from 10:00 that day, outbound routes from Wuhan were closed (Xinhua / official notice).',
        zh: '《武汉市新型冠状病毒感染的肺炎疫情防控指挥部通告（第1号）》，二〇二〇年一月二十三日：自当天十时起关闭离汉通道（新华社 / 官方通告）。',
      },
      {
        en: 'Official construction accounts of Huoshenshan and Leishenshan: Huoshenshan, 24 January–2 February 2020, ten days, 1,000 beds; Leishenshan, 26 January–6 February 2020, twelve days, 1,600 beds (Xinhua and later SASAC / China State Construction official accounts). Official reports that PLA medical personnel were organized for treatment at Huoshenshan.',
        zh: '火神山、雷神山的官方建设叙述：火神山，二〇二〇年一月二十四日至二月二日，工期十天，床位一千张；雷神山，一月二十六日至二月六日，工期十二天，床位一千六百张（新华社及后来国资委 / 中国建筑等官方叙述）。解放军抽组医护人员承担火神山救治任务，亦见官方报道。',
      },
      {
        en: 'National Health Commission briefing, 8 March 2020: 346 medical teams, 42,600 medical workers, already supporting Wuhan and Hubei (official media). This is a dated snapshot.',
        zh: '国家卫生健康委二〇二〇年三月八日通报：三百四十六支医疗队、四点二六万名医护人员已支援武汉和湖北（官方媒体）。这是有日期的时点数字。',
      },
      {
        en: 'Official descriptions of cabin hospitals as converted public buildings for patients with mild illness; official presentations of meteorological warning and grassroots “call-and-response”; official presentations and plans describing earthquake early warning as second-scale alerts in key regions; official descriptions of aviation rescue development and of the central emergency-stockpile system. These are used as official system descriptions, not as verified performance claims for every event.',
        zh: '官方关于方舱医院（公共建筑改建、收治轻症）的说明；气象预警及直达基层责任人「叫应」的公开介绍；把地震预警描述为重点地区秒级提醒的官方介绍与规划；航空救援能力建设和中央救灾物资储备体系的官方表述。均作为官方制度/能力描述使用，不把它们写成每一次事件都已验证的绩效数字。',
      },
    ],
  },
  {
    title: { en: 'External estimates and international sources', zh: '外部估计与国际来源' },
    paragraphs: [
      {
        en: 'International sources — including WHO epidemiological updates, UN disaster reports, CRED / EM-DAT, and later academic estimates — exist for several of the events in this chapter. Where they offer figures, especially fatality or excess-mortality totals, they do not always agree with official Chinese bulletins, and they are not always counting the same thing. This chapter does not place those external totals on the globe or in the spoken narration, and it does not invent a mid-point. If a reader meets an external estimate, it should be labeled as such and read beside, not merged with, the official announcement.',
        zh: '国际来源——包括世界卫生组织的流行病学通报、联合国灾害报告、CRED / EM-DAT，以及后来的学术估计——对本章涉及的若干事件是存在的。它们给出的数字，尤其是死亡或超额死亡，与中国官方通报并不总是一致，也未必在统计同一件事。本章不把这些外部总数放上地球或写进口播，也不另造一个区间中值。读者若遇到外部估计，应标明为外部估计，与官方公布对照阅读，而不是合并成一个数。',
      },
    ],
    items: [
      {
        en: 'World Health Organization, situation reports and later assessments on SARS (2003) and COVID-19 (2020–). Any WHO figure is an external estimate or an international compilation, not a substitute official Chinese bulletin.',
        zh: '世界卫生组织关于SARS（二〇〇三年）和COVID-19（二〇二〇年起）的情况通报与后来评估。凡世卫数字，均为外部估计或国际汇总之类，不能代替中国官方通报。',
      },
      {
        en: 'CRED / EM-DAT and related UN disaster compilations, as international tallies that may differ in definition and closing date from official Chinese reports.',
        zh: 'CRED / EM-DAT 及有关联合国灾害汇编，作为国际统计，其口径和截止日可能与中国官方报告不同。',
      },
    ],
  },
  {
    title: { en: 'What this chapter refused to invent', zh: '本章拒绝编造的内容' },
    items: [
      {
        en: 'A replacement fatality total, or a mid-point between official and external death figures, for the 1998 floods, the Wenchuan earthquake, SARS, or COVID-19.',
        zh: '为一九九八年洪水、汶川地震、SARS 或新冠疫情另造的死亡总数，或把官方与外部死亡数字折中后当作事实。',
      },
      {
        en: 'Troop, medical-team, bed, or reconstruction figures that could not be tied to a dated official announcement. Mid-campaign official snapshots (for example the 26 August 1998 State Council report, or the 8 March 2020 health-commission briefing) are labeled as such, not rewritten as closing totals.',
        zh: '无法对应到有日期的官方公布的兵力、医疗队、床位或重建数字。抗洪或抗疫过程中的官方时点数字（例如一九九八年八月二十六日国务院报告、二〇二〇年三月八日卫健委通报）均如实标注时点，不改写成收官总数。',
      },
      {
        en: 'Exact warehouse doorways, aircraft-parking stands, or hospital footprints presented as surveyed data. Pins are representative or site coordinates on the present-day globe.',
        zh: '把某座仓库门口、机位或医院轮廓写成已经测绘的数据。钉位均为今地图上的代表性或遗址坐标。',
      },
      {
        en: 'Any claim that the Three Gorges Dam was already operating as designed for flood control during the 1998 flood.',
        zh: '任何把三峡大坝写成一九九八年大洪水时已经按设计投入防洪运行的说法。',
      },
    ],
  },
  {
    title: { en: 'Merge interfaces left for the other chapters', zh: '留给其他各章的合并接口' },
    paragraphs: [
      {
        en: 'Warring States (force): household registers, granaries, and counties as an earlier state machinery for turning people and grain into resources that can be levied again. This chapter does not rewrite Chapter I.',
        zh: '战国章（force）：户籍、粮仓和县制，是更早的国家机器，用以把人和粮食变成可再次征发的资源。本章不改写第一章。',
      },
      {
        en: 'Resist US Aggression and Aid Korea (korea): wartime mobilization versus peacetime disaster mobilization. The comparison is left as an interface, not scored on this screen.',
        zh: '抗美援朝（korea）：战时动员，与平时的灾害动员。比较接口已经留好，本屏不作打分。',
      },
      {
        en: '2026 military baseline (baseline2026): defense mobilization, projection, and dual-use capacity as another face of the same state capability.',
        zh: '二〇二六军力基线（baseline2026）：国防动员、投送和军民两用能力，是同一套国家能力的另一面。',
      },
    ],
  },
] as const
