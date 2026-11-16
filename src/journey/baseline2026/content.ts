/**
 * Bilingual copy for the 2026 China military baseline journey.
 * Chinese is the default overlay language; English is a complete peer, not a gloss.
 * Official announcements and external estimates are labeled throughout.
 * This is a popular-science tour, not an intelligence briefing.
 */
import { BEAT_STAGING } from './sites'
import type { JourneyBeat, Localized } from '../types'

export const JOURNEY_META = {
  id: 'baseline2026' as const,
  queryValue: 'baseline2026',
  chapterTitle: {
    en: 'Force · 2026 Military Baseline',
    zh: '力 · 2026 军力基线',
  } satisfies Localized,
}

export const UI = {
  brandKicker: { en: 'Force', zh: '力' } satisfies Localized,
  brandTitle: { en: '2026 Military Baseline', zh: '2026 军力基线' } satisfies Localized,
  brandWindow: {
    en: 'A public baseline on the present-day Earth  ·  calendar cursor 2026',
    zh: '在今日地球上的公开基线  ·  时间窗为 2026 年',
  } satisfies Localized,
  exit: { en: 'Exit journey', zh: '退出导览' } satisfies Localized,
  enter: { en: '2026 Baseline', zh: '2026 军力基线' } satisfies Localized,
  sourcesBtn: { en: 'Sources', zh: '信源与注释' } satisfies Localized,
  sourcesKicker: { en: 'Notes for presenters and readers', zh: '供讲解者与听众核对' } satisfies Localized,
  sourcesTitle: { en: 'Sources & cautions', zh: '信源与审慎说明' } satisfies Localized,
  close: { en: 'Close', zh: '关闭' } satisfies Localized,
  langEn: 'EN',
  langZh: '中文',
  languageLabel: { en: 'Language', zh: '语言' } satisfies Localized,
  hints: {
    en: '0–7 jump beats   ·   ← → change beat   ·   Space play/pause   ·   Drag the globe   ·   Click a regional mark or a chart row   ·   Esc to exit',
    zh: '0–7 跳转段落   ·   ← → 切换段落   ·   空格播放或暂停   ·   拖动地球   ·   点击地区标记或对照表行   ·   Esc 退出',
  } satisfies Localized,
  commentary: { en: 'Commentary', zh: '解说' } satisfies Localized,
  playNarration: { en: 'Play narration', zh: '播放解说' } satisfies Localized,
  pauseNarration: { en: 'Pause', zh: '暂停' } satisfies Localized,
  resumeNarration: { en: 'Resume', zh: '继续播放' } satisfies Localized,
  replayNarration: { en: 'Replay from the start', zh: '从头播放' } satisfies Localized,
  playHint: {
    en: 'After you click, the globe turns to each region. Spoken audio is Chinese-only for now.',
    zh: '点击后，镜头会转到对应地区。语音解说目前仅为中文。',
  } satisfies Localized,
  voiceChineseOnly: {
    en: 'Spoken narration is Chinese-only for now. On-screen text stays in English.',
    zh: '语音解说目前仅为中文。画面文字仍可切换为英文。',
  } satisfies Localized,
  narrationError: {
    en: 'Voice could not be loaded. You can still walk the globe and read the commentary.',
    zh: '语音未能载入。仍可浏览地球并阅读解说。',
  } satisfies Localized,
  coordinateCaution: {
    en: 'Marks are regional or typological, on the present-day globe. They are not headquarters, bases, yards, airfields, or missile sites.',
    zh: '标记为今地图上的地区性或类型学位置，不是总部、基地、船坞、机场或导弹阵地。',
  } satisfies Localized,
  illustrationCaution: {
    en: 'Schematic / typological — not a photograph, and not an operational chart.',
    zh: '示意 / 类型学，并非照片，也不是作战图。',
  } satisfies Localized,
  dossierLabel: { en: 'Public dossier', zh: '公开卷宗' } satisfies Localized,
  estimateLabel: { en: 'External estimate', zh: '外部估计' } satisfies Localized,
  officialLabel: { en: 'Official announcement', zh: '官方公布' } satisfies Localized,
  blockLegend: {
    en: 'Hatched columns are external estimates: personnel (IISS), 2025 spending (SIPRI), combat aircraft (FlightGlobal). Units and definitions differ; this is not a scoreboard. Marks are schematic, not headquarters or bases.',
    zh: '阴影柱为外部估计：人数（IISS）、2025 年军费（SIPRI）、作战飞机（FlightGlobal）。单位与口径不同，不是记分牌。标记为示意，不是总部或基地。',
  } satisfies Localized,
  theaterHint: {
    en: 'Click a theater region. The marks are regional centroids, not headquarters addresses.',
    zh: '可点击战区地域。标记是地区中心，不是总部门牌。',
  } satisfies Localized,
  platformHint: {
    en: 'Click a typological silhouette or industrial region. Nothing here is a berth or a runway.',
    zh: '可点击类型学剪影或产业带标记。这里没有泊位，也没有跑道。',
  } satisfies Localized,
  westPacHint: {
    en: 'The arc is a wide framing of the western Pacific, not a targeting plot.',
    zh: '这条弧线是西太平洋的开阔取景，不是目标图。',
  } satisfies Localized,
  closeHint: {
    en: 'Chapter I is the ancient tick of the same three capacities. Korea 1950–53 belongs to a sibling journey.',
    zh: '第一章是同一组能力在古代的刻度。一九五〇到五三年属于一条平行导览。',
  } satisfies Localized,
  continueHint: {
    en: 'A later sibling journey can take 1950–53. It is not in this build.',
    zh: '一条平行导览可以讲述一九五〇到五三年。它不在本次构建中。',
  } satisfies Localized,
}

export const BEATS = [
  {
    id: 'hook',
    name: { en: 'Hook', zh: '开场' },
    kicker: { en: '2026 baseline  ·  first, straighten the ruler', zh: '2026 年基线  ·  先把尺子摆正' },
    title: { en: 'First, straighten the ruler.', zh: '先把尺子摆正。' },
    body: {
      en: 'This is a public baseline on the same Earth as Chapter I, not a threat briefing. We will look at three axes: force structure, arms and industry, and the public language of modernization.',
      zh: '这是在第一章同一颗地球上的公开基线，不是一份威胁简报。我们要看三条轴：体量与编成，装备与工业，研发方向与战争思想。',
    },
    narration: {
      en: [
        'First, straighten the ruler. This is the same Earth we turned in Chapter I. Set the calendar to 2026. What follows is not a threat briefing. It is a public baseline, read aloud, on three axes: how the force is sized and organized; the arms and the industry behind them; and the official language of research, modernization, and military thought.',
        'From the first sentence to the last, official announcements and external estimates will be labeled as such. China does not publish a detailed public end-strength table the way some countries do. When a figure cannot be checked from the public record, I will say so. I will not invent a replacement number.',
      ],
      zh: [
        '先把尺子摆正。这颗地球，还是第一章里那颗地球。把时间拨到二〇二六年。接下来不是一份威胁简报，而是一份念给听众听的公开基线。我们只看三条轴：体量与编成，装备与工业，研发方向与战争思想。',
        '从头到尾，官方公布和外部估计都会分开标明。中国并不像有些国家那样，公布一份很细的公开兵力总表。遇到公开记录里还对不上的数字，我会说它还不清楚，而不会另造一个数来代替。',
      ],
    },
  },
  {
    id: 'timeline',
    name: { en: 'Timeline', zh: '时间尺' },
    kicker: { en: 'Beat 1  ·  Why a baseline', zh: '第一段  ·  为什么要有基线' },
    title: { en: 'The same three capacities, a later tick.', zh: '还是那三种能力，只是刻度到了今天。' },
    body: {
      en: 'Chapter I left three visible capacities on this Earth. This journey asks what they look like in the public record of 2026. The Korean War of 1950–53 is another calibration point, told on a sibling journey.',
      zh: '第一章在这颗地球上留下了三种看得见的能力。本线要问：到了二〇二六年的公开记录里，它们变成了什么样子。一九五〇到五三年的朝鲜战争，是另一条平行导览上的校准点。',
    },
    narration: {
      en: [
        'Remember the three capacities that Chapter I could actually defend: a state that could turn households and counties into resources levied again and again; a military industry that could put serviceable weapons into many hands; and strategy written down as a transmissible state craft.',
        'Now ask the same question in 2026. What do those capacities look like in the public record? The war in Korea, from 1950 to 1953, is another calibration point on this same Earth. It will be told on a sibling journey, not in this chapter.',
      ],
      zh: [
        '请先记住第一章里三种已经站得住的能力：用编户和县制，把人和粮食变成可以反复征发的资源；用军工，把可用的武器交到许多人手里；再把谋略写成可以传授的国家技艺。',
        '现在把同样的问题问到二〇二六年。在公开记录里，这三种能力变成了什么样子？一九五〇到五三年的朝鲜战争，是这颗地球上另一个校准点。它会在一条平行的导览里讲述，不在本章展开。',
      ],
    },
  },
  {
    id: 'structure',
    name: { en: 'Structure', zh: '编成' },
    kicker: { en: 'Beat 2  ·  Size and organization', zh: '第二段  ·  体量与编成' },
    title: { en: 'Start with the official structure.', zh: '先看官方写明的结构。' },
    body: {
      en: 'The public structure is clear: the Central Military Commission, five theater commands since the 2016 reform, and the services. Personnel totals and broader spending estimates come from outside sources and are labeled as such.',
      zh: '公开结构是清楚的：中央军委，二〇一六年改革后的五大战区，以及军种、兵种。人数和更宽的军费估计来自外部，会单独标明。',
    },
    narration: {
      en: [
        'Start with the official structure. It is public, and it is not a guess. The Central Military Commission sits at the top. On 1 February 2016, five theater commands were established: Eastern, Southern, Western, Northern, and Central, replacing the former military regions. The marks on this globe are regional centroids of those theater areas. They are not headquarters street addresses.',
        'On 19 April 2024, an official ceremony announced a new Information Support Force, abolished the designation of the Strategic Support Force, and adjusted the leadership and management of the Military Aerospace Force and the Cyberspace Force. A Ministry of National Defense briefing the same day said the PLA now has a new layout of services and arms under the Commission: the Army, Navy, Air Force, and Rocket Force among the services; and, among the arms, the Military Aerospace Force, the Cyberspace Force, the Information Support Force, and the Joint Logistic Support Force. Keep those official names. Do not embroider them.',
        'End-strength is different. China does not publish a detailed public personnel table the way some countries do. Open summaries of IISS The Military Balance 2026 list active PLA personnel at about 2.035 million. That is an external estimate. This tour treats it as an order of two million, not a verified muster. The official 2026 defense budget, announced at the NPC, is 1.94 trillion yuan in the national general public budget, up 6.9 percent from the previous year’s executed figure; of that, 1.91 trillion yuan is central-level spending, up 7 percent. SIPRI’s estimate for 2025, published in 2026, is about 336 billion US dollars — a broader external definition, not a second official budget, and not yet a 2026 SIPRI figure.',
      ],
      zh: [
        '先看官方写明的结构。这不是猜测。上面是中央军委。二〇一六年二月一日，正式成立东部、南部、西部、北部、中部五大战区，取代原来的军区。地球上的标记，是这些战区地域的地区中心，不是总部的门牌号。',
        '二〇二四年四月十九日，官方宣布新组建信息支援部队，同时撤销战略支援部队番号，并调整军事航天部队和网络空间部队的领导管理关系。国防部当天说明，军队总体形成军委领导指挥下的陆军、海军、空军、火箭军等军种，以及军事航天部队、网络空间部队、信息支援部队、联勤保障部队等兵种的新布局。请只记住这些官方名称，不要再往里面添情节。',
        '人数却不一样。中国不公布一份像有些国家那样细的公开兵力总表。国际战略研究所《军事平衡》二〇二六年版，在公开转述里，把解放军现役约写成二百零三点五万人。这是外部估计，在这里只当作约二百万人这个量级，不是已经核对过的名册。军费也要分开看。二〇二六年全国两会公布：全国一般公共预算安排国防支出一点九四万亿元，比上年执行数增长百分之六点九；其中中央本级一点九一万亿元，增长百分之七。这是官方公布。斯德哥尔摩国际和平研究所对二〇二五年中国军费的估计约为三千三百六十亿美元，口径更宽，不是第二份官方预算，也还不是对二〇二六年的估计。',
      ],
    },
  },
  {
    id: 'equipment',
    name: { en: 'Equipment', zh: '装备' },
    kicker: { en: 'Beat 3  ·  Arms and industry', zh: '第三段  ·  装备与工业' },
    title: { en: 'Only what has been officially shown.', zh: '只说已经公开亮相的东西。' },
    body: {
      en: 'Public, typological platforms only: carriers in commission, a Type 055 first-of-class that was officially inducted, the J-20 in official service and on official display. Industry is marked as coastal regions, not yards. The Rocket Force is named; its sites are not.',
      zh: '只谈公开的、类型学的装备：已入列的航母，官方入列的〇五五型首舰，已列装并在官方场合展示过的歼-20。工业只标沿海产业带，不标船坞。火箭军是公开军种，不标阵地。',
    },
    narration: {
      en: [
        'Treat the silhouettes in front of you as typological. They are not a berth, and not a runway. Liaoning was officially commissioned in 2012, Shandong in 2019 — both are in service. Fujian was officially launched and named in June 2022, and on 5 November 2025 an official commissioning and flag-presentation ceremony was held. A PLAN spokesperson later said that trials, ship-aircraft integration, and training would continue after commissioning. This tour stops at that official wording.',
        'The first Type 055 destroyer, Nanchang, was officially commissioned on 12 January 2020. The J-20 was confirmed in official service in 2017 and 2018, and has been displayed at official parades and air shows. The Rocket Force is an official service. We will not inventory missiles, and we will not pin launch sites on this Earth.',
        'Industry, too, is read from the public record. Official media and open estimates both discuss the scale of shipbuilding and aviation industry. The marks here are typological coastal industrial regions, not dock berths.',
      ],
      zh: [
        '请把眼前的舰影和机影当作类型学示意，不是某一处码头，也不是某一条跑道。辽宁舰二〇一二年入列，山东舰二〇一九年入列，都是官方公布的现役航母。福建舰二〇二二年六月下水命名，二〇二五年十一月五日举行入列授旗仪式。海军发言人随后说明，入列后还要继续试验验证和舰机适配训练。我们只说到这一步。',
        '万吨级驱逐舰〇五五型首舰南昌舰，二〇二〇年一月十二日正式入列。歼-20在二〇一七年、二〇一八年已由官方确认列装，并在阅兵和航展等官方场合展示过。火箭军是公开的军种。我们不会在地球上清点导弹，也不会钉出发射场。',
        '工业能力，同样只看公开叙述。官方媒体和外部分析都会谈到造船和航空工业的规模。这里的标记，只是沿海产业带的类型学位置，不是船坞泊位。',
      ],
    },
  },
  {
    id: 'scale',
    name: { en: 'Scale', zh: '量级' },
    kicker: { en: 'Beat 4  ·  A global reading of magnitude', zh: '第四段  ·  把主要力量的量级放到同一张图上' },
    title: { en: 'An order of magnitude, not a scoreboard.', zh: '先看量级，不要看谁胜谁负。' },
    body: {
      en: 'Hatched columns are external estimates, under published definitions: active personnel (IISS), military spending in 2025 (SIPRI), and combat aircraft (FlightGlobal). Units and definitions differ. This is a magnitude, not a who-would-win table.',
      zh: '阴影柱是按已经公布的口径所作的外部估计：现役人数（IISS）、二〇二五年军费（SIPRI）、作战飞机（FlightGlobal）。单位和口径并不相同。这是量级，不是谁胜谁负的对照表。',
    },
    narration: {
      en: [
        'Pull the Earth back. The three columns standing on each country’s region are magnitudes under published definitions, not a scoreboard of who would win. The units are not the same, and the definitions are not the same. Hatching marks an external estimate. These are schematic marks, not headquarters and not bases.',
        'Personnel first. Open summaries of IISS The Military Balance 2026, counting active armed forces during 2025, give these external estimates: China about 2.035 million, India about 1.501 million, the United States about 1.340 million, the Democratic People’s Republic of Korea about 1.280 million, and Russia about 1.264 million. All of these are external estimates. China does not publish a detailed public end-strength table; the China figure is still treated here as an order of two million.',
        'Weapons and money draw a different picture. SIPRI’s figures for 2025 are: the United States 954 billion dollars, China an estimated 336 billion, Russia an estimated 190 billion, then Germany, India, and the United Kingdom. FlightGlobal’s World Air Forces 2026 count of combat aircraft — fighters, attack aircraft, and bombers, as FlightGlobal defines that category — is 2,718 for the United States, 1,814 for China, 1,559 for Russia, and 600 for India. That is an external count. Navy hull totals are not stacked into a single column, because the definitions differ too widely. For the PLAN, this tour keeps only the already-checked wording of the US Defense Department’s 2024 public report; for aircraft, it uses this same air-force directory.',
      ],
      zh: [
        '请把地球拉远。各国地域上立着的三根柱子，是按已经公布的口径来看的量级，不是谁胜谁负的记分牌。单位不同，口径也不同。阴影表示外部估计。这是示意，不是总部，也不是基地。',
        '先看人数。国际战略研究所《军事平衡》二〇二六年版的公开转述，按二〇二五年的现役计：中国约二百零三点五万人，印度约一百五十点一万人，美国约一百三十四万人，朝鲜约一百二十八万人，俄罗斯约一百二十六点四万人。这些都是外部估计。中国并不公布一份很细的公开兵力总表；对中国这个数字，仍然只当作约二百万人这个量级来看。',
        '武器和军费，画出的是另一幅图。斯德哥尔摩国际和平研究所对二〇二五年的统计：美国九千五百四十亿美元，中国估计三千三百六十亿美元，俄罗斯估计一千九百亿美元，其后是德国、印度、英国。飞行国际《世界空军》二〇二六年版的作战飞机口径——按它自己的定义，包括战斗机、攻击机和轰炸机——美国二千七百一十八架，中国一千八百一十四架，俄罗斯一千五百五十九架，印度六百架。这是外部清点。海军舰艇数量的口径差得太远，不会叠成一根柱子；人民海军只沿用已经核对过的美国国防部二〇二四年表述，飞机则用同一份航空名录。',
      ],
    },
  },
  {
    id: 'seas',
    name: { en: 'Seas', zh: '近海与远海' },
    kicker: { en: 'Beat 5  ·  Two public voices', zh: '第五段  ·  两种公开的声音' },
    title: { en: 'A wide framing, not a targeting plot.', zh: '这是取景，不是作战图。' },
    body: {
      en: 'The official language of the 2019 defense white paper is defensive: safeguarding sovereignty, security, and development interests. External analysts discuss near-seas capabilities and growing tools of power projection. Both voices are placed on the table. The camera stays wide over the western Pacific.',
      zh: '二〇一九年国防白皮书的官方语言是防御性的：捍卫主权、安全、发展利益。外部分析会另谈近海能力，以及正在增多的力量投送工具。两种声音都放在桌上。镜头停在西太平洋的开阔取景上。',
    },
    narration: {
      en: [
        'Listen first to the official language. China’s National Defense in the New Era, the 2019 defense white paper — still the most recent comprehensive defense white paper as of 2026 — states that China follows a defensive national defense policy, and that its fundamental goal is to safeguard national sovereignty, security, and development interests.',
        'External analysts discuss, in their own voice, near-seas capabilities and a growing set of tools for power projection. Both voices belong on the table. Pull the Earth back. What you see is a wide framing of the western Pacific, not a targeting plot. No island and no base is pinned here as a military objective.',
      ],
      zh: [
        '先听官方的语言。二〇一九年《新时代的中国国防》白皮书——截至二〇二六年，这仍是最近一份全面的国防白皮书——写明：中国始终不渝奉行防御性国防政策，根本目标是捍卫国家主权、安全、发展利益。',
        '外部分析会用他们自己的口气，另谈近海能力，以及正在增多的远海力量投送工具。这两种声音都要放在桌上。请把地球拉远。眼前是西太平洋的一片开阔取景，不是作战图。我们不会把岛屿或基地当成军事目标，钉在这颗地球上。',
      ],
    },
  },
  {
    id: 'doctrine',
    name: { en: 'Thought', zh: '思想' },
    kicker: { en: 'Beat 6  ·  Research and military thought', zh: '第六段  ·  研发方向与战争思想' },
    title: { en: 'Modernization, written as a public program.', zh: '现代化，被写成一套可以公开讲述的规划。' },
    body: {
      en: 'The official public vocabulary includes building a world-class military, informatization, intelligentization, joint operations, and Xi Jinping Thought on Strengthening the Military. Only publicly displayed systems and official science-and-industry statements are mentioned.',
      zh: '官方公开词汇包括建设世界一流军队、信息化、智能化、联合作战，以及作为官方公开表述的习近平强军思想。只提已经公开展示的装备，以及官方的科技与工业表述。',
    },
    narration: {
      en: [
        'Now the third axis: research directions and military thought. The official public vocabulary includes building a world-class military; the fused development of mechanization, informatization, and intelligentization; joint operations; and Xi Jinping Thought on Strengthening the Military, which is cited here only as official public framing.',
        'Set that beside Chapter I. Then, strategy became a written state craft. Now, modernization is articulated as public programs. This tour mentions only systems that have been officially displayed, and science-and-industry statements that are official. It will not present an unannounced program as a fact, and it will not invent a wonder-weapon.',
      ],
      zh: [
        '再看第三条轴：研发方向与战争思想。官方公开词汇里，有建设世界一流军队，有机械化信息化智能化融合发展，有联合作战，也有作为官方公开表述的习近平强军思想。',
        '请把它对照第一章。那时候，谋略被写成一种可以传授的国家技艺。现在，现代化被写成可以公开讲述的建设规划。我们只提已经公开展示的装备，以及官方的科技与工业表述。不会把尚未公布的项目说成既成事实，也不会另造一件神奇武器。',
      ],
    },
  },
  {
    id: 'close',
    name: { en: 'Close', zh: '收束' },
    kicker: { en: 'Beat 7  ·  What the public record can defend', zh: '第七段  ·  公开记录能站住的结论' },
    title: { en: 'Not a myth, and not a counting contest.', zh: '不是无敌神话，也不是数字竞赛。' },
    body: {
      en: 'The public record can defend a large, reformed, industrial military, mid-way through a stated shift toward joint, high-tech modernization. Many important numbers still come from external estimates. Chapter I is the ancient tick; this is the 2026 tick; 1950–53 can be told on a sibling journey.',
      zh: '公开记录能够站住的，是一支规模很大、经过改革、有工业支撑的军队，正处在官方已经写出的联合化、高科技现代化进程之中。许多关键数字，仍然来自外部估计。第一章是古代的刻度，这是二〇二六年的刻度；一九五〇到五三年，可以交给一条平行导览。',
    },
    narration: {
      en: [
        'Pull the Earth a little farther back. What the public record can actually defend is not a myth of invincibility, and not a contest of raw counts. It is a large, reformed, industrial military, mid-way through a publicly stated shift toward joint, high-tech modernization. Many of the numbers that matter still come from external estimates.',
        'Chapter I is the ancient tick of the same three capacities on this Earth. This chapter is the 2026 tick. The years 1950 to 1953 can be told on a sibling journey. The ruler is straight. That is the right place to stop, and the right place to begin again.',
      ],
      zh: [
        '把地球再拉远一点。公开记录能够站住的结论，不是无敌神话，也不是数字竞赛。而是一支规模很大、经过改革、有工业支撑的军队，正处在官方已经写出的联合化、高科技现代化进程之中。许多关键数字，仍然来自外部估计。',
        '第一章，是同一组能力在这颗地球上的古代刻度。本章是二〇二六年的刻度。一九五〇到五三年，可以交给一条平行的导览。尺子已经摆正。这是该停下来的地方，也是下一步的起点。',
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

if (BEATS.length !== BEAT_STAGING.length) {
  throw new Error(`baseline2026 beat/staging length mismatch: ${BEATS.length} vs ${BEAT_STAGING.length}`)
}

export const THEATER_CARDS = [
  {
    id: 'eastern',
    kicker: { en: 'Theater region  ·  typological', zh: '战区地域  ·  类型学' },
    title: { en: 'Eastern Theater region', zh: '东部战区地域' },
    body: {
      en: 'One of the five theater commands established on 1 February 2016, in an official reform that replaced the former military regions. This mark is a regional centroid for the eastern theater area, not a headquarters address.',
      zh: '二〇一六年二月一日正式成立的五大战区之一，取代原来的军区。此标记是东部战区地域的地区中心，不是总部地址。',
    },
    note: {
      en: 'Official structure. No street-level headquarters, base, or yard is implied.',
      zh: '官方结构。不表示总部、基地或船坞的街道位置。',
    },
  },
  {
    id: 'southern',
    kicker: { en: 'Theater region  ·  typological', zh: '战区地域  ·  类型学' },
    title: { en: 'Southern Theater region', zh: '南部战区地域' },
    body: {
      en: 'The southern theater command is an official 2016 formation. The pin is a regional centroid of the southern theater area, not a headquarters, a port, or an island objective.',
      zh: '南部战区是二〇一六年正式组建的战区。此钉位是南部战区地域的地区中心，不是总部、军港，也不是岛屿目标。',
    },
    note: {
      en: 'A regional framing only.',
      zh: '仅为地区性取景。',
    },
  },
  {
    id: 'western',
    kicker: { en: 'Theater region  ·  typological', zh: '战区地域  ·  类型学' },
    title: { en: 'Western Theater region', zh: '西部战区地域' },
    body: {
      en: 'The western theater covers a vast inland and plateau region. The mark is a regional centroid chosen for readability on the globe, not an installation.',
      zh: '西部战区覆盖广阔的内陆与高原。此标记是为了在地球上可读而取的地区中心，不是某一设施。',
    },
    note: {
      en: 'Not a base or a training-ground coordinate.',
      zh: '不是基地或训练场坐标。',
    },
  },
  {
    id: 'northern',
    kicker: { en: 'Theater region  ·  typological', zh: '战区地域  ·  类型学' },
    title: { en: 'Northern Theater region', zh: '北部战区地域' },
    body: {
      en: 'The northern theater command is one of the five official 2016 theaters. The pin is a regional centroid in the northern theater area, not a headquarters city.',
      zh: '北部战区是二〇一六年正式成立的五大战区之一。此钉位是北部战区地域的地区中心，不是某一总部所在城市。',
    },
    note: {
      en: 'Regional only.',
      zh: '仅为地区性标记。',
    },
  },
  {
    id: 'central',
    kicker: { en: 'Theater region  ·  typological', zh: '战区地域  ·  类型学' },
    title: { en: 'Central Theater region', zh: '中部战区地域' },
    body: {
      en: 'The central theater command is an official 2016 formation. The mark sits on a regional centroid of the central theater area — not Beijing, and not a headquarters street.',
      zh: '中部战区是二〇一六年正式组建的战区。标记落在中部战区地域的地区中心，不是北京，也不是总部街道。',
    },
    note: {
      en: 'A typological regional pin.',
      zh: '类型学的地区钉位。',
    },
  },
] as const

export const PLATFORM_CARDS = [
  {
    id: 'carriers',
    kicker: { en: 'Public platforms  ·  typological', zh: '公开装备  ·  类型学' },
    title: { en: 'Liaoning, Shandong, and Fujian', zh: '辽宁舰、山东舰与福建舰' },
    body: {
      en: 'Liaoning was officially commissioned in 2012, Shandong in 2019. Fujian was officially launched in June 2022 and commissioned at an official ceremony on 5 November 2025. A navy spokesperson said trials and ship-aircraft training would continue after commissioning. The silhouette is typological, not a berth.',
      zh: '辽宁舰二〇一二年入列，山东舰二〇一九年入列。福建舰二〇二二年六月下水，二〇二五年十一月五日举行入列授旗仪式。海军发言人表示，入列后仍将继续试验与舰机训练。剪影为类型学示意，不是泊位。',
    },
    note: {
      en: 'Official induction and launch/commissioning reports (Xinhua, Ministry of National Defense). No operational readiness claim is added.',
      zh: '依据新华社与国防部等官方入列、下水报道。不额外断言形成战斗力的时间。',
    },
  },
  {
    id: 'type055',
    kicker: { en: 'Public platforms  ·  typological', zh: '公开装备  ·  类型学' },
    title: { en: 'Type 055, first ship officially commissioned', zh: '〇五五型首舰官方入列' },
    body: {
      en: 'Nanchang, the first Type 055 destroyer, was officially commissioned on 12 January 2020, as reported by Xinhua and the Ministry of National Defense. Later ships of the class have also been publicly shown. This mark does not count a complete inventory.',
      zh: '〇五五型驱逐舰首舰南昌舰于二〇二〇年一月十二日正式入列，见新华社与国防部报道。同型后续舰也有公开亮相。此标记并不清点完整艘数。',
    },
    note: {
      en: 'Typological silhouette, not a hull at a named yard.',
      zh: '类型学剪影，不是某船厂里的一艘舰。',
    },
  },
  {
    id: 'j20',
    kicker: { en: 'Public platforms  ·  typological', zh: '公开装备  ·  类型学' },
    title: { en: 'J-20, officially in service', zh: '歼-20，官方已经列装' },
    body: {
      en: 'Official statements in 2017 and 2018 confirmed that the J-20 had been inducted into PLA Air Force combat units. It has been displayed at official parades and air shows. The mark is typological, not an airfield.',
      zh: '二〇一七年、二〇一八年的官方表态确认，歼-20已列装空军作战部队，并在官方阅兵和航展中展示过。此标记为类型学位置，不是机场。',
    },
    note: {
      en: 'No inventory of aircraft or bases is given.',
      zh: '不清点机数，不标基地。',
    },
  },
] as const

export const INDUSTRY_CARDS = [
  {
    id: 'bohai',
    kicker: { en: 'Industry region  ·  typological', zh: '产业带  ·  类型学' },
    title: { en: 'Bohai-rim industrial region', zh: '渤海沿岸产业带' },
    body: {
      en: 'A typological coastal industrial region, used here to stand for publicly discussed shipbuilding and heavy-industry capacity around the Bohai rim. It is not a yard, a berth, or a named plant.',
      zh: '沿海产业带的类型学标记，用以提示公开讨论中渤海沿岸的造船与重工业能力。不是某一船厂、泊位或厂区。',
    },
    note: {
      en: 'Schematic region only.',
      zh: '仅为示意地域。',
    },
  },
  {
    id: 'yangtze',
    kicker: { en: 'Industry region  ·  typological', zh: '产业带  ·  类型学' },
    title: { en: 'Yangtze-mouth industrial region', zh: '长江口产业带' },
    body: {
      en: 'A typological mark for the publicly discussed industrial belt near the mouth of the Yangtze. Not a shipyard coordinate.',
      zh: '用以提示公开讨论中长江口一带产业带的类型学标记，不是船厂坐标。',
    },
    note: {
      en: 'Schematic region only.',
      zh: '仅为示意地域。',
    },
  },
  {
    id: 'pearl',
    kicker: { en: 'Industry region  ·  typological', zh: '产业带  ·  类型学' },
    title: { en: 'Southern coastal industrial region', zh: '南部沿海产业带' },
    body: {
      en: 'A typological coastal region standing for publicly discussed shipbuilding and aviation-industrial capacity in the south. Not a dock or an airfield.',
      zh: '南部沿海产业带的类型学标记，用以提示公开讨论中的造船与航空工业能力。不是码头，也不是机场。',
    },
    note: {
      en: 'Schematic region only.',
      zh: '仅为示意地域。',
    },
  },
] as const

export const ESTIMATE_CARDS = [
  {
    id: 'china',
    kicker: { en: 'External estimate  ·  typological', zh: '外部估计  ·  类型学' },
    title: { en: 'China  ·  a schematic reading', zh: '中国  ·  示意对照' },
    body: {
      en: 'IISS The Military Balance 2026, in an open summary of active forces during 2025, lists about 2.035 million personnel. China does not publish a detailed public end-strength table; this tour still treats that figure as an order of two million. SIPRI estimates 2025 spending at [336] billion dollars — a broader definition than the official 2026 budget of 1.94 trillion yuan already introduced. FlightGlobal World Air Forces 2026 counts 1,814 combat aircraft. The US Defense Department’s 2024 public report described the PLAN as numerically the world’s largest navy, with a battle force of more than 370 ships and submarines, including more than 140 major surface combatants. A 2025 edition of that report exists; this tour does not invent a newer PLAN hull count from it. CRS, as of 1 October 2025, gives an official US Navy battle-force total of 293 ships; the definitions are not the same, so the two figures are not stacked.',
      zh: '国际战略研究所《军事平衡》二〇二六年版的公开转述，把二〇二五年现役约写成二百零三点五万人。中国不公布一份很细的公开兵力总表；本导览仍只把它当作约二百万人这个量级。SIPRI对二〇二五年军费的估计为三千三百六十亿美元，口径宽于前面已经介绍的二〇二六年官方预算一点九四万亿元。飞行国际《世界空军》二〇二六年版计入作战飞机一千八百一十四架。美国国防部二〇二四年公开报告，把人民海军写成按舰艇数量计的世界最大海军，战斗舰艇与潜艇合计三百七十艘以上，其中主要水面战斗舰艇一百四十艘以上。同一系列二〇二五年报告已经发布；本导览不从中另造更新的人民海军艘数。美国国会研究处写明，截至二〇二五年十月一日，美国海军战斗舰艇为二百九十三艘；口径不同，故不叠成一根柱子。',
    },
    note: {
      en: 'All three globe columns are hatched external estimates. Schematic regional mark, not a headquarters or a base.',
      zh: '地球上的三根柱子都是阴影，表示外部估计。类型学地区标记，不是总部或基地。',
    },
  },
  {
    id: 'india',
    kicker: { en: 'External estimate  ·  typological', zh: '外部估计  ·  类型学' },
    title: { en: 'India  ·  a schematic reading', zh: '印度  ·  示意对照' },
    body: {
      en: 'IISS open summary of The Military Balance 2026: about 1.501 million active personnel in 2025. SIPRI Table 1: 92.1 billion dollars in 2025. FlightGlobal World Air Forces 2026: 600 combat aircraft. All three are external counts under those published definitions.',
      zh: '国际战略研究所《军事平衡》二〇二六年版公开转述：二〇二五年现役约一百五十点一万人。SIPRI表1：二〇二五年九百二十一亿美元。飞行国际《世界空军》二〇二六年版：作战飞机六百架。三项都是按各公表口径所作的外部清点。',
    },
    note: {
      en: 'Hatched = external estimate. Typological mark in central India, not a headquarters.',
      zh: '阴影 = 外部估计。印度中部的类型学标记，不是总部。',
    },
  },
  {
    id: 'united-states',
    kicker: { en: 'External estimate  ·  typological', zh: '外部估计  ·  类型学' },
    title: { en: 'United States  ·  a schematic reading', zh: '美国  ·  示意对照' },
    body: {
      en: 'IISS open summary of The Military Balance 2026: about 1.340 million active personnel in 2025. SIPRI Table 1: 954 billion dollars in 2025, the world’s largest total that year. FlightGlobal World Air Forces 2026: 2,718 combat aircraft. The same directory gives a US all-aircraft total of 13,033, about a quarter of a world total of 52,231; that broader total is not interchangeable with the combat-aircraft column. CRS reports that as of 1 October 2025 the US Navy included 293 battle force ships. That official US figure is not under the same definition as the 2024 DoD wording on the PLAN, and the two are not stacked here.',
      zh: '国际战略研究所《军事平衡》二〇二六年版公开转述：二〇二五年现役约一百三十四万人。SIPRI表1：二〇二五年九千五百四十亿美元，为当年世界最高。飞行国际《世界空军》二〇二六年版：作战飞机二千七百一十八架。同一名录所记美国军用飞机总数为一万三千零三十三架，约占世界五万二千二百三十一架的四分之一；这一总数与作战飞机栏不可混用。美国国会研究处写明，截至二〇二五年十月一日，美国海军战斗舰艇为二百九十三艘。这一官方数字与美国国防部二〇二四年对人民海军的表述口径不同，故不叠在一起比较。',
    },
    note: {
      en: 'Hatched = external estimate on the globe. Typological mark in the continental interior, not a base.',
      zh: '地球上的阴影柱为外部估计。大陆内部的类型学标记，不是基地。',
    },
  },
  {
    id: 'north-korea',
    kicker: { en: 'External estimate  ·  typological', zh: '外部估计  ·  类型学' },
    title: { en: 'North Korea  ·  a schematic reading', zh: '朝鲜  ·  示意对照' },
    body: {
      en: 'IISS open summary of The Military Balance 2026: about 1.280 million active personnel in 2025. SIPRI’s 2025 fact-sheet Table 1 does not publish a 2025 expenditure figure for North Korea, so this tour plants no spending column. FlightGlobal World Air Forces 2026: 455 combat aircraft, an external count under that directory’s definition. No official public end-strength table is used here.',
      zh: '国际战略研究所《军事平衡》二〇二六年版公开转述：二〇二五年现役约一百二十八万人。SIPRI二〇二五年概况表1未公布朝鲜当年军费，故本导览不立军费柱。飞行国际《世界空军》二〇二六年版计入作战飞机四百五十五架，这是该目录口径下的外部清点。此处不采用一份官方公开兵力总表。',
    },
    note: {
      en: 'National typological mark, not a base and not a headquarters city.',
      zh: '全国性的类型学标记，不是基地，也不是总部城市。',
    },
  },
  {
    id: 'russia',
    kicker: { en: 'External estimate  ·  typological', zh: '外部估计  ·  类型学' },
    title: { en: 'Russia  ·  a schematic reading', zh: '俄罗斯  ·  示意对照' },
    body: {
      en: 'IISS open summary of The Military Balance 2026: about 1.264 million active personnel in 2025. SIPRI Table 1 estimates 2025 spending at [190] billion dollars. FlightGlobal World Air Forces 2026: 1,559 combat aircraft. All three are external figures. The mark sits in the interior, not at a capital or a headquarters.',
      zh: '国际战略研究所《军事平衡》二〇二六年版公开转述：二〇二五年现役约一百二十六点四万人。SIPRI表1对二〇二五年军费的估计为一千九百亿美元。飞行国际《世界空军》二〇二六年版：作战飞机一千五百五十九架。三项都是外部数字。标记落在内陆，不是首都或总部。',
    },
    note: {
      en: 'Hatched = external estimate. Schematic only.',
      zh: '阴影 = 外部估计。仅为示意。',
    },
  },
  {
    id: 'south-korea',
    kicker: { en: 'External estimate  ·  typological', zh: '外部估计  ·  类型学' },
    title: { en: 'South Korea  ·  a schematic reading', zh: '韩国  ·  示意对照' },
    body: {
      en: 'IISS open summary of The Military Balance 2026: about 450,000 active personnel in 2025. SIPRI Table 1: 47.8 billion dollars in 2025. FlightGlobal World Air Forces 2026: 340 combat aircraft. This is a national comparison mark, not the sibling-journey interface and not a campaign map.',
      zh: '国际战略研究所《军事平衡》二〇二六年版公开转述：二〇二五年现役约四十五万人。SIPRI表1：二〇二五年四百七十八亿美元。飞行国际《世界空军》二〇二六年版：作战飞机三百四十架。这是全国性的对照标记，不是平行导览接口，也不是战役图。',
    },
    note: {
      en: 'Offset from the 1950–53 interface mark. Typological, not a headquarters.',
      zh: '与一九五〇到五三年接口标记错开。类型学位置，不是总部。',
    },
  },
  {
    id: 'japan',
    kicker: { en: 'External estimate  ·  typological', zh: '外部估计  ·  类型学' },
    title: { en: 'Japan  ·  a schematic reading', zh: '日本  ·  示意对照' },
    body: {
      en: 'IISS open summary of The Military Balance 2026: about 247,000 active personnel in 2025. SIPRI Table 1: 62.2 billion dollars in 2025. FlightGlobal World Air Forces 2026: 264 combat aircraft. The mark is typological, on central Honshu, not a base or a capital.',
      zh: '国际战略研究所《军事平衡》二〇二六年版公开转述：二〇二五年现役约二十四万七千人。SIPRI表1：二〇二五年六百二十二亿美元。飞行国际《世界空军》二〇二六年版：作战飞机二百六十四架。标记为本州中部的类型学位置，不是基地或首都。',
    },
    note: {
      en: 'Hatched = external estimate.',
      zh: '阴影 = 外部估计。',
    },
  },
  {
    id: 'france',
    kicker: { en: 'External estimate  ·  typological', zh: '外部估计  ·  类型学' },
    title: { en: 'France  ·  a schematic reading', zh: '法国  ·  示意对照' },
    body: {
      en: 'IISS open summary of The Military Balance 2026: about 204,000 active personnel in 2025. SIPRI Table 1: 68.0 billion dollars in 2025. FlightGlobal World Air Forces 2026: 223 combat aircraft. The mark is typological, in central France, not a headquarters.',
      zh: '国际战略研究所《军事平衡》二〇二六年版公开转述：二〇二五年现役约二十万四千人。SIPRI表1：二〇二五年六百八十亿美元。飞行国际《世界空军》二〇二六年版：作战飞机二百二十三架。标记为法国中部的类型学位置，不是总部。',
    },
    note: {
      en: 'Hatched = external estimate.',
      zh: '阴影 = 外部估计。',
    },
  },
  {
    id: 'germany',
    kicker: { en: 'External estimate  ·  spending chart', zh: '外部估计  ·  军费对照' },
    title: { en: 'Germany  ·  on the spending chart', zh: '德国  ·  见于军费对照' },
    body: {
      en: 'Germany is among SIPRI’s top spenders in 2025, at 114 billion dollars (Table 1), and so appears on the scroll’s spending chart. It is not planted as a personnel cluster on the globe. FlightGlobal World Air Forces 2026 counts 190 combat aircraft. No IISS active-personnel figure from the locked open summary is shown here, because that list was not used as a source for Germany.',
      zh: '德国是SIPRI二〇二五年军费居前的国家之一，表1列为一千一百四十亿美元，故出现在卷轴的军费对照中。地球上不立人数柱。飞行国际《世界空军》二〇二六年版计入作战飞机一百九十架。本导览未采用那份已核对公开转述中的德国现役人数，故不在此另写人数。',
    },
    note: {
      en: 'Chart only. Not a globe column, and not a headquarters mark.',
      zh: '仅见于对照表。不是地球上的柱群，也不是总部标记。',
    },
  },
  {
    id: 'united-kingdom',
    kicker: { en: 'External estimate  ·  spending chart', zh: '外部估计  ·  军费对照' },
    title: { en: 'United Kingdom  ·  on the spending chart', zh: '英国  ·  见于军费对照' },
    body: {
      en: 'The United Kingdom is among SIPRI’s top spenders in 2025, at 89.0 billion dollars (Table 1), and so appears on the scroll’s spending chart. It was not in the Business Insider top-25 personnel list used for the IISS open summary, so this tour plants no personnel column and invents no end-strength figure. FlightGlobal World Air Forces 2026 counts 141 combat aircraft.',
      zh: '英国是SIPRI二〇二五年军费居前的国家之一，表1列为八百九十亿美元，故出现在卷轴的军费对照中。它不在本导览所据《商业内幕》IISS公开转述的现役人数前二十五名之列，故不立人数柱，也不另造兵力数字。飞行国际《世界空军》二〇二六年版计入作战飞机一百四十一架。',
    },
    note: {
      en: 'Chart only. Not a globe column, and not a headquarters mark.',
      zh: '仅见于对照表。不是地球上的柱群，也不是总部标记。',
    },
  },
] as const

export const DOCTRINE_CARDS = [
  {
    id: 'vocabulary',
    kicker: { en: 'Official public vocabulary', zh: '官方公开词汇' },
    title: { en: 'World-class, joint, and intelligentized', zh: '世界一流、联合与智能化' },
    body: {
      en: 'Official public language includes building a world-class military; the fused development of mechanization, informatization, and intelligentization; and joint operations. Xi Jinping Thought on Strengthening the Military is cited only as official public framing, not as a private primer.',
      zh: '官方公开表述包括建设世界一流军队，机械化信息化智能化融合发展，以及联合作战。习近平强军思想在此只作为官方公开表述提及，不是内部读本。',
    },
    note: {
      en: 'Public programs and official vocabulary only.',
      zh: '只涉及公开规划与官方词汇。',
    },
  },
] as const

export const INTERFACE_CARDS = [
  {
    id: 'korea-interface',
    kicker: { en: 'Sibling journey  ·  interface only', zh: '平行导览  ·  仅作接口' },
    title: { en: '1950–53, on another journey', zh: '一九五〇到五三年，在另一条线上' },
    body: {
      en: 'The Korean War of 1950–53 is another calibration point on this same Earth. It is not told in this chapter. A later sibling journey can take that window. This mark is a regional interface, not a campaign map and not a battlefield reconstruction.',
      zh: '一九五〇到五三年的朝鲜战争，是这颗地球上另一个校准点。本章不讲述它。一条后续的平行导览可以接过那段时间。此标记只是地区性接口，不是战役图，也不是战场复原。',
    },
    note: {
      en: 'A hook for a future journey, not an implementation of it.',
      zh: '为未来导览留下接口，不是已经实现的那一章。',
    },
  },
] as const

export const SOURCE_SECTIONS = [
  {
    title: { en: 'How to read this baseline', zh: '如何阅读这条基线' },
    paragraphs: [
      {
        en: 'This is a popular-science tour on a public baseline, not an intelligence briefing. Official announcements (NPC, Ministry of National Defense, Xinhua, State Council Information Office, Ministry of Finance) are labeled 官方公布 / official announcement. Figures from IISS, SIPRI, and the US Department of Defense are labeled 外部估计 / external estimate. Where a 2026 official number is not yet published, the latest confirmed year is used and dated. No number and no page reference is invented. No classified material, no targeting guide, and no campaign plan — including any Taiwan or other contingency how-to — belongs in this tour.',
        zh: '这是一条面向听众的公开基线科普导览，不是情报简报。全国人大、国防部、新华社、国务院新闻办、财政部等官方公布，标为「官方公布」。国际战略研究所、斯德哥尔摩国际和平研究所、美国国防部的数字，标为「外部估计」。若二〇二六年的官方数字尚未公布，则使用能够核对的最近年份，并写明截至某年。不虚造数字，也不虚造页码。本导览不含机密材料、目标指南或战役计划，尤其不包括任何关于台湾或其他作战预案的做法说明。',
      },
    ],
  },
  {
    title: { en: 'Official PRC sources', zh: '中国官方信源' },
    items: [
      {
        en: 'State Council Information Office, China’s National Defense in the New Era (July 2019). Official English title of 《新时代的中国国防》. As of 2026 this remains the most recent comprehensive defense white paper. Later official white papers on arms control (2025) and national security are not substitutes for a new comprehensive defense white paper.',
        zh: '国务院新闻办公室，《新时代的中国国防》（2019年7月），官方英译 China’s National Defense in the New Era。截至2026年，这仍是最近一份全面的国防白皮书。此后关于军控（2025）或国家安全的白皮书，不能代替一份新的全面国防白皮书。',
      },
      {
        en: 'Official establishment of the five theater commands on 1 February 2016, replacing the former military regions, as reported by official outlets including the Chinese government website and Xinhua.',
        zh: '2016年2月1日正式成立东部、南部、西部、北部、中部五大战区，取代原军区。见中国政府网、新华社等官方报道。',
      },
      {
        en: '19 April 2024: official ceremony founding the Information Support Force; the designation of the Strategic Support Force was abolished; leadership and management of the Military Aerospace Force and the Cyberspace Force were adjusted. Ministry of National Defense briefing the same day on the new layout of services and arms under the Central Military Commission, including the Joint Logistic Support Force. See the Chinese government website and Xinhua.',
        zh: '2024年4月19日：信息支援部队成立大会；同时撤销战略支援部队番号，并调整军事航天部队、网络空间部队领导管理关系。国防部当天介绍中央军委领导指挥下的新军兵种布局，其中包括联勤保障部队。见中国政府网与新华社。',
      },
      {
        en: '2026 official defense budget: national general public budget defense expenditure of 1.94 trillion yuan, up 6.9% from the previous year’s executed figure; central-level expenditure 1.91 trillion yuan, up 7%. Stated by Zhang Xiaogang, spokesperson for the PLA and PAP delegation, 10 March 2026 (Ministry of National Defense; also carried by People’s Daily). The Ministry of Finance 2026 central general public budget expenditure table lists 190,956.1 million yuan for central-level defense (published 24 March 2026). The budget report was approved by the fourth session of the 14th NPC on 12 March 2026.',
        zh: '2026年官方国防预算：全国一般公共预算安排国防支出1.94万亿元，比上年执行数增长6.9%；其中中央本级1.91万亿元，增长7%。见2026年3月10日解放军和武警部队代表团新闻发言人张晓刚说明（国防部网站，人民网转载）。财政部《2026年中央一般公共预算支出预算表》列中央本级国防支出19095.61亿元（2026年3月24日公布）。预算报告于2026年3月12日经十四届全国人大四次会议批准。',
      },
      {
        en: 'Liaoning officially commissioned 25 September 2012; Shandong officially commissioned 17 December 2019 (official Xinhua / government reports). Fujian officially launched and named in June 2022; official commissioning and flag-presentation ceremony on 5 November 2025 (Xinhua; Chinese government website). PLAN spokesperson remarks after commissioning, that trials and ship-aircraft integration training would continue (Ministry of National Defense, 8 November 2025).',
        zh: '辽宁舰2012年9月25日正式交接入列；山东舰2019年12月17日正式交接入列（新华社 / 中国政府网）。福建舰2022年6月下水命名；2025年11月5日举行入列授旗仪式（新华社、中国政府网）。海军新闻发言人在入列后说明，仍将继续试验验证与舰机适配训练（国防部，2025年11月8日）。',
      },
      {
        en: 'Type 055 first ship Nanchang officially commissioned 12 January 2020 (Xinhua; Ministry of National Defense). J-20: official confirmation of induction into PLAAF combat units in 2017–2018 (Ministry of National Defense / Xinhua), and later official parade and air-show displays.',
        zh: '〇五五型首舰南昌舰于2020年1月12日正式入列（新华社、国防部）。歼-20于2017–2018年由国防部 / 新华社确认列装空军作战部队，此后亦在官方阅兵和航展中展示。',
      },
    ],
  },
  {
    title: { en: 'External estimates', zh: '外部估计' },
    items: [
      {
        en: 'International Institute for Strategic Studies, The Military Balance 2026, as published by Business Insider, “The largest militaries in the world, ranked by the number of active troops,” updated 26 October 2026, explicitly citing IISS MB 2026 and active armed forces during 2025: China 2,035,000; India 1,501,000; United States 1,340,000; North Korea 1,280,000; Russia 1,264,000; South Korea 450,000; Japan 247,000; France 204,000. This journey could not independently inspect a printed IISS page number and does not invent one. The China figure is still treated as an order of two million. IISS “defense budget” figures in that same article are not used (they differ from SIPRI); the spending axis uses SIPRI only. URL: https://www.businessinsider.com/largest-militaries-ranked-by-size',
        zh: '国际战略研究所（IISS），The Military Balance 2026。见《商业内幕》2026年10月26日更新的公开转述《按现役人数排列的世界最大军队》，并写明引自 IISS《军事平衡》2026、口径为2025年现役：中国 2,035,000；印度 1,501,000；美国 1,340,000；朝鲜 1,280,000；俄罗斯 1,264,000；韩国 450,000；日本 247,000；法国 204,000。本导览未能核对印刷页码，故不虚造页码。对中国数字，仍只当作约两百万人量级。同一篇文章中的 IISS“国防预算”数字与 SIPRI 不同，本导览不采用；军费轴只用 SIPRI。https://www.businessinsider.com/largest-militaries-ranked-by-size',
      },
      {
        en: 'Stockholm International Peace Research Institute, Trends in World Military Expenditure, 2025 (fact sheet, April 2026; SIPRI Military Expenditure Database, April 2026), Table 1, current US dollars. United States 954; China [336]; Russia [190]; Germany 114; India 92.1; United Kingdom 89.0; France 68.0; Japan 62.2; South Korea 47.8; world 2,887. The top five accounted for 58% of world spending. Square brackets mark SIPRI estimates. Coverage is 2025, not a 2026 SIPRI figure. SIPRI’s China figure is broader than the official 2026 PRC budget. North Korea has no published 2025 figure in Table 1, so no spending column is shown. https://www.sipri.org/publications/2026/sipri-fact-sheets/trends-world-military-expenditure-2025 and https://www.sipri.org/sites/default/files/2026-04/2604_milex_2025.pdf',
        zh: '斯德哥尔摩国际和平研究所（SIPRI），Trends in World Military Expenditure, 2025（2026年4月概况；SIPRI 军费数据库 2026年4月）表1，当年美元：美国 954；中国 [336]；俄罗斯 [190]；德国 114；印度 92.1；英国 89.0；法国 68.0；日本 62.2；韩国 47.8；世界 2,887。前五名合计占世界军费 58%。方括号为 SIPRI 估计。覆盖至2025年，不是对2026年的估计。SIPRI 的中国数字口径宽于2026年官方预算。表1未公布朝鲜2025年数字，故不立军费柱。https://www.sipri.org/publications/2026/sipri-fact-sheets/trends-world-military-expenditure-2025 与 https://www.sipri.org/sites/default/files/2026-04/2604_milex_2025.pdf',
      },
      {
        en: 'FlightGlobal, World Air Forces 2026 (Cirium data, 1 October 2025), combat-aircraft column: United States 2,718; China 1,814; Russia 1,559; India 600; North Korea 455; South Korea 340; Japan 264; France 223; Germany 190; United Kingdom 141. The same directory gives a US all-aircraft total of 13,033, about 25% of a world total of 52,231; totals and combat counts are not interchangeable. The FlightGlobal directory page itself may be paywalled; this tour cites FlightGlobal as the source and corroborates the combat and total figures from the Air Museums Almanac (explicitly attributing FlightGlobal WAF 2026) and Aerospace Global News. https://airmuseums.co.uk/numbers/air-forces-of-the-world and https://aerospaceglobalnews.com/news/world-combat-aircraft-fleets-2026/',
        zh: '飞行国际（FlightGlobal），World Air Forces 2026（Cirium 数据，截至2025年10月1日）作战飞机栏：美国 2,718；中国 1,814；俄罗斯 1,559；印度 600；朝鲜 455；韩国 340；日本 264；法国 223；德国 190；英国 141。同一名录所记美国军用飞机总数为 13,033，约占世界 52,231 的 25%；总数与作战飞机不可混用。FlightGlobal 目录页可能需付费；本导览以 FlightGlobal 为出处，并用明确署名为该目录的 Air Museums Almanac 以及 Aerospace Global News 作公开核对。https://airmuseums.co.uk/numbers/air-forces-of-the-world 与 https://aerospaceglobalnews.com/news/world-combat-aircraft-fleets-2026/',
      },
      {
        en: 'US Department of Defense, Military and Security Developments Involving the People’s Republic of China 2024: describes the PLAN as numerically the world’s largest navy, with a battle force of more than 370 ships and submarines, including more than 140 major surface combatants. This is a US government external estimate. The 2025 annual report in the same series was released on 23 December 2025; this tour cites the 2024 hull-count wording it could verify and does not invent a newer PLAN count from the later edition. No operational, targeting, or contingency material from these reports is used. Navy hull totals are not stacked into a globe column, because definitions of “total ships” vary too widely.',
        zh: '美国国防部《中国军事与安全发展报告》2024年版：将人民海军表述为按舰艇数量计的世界最大海军，战斗舰艇与潜艇合计 370 艘以上，其中主要水面战斗舰艇 140 艘以上。这是美国政府的外部估计。同一系列 2025 年版于 2025 年 12 月 23 日发布；本导览只引用能够核对的 2024 年艘数表述，不从后一版另造人民海军更新数字。这些报告中的作战、目标或预案内容，一概不采用。海军总艘数因口径差异过大，不在地球上叠成一根柱子。',
      },
      {
        en: 'Congressional Research Service, RL32665, Navy Force Structure and Shipbuilding Plans: Background and Issues for Congress: “As of October 1, 2025, the Navy included 293 battle force ships.” This official US figure is cited with that date and is not treated as comparable, under one definition, with the 2024 DoD wording on the PLAN. https://www.congress.gov/crs_external_products/RL/HTML/RL32665.web.html',
        zh: '美国国会研究处报告 RL32665《海军兵力结构与造船计划》写明：截至 2025 年 10 月 1 日，美国海军战斗舰艇为 293 艘。本导览按该日期引用这一官方数字，并不把它与美国国防部 2024 年对人民海军的表述当作同一口径下的对照。https://www.congress.gov/crs_external_products/RL/HTML/RL32665.web.html',
      },
    ],
  },
  {
    title: { en: 'Geographic cautions', zh: '地理审慎' },
    paragraphs: [
      {
        en: 'Every globe mark is regional or typological, with certainty set to regional or representative. Comparison columns in the scale beat stand at typological regional centroids — not capitals, headquarters, bases, or docks — and are labeled 示意 / schematic. Theater pins are centroids of theater areas, not headquarters. Industrial marks are coastal regions, not yards or berths. Equipment silhouettes are typological, not parked at a named dock or airfield. The western Pacific arc is a wide framing, not a defense perimeter and not a targeting plot. No missile site is marked. A modest mark on the Korean Peninsula in the closing beat is only an interface for a future sibling journey, not a reconstruction of 1950–53.',
        zh: '地球上每一处标记都是地区性或类型学的，确定性为 regional 或 representative。量级段的对照柱立在类型学地区中心，不是首都、总部、基地或码头，并标为「示意」。战区钉位是战区地域的中心，不是总部。工业标记是沿海产业带，不是船厂或泊位。装备剪影是类型学示意，不是停在某一码头或机场。西太平洋弧线是开阔取景，不是防区，也不是目标图。不标导弹阵地。收束段在朝鲜半岛上的轻微标记，只是为未来平行导览留下的接口，不是对一九五〇到五三年的复原。',
      },
    ],
  },
  {
    title: { en: 'Dating notes', zh: '年代说明' },
    paragraphs: [
      {
        en: 'The calendar cursor uses this project’s time model in src/utils/time.ts. The representative date is 2026-07-01 (noon UTC lighting). JavaScript Date is not used to invent civil dates. Where a figure belongs to 2024 or 2025, the copy says so rather than restating it as a 2026 official number.',
        zh: '时间光标使用本项目 src/utils/time.ts 的历法模型。代表性日期为 2026-07-01（世界时正午光照）。不用 JavaScript Date 来编造民用日期。属于 2024 或 2025 年的数字，会在解说里写明，而不会改写成 2026 年的官方数字。',
      },
    ],
  },
]
