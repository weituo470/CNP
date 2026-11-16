/**
 * Bilingual copy for the 抗美援朝 guided journey (1950–1953).
 * Chinese is the default overlay language; English is a complete peer, not a gloss.
 * Spoken narration is Chinese-only. Figures, if they appear, are attributed; death totals are kept out of the spoken hook.
 */
import { BEAT_COUNT } from './sites'
import type { JourneyBeat, Localized } from '../types'

export const JOURNEY_META = {
  id: 'korea' as const,
  queryValue: 'korea',
  title: { en: 'Resist US Aggression and Aid Korea', zh: '抗美援朝' } satisfies Localized,
  window: { en: '1950–1953', zh: '1950–1953年' } satisfies Localized,
}

export const UI = {
  brandKicker: { en: 'A chapter of Force', zh: '「力」的一章' } satisfies Localized,
  brandTitle: { en: 'Resist US Aggression and Aid Korea', zh: '抗美援朝' } satisfies Localized,
  exit: { en: 'Exit journey', zh: '退出导览' } satisfies Localized,
  enter: { en: 'This chapter', zh: '进入本导览' } satisfies Localized,
  enterForce: { en: 'Chapter I: Warring States', zh: '第一章：战国' } satisfies Localized,
  enterKorea: { en: 'Resist US Aggression and Aid Korea', zh: '抗美援朝' } satisfies Localized,
  reenter: { en: 'Re-enter the journey', zh: '再次进入导览' } satisfies Localized,
  sourcesBtn: { en: 'Sources', zh: '史料与注释' } satisfies Localized,
  sourcesKicker: { en: 'Notes for judges and readers', zh: '供评委与读者核对' } satisfies Localized,
  sourcesTitle: { en: 'Sources & cautions', zh: '史料与审慎说明' } satisfies Localized,
  close: { en: 'Close', zh: '关闭' } satisfies Localized,
  langEn: 'EN',
  langZh: '中文',
  languageLabel: { en: 'Language', zh: '语言' } satisfies Localized,
  hints: {
    en: '0–6 jump beats   ·   ← → change beat   ·   Space play/pause   ·   Drag the globe   ·   Click a site or mark   ·   Esc to exit',
    zh: '0–6 跳转段落   ·   ← → 切换段落   ·   空格播放或暂停   ·   拖动地球   ·   点击地点或标记   ·   Esc 退出',
  } satisfies Localized,
  coordinateCaution: {
    en: 'Pins use representative or site coordinates on the present-day globe, not excavated meter precision.',
    zh: '图钉为今地图上的代表性或遗址坐标，并非发掘测得的米级精度。',
  } satisfies Localized,
  playNarration: { en: 'Play narration', zh: '播放解说' } satisfies Localized,
  pauseNarration: { en: 'Pause', zh: '暂停' } satisfies Localized,
  resumeNarration: { en: 'Resume', zh: '继续播放' } satisfies Localized,
  replayNarration: { en: 'Replay from the start', zh: '从头播放' } satisfies Localized,
  playHint: {
    en: 'After you click, the globe turns to each region and the war is shown schematically.',
    zh: '点击后，镜头会转到对应位置并演示战争',
  } satisfies Localized,
  voiceChineseOnly: {
    en: 'Spoken narration is Chinese-only for now. On-screen text stays in English.',
    zh: '语音解说目前仅为中文。画面文字仍可切换为英文。',
  } satisfies Localized,
  narrationError: {
    en: 'Voice could not be loaded. You can still walk the globe and read the commentary.',
    zh: '语音未能载入。仍可浏览地球并阅读解说。',
  } satisfies Localized,
  warTypological: {
    en: 'Schematic / typological — not exact campaign routes or a troop census.',
    zh: '示意 / 类型学，并非精确进军路线，也不是兵力普查。',
  } satisfies Localized,
  illustrationCaution: {
    en: 'Typological illustration — a historical imagination, not a photograph of the event.',
    zh: '类型学想象图，并非事件照片。',
  } satisfies Localized,
  briefingRoll: { en: 'Operations brief', zh: '作战简报' } satisfies Localized,
  comparisonReady: {
    en: 'A typed comparison with Chapter I is ready; it is not scored on this screen.',
    zh: '与第一章的比较接口已经留好，本屏不作打分。',
  } satisfies Localized,
  clickSites: {
    en: 'Click a campaign site, equipment mark, or place-name on the globe.',
    zh: '可点击地球上的战役地点、装备标记或地名。',
  } satisfies Localized,
}

export const BEATS = [
  {
    id: 'hook',
    name: { en: 'Hook', zh: '开场' },
    kicker: { en: '1950  ·  the Korean Peninsula', zh: '一九五〇年  ·  朝鲜半岛' },
    title: { en: 'This is not a border skirmish.', zh: '这不是一场边境摩擦。' },
    body: {
      en: 'A newly founded People’s Republic decides to send the People’s Volunteer Army across the Yalu. We will read this war on four axes: intensity, mobilization, equipment, and strategy.',
      zh: '一个刚刚成立的人民共和国，决定派出中国人民志愿军跨过鸭绿江。我们要从烈度、动员、装备、谋略四个轴来看这场战争。',
    },
    narration: {
      en: [
        'Look at the Korean Peninsula. Set the clock to 1950. This is not a border skirmish. A modern war is already under way on this narrow strip of land, and it is about to draw in the newly founded People’s Republic of China.',
        'In October of that year, the People’s Republic was not yet one year old. The Chinese People’s Volunteer Army was preparing to cross the Yalu. The decision was a state decision, and the cost would be borne by the state.',
        'What we will look at is not a myth, and not a contest of raw numbers. It is four dimensions: the intensity of this war, modern state mobilization, the asymmetry of equipment, and how strategy became a national decision.',
      ],
      zh: [
        '请看朝鲜半岛。把时间拨到一九五〇年。这不是一场边境摩擦。在这条狭窄的半岛上，一场现代化战争已经打响，而且很快就要把新中国卷进来。',
        '这一年十月，中华人民共和国成立还不到一年。中国人民志愿军准备跨过鸭绿江。决定是国家作出的，代价也要由国家承担。',
        '我们要看的，不是神话，也不是比谁的数字更大。是四个维度：这场战争的烈度，现代国家的动员，装备上的不对称，以及谋略怎样变成一场国家决策。',
      ],
    },
  },
  {
    id: 'timeline',
    name: { en: 'Timeline', zh: '时间尺' },
    kicker: { en: 'Beat 1  ·  Intensity', zh: '第一段  ·  烈度' },
    title: { en: 'Three years on a narrow peninsula.', zh: '一条窄半岛，打了三年。' },
    body: {
      en: 'From the outbreak in June 1950 to the armistice of 27 July 1953, this was a high-intensity modern war: jets, artillery, landings, and a front that settled near the 38th parallel.',
      zh: '从一九五〇年六月爆发，到一九五三年七月二十七日停战，这是一场高强度的现代化战争：喷气式飞机、大炮、登陆，以及一条稳定在三八线附近的战线。',
    },
    narration: {
      en: [
        'In June 1950 the war broke out on the peninsula. In September, UN Command landed at Incheon, and the campaign turned sharply. On 19 October, the Volunteer Army began to cross the Yalu.',
        'Then came five successive campaigns. From the summer of 1951 the front stabilized near the 38th parallel, and the war became one of fighting while talking. On 27 July 1953 the armistice was signed at Panmunjom.',
        'Remember the geography: this is a very narrow peninsula, and the fighting lasted three full years. Jet aircraft, artillery, landings and counter-landings all appeared on this terrain at once. The pins are representative coordinates on the present-day globe.',
      ],
      zh: [
        '一九五〇年六月，战争在半岛爆发。九月，联合国军在仁川登陆，战局急剧扭转。十月十九日，志愿军开始渡过鸭绿江。',
        '此后是连续的五次战役。一九五一年夏季以后，战线在三八线附近稳定下来，变成边打边谈。一九五三年七月二十七日，停战协定在板门店签字。',
        '请记住地理：这是一条很窄的半岛，却打了整整三年。喷气式飞机、大炮、登陆与反登陆，都在这块地形上同时出现。图上的钉位，是今地图上的代表性坐标。',
      ],
    },
  },
  {
    id: 'mobilization',
    name: { en: 'Mobilization', zh: '动员' },
    kicker: { en: 'Beat 2  ·  A modern state', zh: '第二段  ·  现代国家' },
    title: { en: 'Resist US Aggression, aid Korea; defend the homeland.', zh: '抗美援朝，保家卫国。' },
    body: {
      en: 'The Chinese People’s Volunteer Army, nationwide mobilization, a supply line under air attack, donations, and medical teams. Chapter I looked at registers, granaries, and counties; this chapter looks at twentieth-century state mobilization.',
      zh: '中国人民志愿军，全国范围的动员，空袭下的运输线，捐献与医疗队。第一章看过户籍、粮仓和县制；这一章看的是二十世纪的国家动员。',
    },
    narration: {
      en: [
        'The slogan at the time was: Resist US Aggression and Aid Korea; defend the homeland. The force was called the Chinese People’s Volunteer Army. This was not simply a border expedition. It was a nationwide mobilization.',
        'Supplies had to travel a long transport line, and that line had to be kept open under air attack. There were donation campaigns at home, and medical teams that went to the front. These are parts of modern state mobilization.',
        'Chapter I spoke of household registers, granaries, and counties — the ancient state’s way of turning people and grain into resources that could be levied again and again. This chapter looks at twentieth-century state mobilization. I will not invent headcounts, and I will not treat any one tally as a verified muster roll.',
      ],
      zh: [
        '当时的口号是：抗美援朝，保家卫国。部队的名称是中国人民志愿军。它不是一次边境出兵那么简单，而是一次全国范围的动员。',
        '物资要走漫长的运输线，还要在空袭下尽量保住这条线。国内有捐献，也有医疗队前往。这些都是现代国家动员的组成部分。',
        '第一章讲过户籍、粮仓和县制，那是古代国家把人和粮食变成可反复征发的资源。这一章要看的，是二十世纪的国家动员。人数我不会随口报，也不把某一份统计当成已经核对过的名册。',
      ],
    },
  },
  {
    id: 'equipment',
    name: { en: 'Equipment', zh: '装备' },
    kicker: { en: 'Beat 3  ·  Asymmetry', zh: '第三段  ·  不对称' },
    title: { en: 'Light infantry, under a modern sky.', zh: '轻装步兵，现代化的天空。' },
    body: {
      en: 'Early Volunteer forces were mainly light infantry, facing UN superiority in air power, armor, and artillery. Later came MiG-15s and “MiG Alley,” and a supply line that survived air interdiction.',
      zh: '战争初期志愿军以轻装步兵为主，面对联合国军在空军、坦克和大炮上的优势。后来有米格十五和“米格走廊”，以及在空中封锁下仍能维持的补给线。',
    },
    narration: {
      en: [
        'Early in the war, the Volunteer Army was mainly light infantry. Opposite them, UN Command held a clear advantage in air power, armor, and artillery. The equipment asymmetry is not a figure of speech.',
        'Later, MiG-15s appeared in the airspace along the Yalu, in what came to be called “MiG Alley.” Treat this as typological, not as a museum scan of a particular aircraft.',
        'Still more decisive, perhaps, was the ground supply line: under air interdiction it was cut and repaired, but it was never broken for good. Without that line, the campaigns in front could not have been fought.',
      ],
      zh: [
        '战争初期，志愿军主要是轻装步兵。对面的联合国军在空军、坦克和大炮上占有明显优势。这是装备上的不对称，不是一句空话。',
        '后来，米格十五出现在鸭绿江一带的空域，形成后来常说的“米格走廊”。请把它当作类型学示意，不是某一架飞机的博物馆扫描件。',
        '更关键的，也许是地面那条补给线：在空中封锁之下，它被打断过，也被抢修过，但没有彻底中断。没有这条线，前面的战役打不下去。',
      ],
    },
  },
  {
    id: 'strategy',
    name: { en: 'Strategy', zh: '谋略' },
    kicker: { en: 'Beat 4  ·  A craft of the state', zh: '第四段  ·  国家技艺' },
    title: { en: 'Concealment, surprise, and talking while fighting.', zh: '隐蔽、突然性，以及边打边谈。' },
    body: {
      en: 'The shock of the first campaign; Incheon as MacArthur’s operational surprise; after the fifth campaign, fighting while talking. Strategy here is a state decision. Chapter I called it a craft of the state.',
      zh: '第一次战役的冲击；仁川作为麦克阿瑟的战役突然性；第五次战役之后的边打边谈。这里的谋略是国家决策。第一章说过，谋略是一种国家技艺。',
    },
    narration: {
      en: [
        'The shock of the first campaign came first from concealment. The Volunteer Army entered Korea without fanfare, and UN Command at first did not reckon with this force. Sudden contact was itself an operational effect.',
        'Now look at Incheon. MacArthur’s landing was a classic operational surprise: coming ashore where the other side thought a landing was hardly feasible, and cutting across the campaign in the south. Strategy here is an operational decision.',
        'After the fifth campaign the policy turned to fighting while talking. An armistice is not a surrender, and it is not a mythical total victory. Chapter I said that strategy is a craft of the state. It is the same here: when a state chooses to fight, when it chooses to talk, and how it keeps a campaign going under equipment asymmetry.',
      ],
      zh: [
        '第一次战役的冲击，首先来自隐蔽。志愿军入朝并不张扬，联合国军起初没有把这支力量估计进去。突然接触，本身就是一种作战效果。',
        '再看仁川。麦克阿瑟的登陆，是一次典型的战役突然性：在对方认为难以实施的地点上岸，一下子切断了南部的战局。谋略在这里，是作战决策。',
        '第五次战役之后，方针转向边打边谈。停战不是一纸投降，也不是神话里的全胜。第一章里说过，谋略是一种国家技艺。这里同样是：国家在什么时候打，什么时候谈，怎样在不对称的装备条件下把仗继续下去。',
      ],
    },
  },
  {
    id: 'campaigns',
    name: { en: 'Campaigns', zh: '战役' },
    kicker: { en: 'Beat 5  ·  Typological process', zh: '第五段  ·  类型学过程' },
    title: { en: 'Approach, envelopment, the hill, withdrawal.', zh: '接近、包围、阵地，以及撤离。' },
    body: {
      en: 'Unsan, Changjin (Chosin), and Shangganling (Triangle Hill), with Incheon as needed. The globe shows operational process schematically. It does not visualize casualty totals.',
      zh: '云山、长津湖（Chosin）与上甘岭（三角山），并按需要回到仁川。地球上只示意作战过程，不把伤亡总数做成可视化。',
    },
    narration: {
      en: [
        'First, Unsan — Yunshan in Chinese. This was an early encounter and envelopment after the Volunteer Army entered Korea. Please read it as a schematic of approach, contact, and encirclement, not as a precise reconstruction of force strengths.',
        'Next, Changjin — the Chosin Reservoir in Western accounts. Winter mountains, supply, contact, and withdrawal all appear here. The route is typological, not a surveyed line of march.',
        'In 1952 came Shangganling, known in the West as Triangle Hill. This was positional attack and defense: repeated fighting for a narrow height. I will not stack casualty totals on the globe. What can be shown is the typological process: approach, envelopment, positional attack and defense, and withdrawal when it was required.',
      ],
      zh: [
        '先看云山。这是志愿军入朝后较早的一次遭遇与包围作战。请把它看成接近、接敌、迂回的示意，不是一份精确的兵力复原图。',
        '再看长津湖。冬天的山地、补给、接敌与撤离，在这里同时出现。西方文献里常称作长津水库，也就是 Chosin。路线是示意，不是测过的进军轨迹。',
        '一九五二年的上甘岭，西方称作三角山。这是阵地攻防：反复争夺一个狭窄的高地。我不在地球上堆伤亡数字。能展示的，是作战过程的类型：接近、包围、阵地攻防，以及必要时的撤离。',
      ],
    },
  },
  {
    id: 'close',
    name: { en: 'Close', zh: '收束' },
    kicker: { en: 'Beat 6  ·  27 July 1953', zh: '第六段  ·  一九五三年七月二十七日' },
    title: { en: 'An armistice, not a peace treaty.', zh: '这是停战，不是和平条约。' },
    body: {
      en: 'The line came to rest near the 38th parallel. What the record can defend is a new state’s decision and cost in crossing the Yalu, modern mobilization, and campaign craft under equipment asymmetry.',
      zh: '军事分界线停在三八线附近。文献能够站得住的，是一个新国家跨过鸭绿江的决定与代价，现代动员，以及在装备不对称条件下的战役技艺。',
    },
    narration: {
      en: [
        'On 27 July 1953 the armistice was signed at Panmunjom. Note this carefully: it is an armistice, not a peace treaty. The military demarcation line came to rest near the 38th parallel. The political division of the peninsula did not end there.',
        'What the record can defend is not a myth, and not a wager between competing tallies. It is this: a newly founded state decided to cross the Yalu, and paid the cost; it carried out modern state mobilization; and, under equipment asymmetry, it sustained campaign craft until the guns stopped.',
        'If you set this chapter beside Chapter I, the comparison is still those four axes: intensity, mobilization, equipment, and strategy. The comparison interface has been left ready. Today we simply hold the globe on this armistice line.',
      ],
      zh: [
        '一九五三年七月二十七日，停战协定在板门店签字。请注意：这是停战，不是和平条约。军事分界线停在三八线附近，半岛的政治分裂并没有就此结束。',
        '文献能够站得住的，不是神话，也不是把各方数字拿来对赌。而是：一个新成立的国家，决定跨过鸭绿江，并为此付出代价；它完成了现代国家动员；并在装备不对称的条件下，把战役技艺坚持到停战。',
        '如果把这一章和第一章放在一起看，比较的仍然是那四个轴：烈度、动员、装备、谋略。比较的接口已经留好。今天只把地球停在这条停战线附近。',
      ],
    },
  },
] as const satisfies readonly JourneyBeat[]

const _beatsMatchStaging: typeof BEATS.length extends typeof BEAT_COUNT
  ? typeof BEAT_COUNT extends typeof BEATS.length ? true : never
  : never = true
void _beatsMatchStaging

export const SITE_CARDS = [
  {
    id: 'yalu',
    kind: 'site' as const,
    kicker: { en: 'Yalu  ·  Amnok  ·  19 October 1950', zh: '鸭绿江  ·  一九五〇年十月十九日' },
    title: { en: 'Crossing at the Yalu', zh: '渡过鸭绿江' },
    body: {
      en: 'On 19 October 1950, units of the Chinese People’s Volunteer Army began to cross the Yalu (Amnok) into Korea. The pin is a representative coordinate near present-day Dandong and Sinuiju, not a surveyed grid of crossing points.',
      zh: '一九五〇年十月十九日，中国人民志愿军部队开始渡过鸭绿江入朝。钉位是今丹东与新义州一带的代表性坐标，不是渡口的测绘网格。',
    },
    note: {
      en: 'The date is the conventional start of the crossing in Chinese official campaign histories. The decision itself was earlier.',
      zh: '这一日期是中国官方战史中常取的渡江开始日。作出决定的时间更早。',
    },
  },
  {
    id: 'incheon',
    kind: 'campaign' as const,
    kicker: { en: 'Incheon  ·  15 September 1950', zh: '仁川  ·  一九五〇年九月十五日' },
    title: { en: 'The Incheon landing', zh: '仁川登陆' },
    body: {
      en: 'UN Command, under General Douglas MacArthur, landed at Incheon (仁川) on 15 September 1950. It is presented here as an operational surprise that reversed the campaign in the south, shown typologically, not ship by ship.',
      zh: '一九五〇年九月十五日，联合国军在麦克阿瑟指挥下于仁川登陆。这里把它作为扭转南部战局的战役突然性来介绍，只作类型学示意，不是逐舰复原。',
    },
    note: {
      en: 'See US official histories of the landing and the subsequent drive on Seoul. The pin is near Wolmido / Incheon on the present-day globe.',
      zh: '登陆及随后向汉城推进，见美国官方战史。钉位在今月尾岛 / 仁川一带。',
    },
  },
  {
    id: 'unsan',
    kind: 'campaign' as const,
    kicker: { en: 'Unsan  ·  Yunshan  ·  late October 1950', zh: '云山  ·  一九五〇年十月下旬' },
    title: { en: 'Unsan, typological', zh: '云山，类型学' },
    body: {
      en: 'The fighting at Unsan (云山) was among the first major encounters after the Volunteer Army entered Korea: approach, contact, and envelopment. It is a typological campaign mark, not a reconstruction of order-of-battle numbers.',
      zh: '云山之战是志愿军入朝后较早的大规模遭遇：接近、接敌与迂回包围。这是类型学战役标记，不是一份兵力编成复原。',
    },
    note: {
      en: 'Chinese campaign histories and US official narratives (including Appleman) both treat Unsan as a sudden and costly contact. They should be read side by side; this card does not adjudicate their figures.',
      zh: '中国战史与美国官方叙述（包括 Appleman）都把云山视为一次突然且代价沉重的接触。宜对照阅读；本卡不对各方数字作裁决。',
    },
  },
  {
    id: 'changjin',
    kind: 'campaign' as const,
    kicker: { en: 'Changjin  ·  Chosin  ·  winter 1950', zh: '长津湖  ·  一九五〇年冬' },
    title: { en: 'Changjin / the Chosin Reservoir', zh: '长津湖 / 长津水库' },
    body: {
      en: 'Changjin Lake is the Chosin Reservoir in Western accounts. Winter mountains, a strained supply line, contact, and withdrawal all belong to this typological picture. The pin is a site / representative coordinate, not a surveyed line of march.',
      zh: '长津湖在西方文献中常称作长津水库（Chosin Reservoir）。冬季山地、紧张的补给、接敌与撤离，都属于这幅类型学图景。钉位是遗址/代表性坐标，不是测过的进军轨迹。',
    },
    note: {
      en: 'The later withdrawal toward the coast (typologically marked at Hungnam) is shown as a bearing, not as a roster of the evacuation.',
      zh: '此后向海岸方向的撤离（在兴南作类型学标记）只表示方向，不是撤离名册。',
    },
  },
  {
    id: 'shangganling',
    kind: 'campaign' as const,
    kicker: { en: 'Shangganling  ·  Triangle Hill  ·  1952', zh: '上甘岭  ·  三角山  ·  一九五二年' },
    title: { en: 'Shangganling / Triangle Hill', zh: '上甘岭 / 三角山' },
    body: {
      en: 'Shangganling, known in the West as Triangle Hill, was a positional battle for a narrow height in the autumn of 1952, near present-day Kimhwa. The globe shows rings of attack and defense. It does not display casualty totals as blocks or body counts.',
      zh: '上甘岭，西方称作三角山（Triangle Hill），是一九五二年秋在今金化一带为争夺狭窄高地而进行的阵地战。地球上只画攻防的环，不把伤亡总数做成方块或人数堆叠。',
    },
    note: {
      en: 'Chinese official campaign histories and US official accounts both describe intense fighting here; published figures differ and are not summarized as a mid-point on this card.',
      zh: '中国官方战史与美国官方记载都描述了这里的激烈争夺；已公布的数字存在分歧，本卡不以区间中值来概括。',
    },
  },
  {
    id: 'panmunjom',
    kind: 'site' as const,
    kicker: { en: 'Panmunjom  ·  27 July 1953', zh: '板门店  ·  一九五三年七月二十七日' },
    title: { en: 'The armistice site', zh: '停战签字地' },
    body: {
      en: 'The Korean Armistice Agreement was signed at Panmunjom on 27 July 1953. It is an armistice, not a peace treaty. Talks had earlier been held at Kaesong, then moved here.',
      zh: '《朝鲜停战协定》于一九五三年七月二十七日在板门店签字。这是停战，不是和平条约。谈判先在开城举行，后来转移到这里。',
    },
    note: {
      en: 'The military demarcation line runs near the 38th parallel but is not identical with it. The pin uses the present-day Joint Security Area as a readable site coordinate.',
      zh: '军事分界线靠近三八线，但并不与它重合。钉位以今共同警备区作为可读的遗址坐标。',
    },
  },
  {
    id: 'thirty-eighth',
    kind: 'site' as const,
    kicker: { en: 'The 38th parallel', zh: '三八线' },
    title: { en: 'A line that is near, not identical', zh: '靠近，并不重合' },
    body: {
      en: 'The 38th parallel was the 1945 occupation dividing line, and the war began across it. The 1953 military demarcation line came to rest near this latitude, cutting southwest to northeast. The mark on the globe is typological.',
      zh: '三八线是一九四五年的占领分界，战争也从这条线打起。一九五三年的军事分界线停在这条纬线附近，呈西南—东北走向。地球上的标记是类型学示意。',
    },
  },
  {
    id: 'peninsula',
    kind: 'site' as const,
    kicker: { en: 'The peninsula', zh: '朝鲜半岛' },
    title: { en: 'A short theater, a long war', zh: '短战线，长时间' },
    body: {
      en: 'The Korean Peninsula is a narrow theater between the Yalu and the Korea Strait. Intensity in this chapter is first a matter of time and of modern arms packed into that geography.',
      zh: '朝鲜半岛是鸭绿江与朝鲜海峡之间的一条狭窄战场。这一章所说的烈度，首先是时间，以及被压缩进这片地理里的现代化兵器。',
    },
  },
  {
    id: 'dandong',
    kind: 'site' as const,
    kicker: { en: 'Dandong  ·  Andong', zh: '丹东  ·  安东' },
    title: { en: 'The Chinese bank', zh: '江的这一侧' },
    body: {
      en: 'Present-day Dandong, then Andong, is a representative rear and crossing anchor on the Chinese bank of the Yalu. Logistics, airfields, and the later “MiG Alley” story all have a typological relation to this bank.',
      zh: '今丹东，当时称安东，是鸭绿江中国一侧的代表性后方与渡江锚点。后勤、机场，以及后来的“米格走廊”，都与这一侧有类型学上的关联。',
    },
  },
  {
    id: 'shenyang',
    kind: 'site' as const,
    kicker: { en: 'Shenyang  ·  typological rear', zh: '沈阳  ·  类型学后方' },
    title: { en: 'A Northeast logistics hinterland', zh: '东北的后勤腹地' },
    body: {
      en: 'A regional typological mark at present-day Shenyang, evoking the Northeast as a logistics hinterland. It is not a named depot, and it is not a count of trains or trucks.',
      zh: '今沈阳的地区性类型学标记，用以提示东北作为后勤腹地。这不是某一座仓库，也不是车辆或列车的清点。',
    },
  },
  {
    id: 'busan',
    kind: 'site' as const,
    kicker: { en: 'Busan  ·  Pusan', zh: '釜山' },
    title: { en: 'The southern end of the 1950 campaign', zh: '一九五〇年战局的南端' },
    body: {
      en: 'A regional anchor at present-day Busan (Pusan), used only to mark the southern end of the early campaign, including the Pusan Perimeter before the Incheon landing.',
      zh: '今釜山的地区锚点，仅用于标出战争初期战局的南端，包括仁川登陆前的釜山防御圈。',
    },
  },
  {
    id: 'hungnam',
    kind: 'site' as const,
    kicker: { en: 'Hungnam  ·  typological bearing', zh: '兴南  ·  类型学方向' },
    title: { en: 'A coastal bearing for withdrawal', zh: '撤离的海岸方向' },
    body: {
      en: 'A typological coastal mark at present-day Hungnam. It indicates a withdrawal bearing after the Changjin / Chosin fighting, not a roster of the evacuation.',
      zh: '今兴南的类型学海岸标记。它只表示长津湖作战之后的撤离方向，不是撤离名册。',
    },
  },
] as const

export const EQUIPMENT_CARDS = [
  {
    id: 'light-infantry',
    kicker: { en: 'Equipment  ·  typological', zh: '装备  ·  类型学' },
    title: { en: 'Light infantry', zh: '轻装步兵' },
    body: {
      en: 'Early Volunteer Army units are shown here as typological light infantry: small arms, limited organic artillery and armor, moving mainly on foot. This is a contrast of kinds, not a museum collection and not a census of divisions.',
      zh: '战争初期的志愿军在此示意为类型学上的轻装步兵：轻武器为主，建制内的炮兵与装甲有限，主要靠徒步行军。这是种类上的对照，不是博物馆藏品，也不是师团普查。',
    },
    note: {
      en: 'Chinese official histories themselves describe the early force as lightly equipped relative to UN Command. No headcount is added on this card.',
      zh: '中国官方战史本身也把战争初期的部队，描述为相对联合国军装备较轻。本卡不附加人数。',
    },
  },
  {
    id: 'un-firepower',
    kicker: { en: 'Equipment  ·  typological', zh: '装备  ·  类型学' },
    title: { en: 'UN air, armor, and artillery', zh: '联合国军的空军、坦克与大炮' },
    body: {
      en: 'UN Command’s typological advantage is shown as air power, armor, and artillery — the modern combined-arms kit that the early Volunteer Army could not match one-for-one. The marks are schematic, not a table of order-of-battle.',
      zh: '联合国军的类型学优势，在此示意为空军、坦克与大炮——战争初期志愿军无法一对一对等的现代化合成装备。标记是示意，不是一份编制表。',
    },
  },
  {
    id: 'mig-15',
    kicker: { en: 'MiG-15  ·  MiG Alley', zh: '米格十五  ·  米格走廊' },
    title: { en: 'A typological corridor along the Yalu', zh: '鸭绿江一带的类型学走廊' },
    body: {
      en: 'From late 1950 and more clearly in 1951, MiG-15 jet fighters appeared over northwestern Korea, in the airspace later nicknamed “MiG Alley.” The band on the globe is typological. It is not a reconstruction of sorties or of any one aircraft.',
      zh: '自一九五〇年末，更清楚是在一九五一年，米格十五喷气式战斗机出现在西北朝鲜上空，这片空域后来常被称作“米格走廊”。地球上的色带是类型学示意，不是出动架次或某一架飞机的复原。',
    },
    note: {
      en: 'The aircraft were flown from bases on the Chinese side of the Yalu as well as over the corridor itself. This chapter does not unroll a separate air-order-of-battle.',
      zh: '飞机既从鸭绿江中国一侧的机场起飞，也在走廊上空活动。本章不另展开一份空军编制。',
    },
  },
  {
    id: 'supply-line',
    kicker: { en: 'Logistics  ·  typological', zh: '后勤  ·  类型学' },
    title: { en: 'A line that was cut and repaired', zh: '一条被切断又被抢修的线' },
    body: {
      en: 'The typological supply line runs from a Northeast hinterland across the Yalu and southward under air interdiction. Official and memoir accounts agree that the line was repeatedly damaged and repaired. Surviving that interdiction is part of the equipment and mobilization story, not a claim that the road was ever safe.',
      zh: '类型学补给线从东北腹地越过鸭绿江向南延伸，并处在空中封锁之下。官方记载与回忆都同意：这条线多次被打坏，又被抢修。在封锁下把线保住，属于装备与动员故事的一部分，并不是说这条路曾经安全。',
    },
  },
] as const

export const SOURCE_SECTIONS = [
  {
    title: { en: 'How this chapter handles evidence', zh: '本章如何处理证据' },
    paragraphs: [
      {
        en: 'This is a colloquial popular-science tour, not a literature recitation and not a scoreboard. Spoken commentary avoids death totals. Where a figure must appear in a card or in these notes, it is attributed to an official series or to a named scholar, and disagreement is left visible. A mid-point of a range is never presented as fact. Campaign marks on the globe are typological schematics, labeled as such, never a troop census and never a visualization of the dead.',
        zh: '这是给听众的通俗讲解，不是念文献，也不是记分牌。口播解说避免使用死亡总数。若卡片或本说明必须出现数字，会归到某一官方系列或具名学者，并保留分歧。不以区间中值充当事实。地球上的战役标记都是类型学示意，并加以标明，绝不是兵力普查，也绝不把阵亡可视化。',
      },
    ],
  },
  {
    title: { en: 'Names and dates used on the globe', zh: '地球上使用的名称与年代' },
    items: [
      {
        en: 'Chinese People’s Volunteer Army (中国人民志愿军, PVA); the Korean People’s Army (朝鲜人民军); UN Command (联合国军). Period-accurate Chinese place names are used with present-day identifications: 仁川 (Incheon), 鸭绿江 (Yalu / Amnok), 三八线 (the 38th parallel), 板门店 (Panmunjom), 云山 (Unsan), 长津湖 (Changjin / Chosin Reservoir), 上甘岭 (Shangganling / Triangle Hill), 丹东 (then 安东, Andong).',
        zh: '中国人民志愿军（PVA）、朝鲜人民军、联合国军（UN Command）。年代上使用当时的中文地名，并附今地图标识：仁川、鸭绿江、三八线、板门店、云山、长津湖（Chosin Reservoir）、上甘岭（三角山 / Triangle Hill）、丹东（当时称安东）。',
      },
      {
        en: 'Outbreak, 25 June 1950; Incheon landing, 15 September 1950; PVA crossing of the Yalu beginning 19 October 1950, following Chinese official campaign histories; five campaigns from late October 1950 into the spring of 1951; talks from 10 July 1951 (first at Kaesong, later Panmunjom); Shangganling / Triangle Hill in the autumn of 1952; Armistice Agreement signed at Panmunjom on 27 July 1953.',
        zh: '一九五〇年六月二十五日战争爆发；九月十五日仁川登陆；按中国官方战史，志愿军自十月十九日起渡过鸭绿江；自一九五〇年十月下旬至一九五一年春为五次战役；一九五一年七月十日开始谈判（先在开城，后在板门店）；一九五二年秋为上甘岭 / 三角山之战；一九五三年七月二十七日《朝鲜停战协定》在板门店签字。',
      },
    ],
  },
  {
    title: { en: 'Chinese official and memoir accounts', zh: '中国官方战史与回忆' },
    items: [
      {
        en: 'Military History Research Department, Academy of Military Science, History of the War to Resist US Aggression and Aid Korea (抗美援朝战争史), Military Science Press — the standard official Chinese campaign history (three volumes in the widely cited edition).',
        zh: '军事科学院军事历史研究部《抗美援朝战争史》，军事科学出版社——广泛引用的中国官方战役史（通行本为三卷）。',
      },
      {
        en: 'Peng Dehuai, Peng Dehuai’s Self-Account (彭德怀自述), for the commander’s later account of the decision to enter the war and of the campaigns. This is a memoir, not a statistical yearbook; it is cited as testimony, not as a census.',
        zh: '彭德怀《彭德怀自述》，可见决策入朝与战役过程的当事人事后叙述。这是回忆，不是统计年鉴；作证词引用，不作普查引用。',
      },
      {
        en: 'Hong Xuezhi, Recollections of the War to Resist US Aggression and Aid Korea (抗美援朝战争回忆), a senior logistics commander’s account of the supply line under air attack.',
        zh: '洪学智《抗美援朝战争回忆》，一位主管后勤的高级指挥员对空袭下运输线的叙述。',
      },
    ],
  },
  {
    title: { en: 'Scholarship on decision and archives', zh: '决策与档案研究' },
    items: [
      {
        en: 'Shen Zhihua (沈志华), Mao Zedong, Stalin and the Korean War (毛泽东、斯大林与朝鲜战争), and related work drawing on published Russian and Chinese archival material, on the international decision to enter the war and on alliance politics. Page numbers are not invented here; readers should use the edition to hand.',
        zh: '沈志华《毛泽东、斯大林与朝鲜战争》及利用已刊俄国与中国档案的相关研究，讨论参战的国际决策与同盟政治。此处不编造页码；请以手边版本为准。',
      },
      {
        en: 'Chen Jian, China’s Road to the Korean War (Cornell University Press, 1994), on the PRC’s path to intervention.',
        zh: '陈兼（Chen Jian），China’s Road to the Korean War（康奈尔大学出版社，1994），讨论中华人民共和国走向参战的道路。',
      },
      {
        en: 'Allen S. Whiting, China Crosses the Yalu (Macmillan, 1960), an early English-language study of the crossing decision, to be read with later archival work.',
        zh: 'Allen S. Whiting，China Crosses the Yalu（Macmillan，1960），关于渡江决策的早期英文研究，宜与后来的档案研究对照阅读。',
      },
    ],
  },
  {
    title: { en: 'United States official histories', zh: '美国官方战史' },
    items: [
      {
        en: 'Roy E. Appleman, South to the Naktong, North to the Yalu (June–November 1950), United States Army in the Korean War — official US Army history covering the Naktong / Pusan fighting, the Incheon landing, the advance north, and first contact including Unsan.',
        zh: 'Roy E. Appleman，South to the Naktong, North to the Yalu（1950年6–11月），美国陆军《朝鲜战争中的美国陆军》系列——涵盖洛东江 / 釜山防御、仁川登陆、北进，以及包括云山在内的初次接触。',
      },
      {
        en: 'Billy C. Mossman, Ebb and Flow, November 1950–July 1951, United States Army in the Korean War — official US Army history of the winter of 1950–51, including the Chosin / Changjin campaign and the later stabilization of the front.',
        zh: 'Billy C. Mossman，Ebb and Flow, November 1950–July 1951，同系列美国陆军官方战史——涵盖一九五〇至五一年之冬，包括长津湖战役及此后战线的稳定。',
      },
      {
        en: 'Walter G. Hermes, Truce Tent and Fighting Front, United States Army in the Korean War — official history of the armistice talks and the fighting that continued during them, including the 1952 positional battles.',
        zh: 'Walter G. Hermes，Truce Tent and Fighting Front，同系列官方战史——停战谈判及谈期间的作战，包括一九五二年的阵地战。',
      },
      {
        en: 'Robert F. Futrell, The United States Air Force in Korea, 1950–1953, a standard official US Air Force history, relevant to air interdiction and to the fighting along “MiG Alley.”',
        zh: 'Robert F. Futrell，The United States Air Force in Korea, 1950–1953，美国空军官方战史的通行本，与空中封锁及“米格走廊”上的作战有关。',
      },
    ],
  },
  {
    title: { en: 'The armistice document', zh: '停战文件' },
    items: [
      {
        en: 'Agreement concerning a military armistice in Korea, signed at Panmunjom, 27 July 1953, with its annexes on the military demarcation line and the demilitarized zone. The text establishes a cease-fire and a military demarcation line; it is not a peace treaty between the parties.',
        zh: '《关于朝鲜军事停战的协定》，一九五三年七月二十七日在板门店签字，并附军事分界线与非军事区等附件。文本确立停火与军事分界线；它不是各方之间的和平条约。',
      },
    ],
  },
  {
    title: { en: 'A note on numbers', zh: '关于数字的说明' },
    paragraphs: [
      {
        en: 'Official Chinese tallies, official US and UN tallies, and later scholarly estimates of strength and losses do not agree, and they are not always counting the same thing (killed, wounded, missing, captured; Chinese, Korean, and UN national subtotals; different closing dates). This chapter therefore does not place a death total in the spoken hook, does not visualize 亡与数, and does not offer a mid-point as a fact. Readers who need a figure should return to the official series and to the archival scholarship named above, and should expect the sources to disagree.',
        zh: '中国官方统计、美国与联合国官方统计，以及后来学者对兵力与损失的估计，并不一致；它们也未必在数同一件事（阵亡、负伤、失踪、被俘；中、朝与联合国军各国分项；不同的截止日）。因此本章不在口播开场里放置死亡总数，不把“亡与数”可视化，也不把区间中值当作事实。需要数字的读者，应回到上面点名的官方系列与档案研究，并预期来源之间存在分歧。',
      },
    ],
  },
] as const

export type KoreaCard = (typeof SITE_CARDS)[number] | (typeof EQUIPMENT_CARDS)[number]

export function findKoreaCard(kind: string, id: string) {
  if (kind === 'equipment') return EQUIPMENT_CARDS.find((item) => item.id === id) ?? null
  return SITE_CARDS.find((item) => item.id === id) ?? null
}
