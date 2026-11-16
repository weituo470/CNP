# Chapter I journey / 第一章导览

A pitch-ready guided journey on the existing 3D Earth of this standalone competition app, extracted from 《地球往事》. This is **Chapter 1 only** of a later five-chapter path. Chapters 2–5 are structured for later addition and are not implemented here.

这是嵌在本比赛用轻量地球里的第一章导览，可供路演。地球仍是展示舞台；新增工作是中英对照解说、谋略段落，以及用于本次解说的研究文献。后四章预留了结构，尚未实现。

This work is **local only**. It is not deployed, and it does not change 《地球往事》 or any public site.

本功能仅限本地，不上线，也不改动《地球往事》原作。

## Enter / 进入

```bash
npm install
npm run dev
```

Then open [http://localhost:5173/](http://localhost:5173/). The app enters Chapter I on first load. `?journey=force` remains supported.

The default overlay language is Chinese. English is a complete peer, not a gloss. The language preference is stored only in `localStorage` on this machine. `Esc` exits the journey and restores a freely inspectable Earth; the Chapter I control starts it again.

默认语言为中文；英文是完整对照，不是摘译。`Esc` 退出导览，进入可自由浏览的地球。

## Presenter controls / 演示操作

- Click **播放解说 / Play narration** to start the spoken Chinese commentary. Browsers block autoplay, so a click is required. The globe then turns to each beat’s region, and typological war demonstrations play in sync with the voice.
- `Space` plays or pauses the narration (it no longer advances the beat)
- `0`–`7` jump to hook and beats 1–7; if narration is playing, the new beat’s clip starts immediately
- `←` `→` move between beats
- Drag to orbit the existing globe; scroll to dolly
- Click a theater, stele, weapon, or scale field for a short source-careful card
- On the crossbow, **Open the bronze lock** for an exploded trigger view
- `Sources / 史料与注释` opens a citations drawer
- EN / 中文 toggles the journey overlay language. Spoken audio is Chinese-only for now; English keeps the on-screen text and pauses any playing voice
- **从头播放 / Replay from the start** returns to beat 0 and plays again

数字键 `0`–`7` 跳转段落。空格播放或暂停解说。须先点击「播放解说」；浏览器不会自动出声。

## Beats / 段落

The left dock is no longer a plain caption panel. Chapter I is told as a lore surface: **竹简 / bamboo slips** for the Chinese argument, **羊皮卷 / parchment rolls** for the Mediterranean argument, with typological plates at `public/art/codex/`. Every plate is labeled 历史想象图 / typological illustration, not a photograph of the event. Body text is set horizontally on an opened bamboo spread or on the unrolled vellum, so it stays readable. Click **播放解说** (a clay 封泥 seal on the dock; browsers still block autoplay). A neural Chinese voice (Yunyang, slightly slower) then reads the commentary. The spoken paragraph’s ink darkens, and the matching surface comes forward. Paragraph timings live in `public/audio/zh/manifest.json`. When a clip ends, a short gap later the next beat is selected through the existing `setBeat` path, which already flies the camera and rotates the globe; the previous material rolls closed and the new one opens. If an mp3 fails, the app falls back to the browser’s `speechSynthesis` in `zh-CN`; if that also fails, the visual journey remains and a short error is shown in the player.

左栏改为竹简与羊皮卷的史料呈现，并配类型学想象图。须先点击封泥式「播放解说」；浏览器不会自动出声。点击后，镜头转到对应位置，并同步演示战争。地球仍是舞台，解说层不覆盖地球。

War demonstrations are typological and schematic, never gory and never a literal troop census. Campaign arcs are labeled 示意 / typological. At Changping the demo shows approach, encirclement, and a broken supply line, then a tight dim aftermath mark. Archaeology is on the order of a hundred remains; the *Shiji* figure of 400,000 is **not visualized**.

战争演示为类型学示意，不是写实战场。长平只表现包围与断粮的作战过程，以及克制的战后痕迹；不可视化史记四十万。

The chapter compares three axes on a shared, contemporaneous timeline: intensity (烈度), weapon and military-industrial quality (兵器质量), and strategy (谋略). Later imperial Rome, and later theory such as Clausewitz, are not brought forward.

本章在同时代时间尺上比较三件事：战争烈度、兵器与军工、谋略与兵书。不把后来的罗马帝国或《战争论》提前来比。

0. Hook — “This was not tribal raiding.” / 「这不是部落袭扰。」 The Earth is held on the fifth to third centuries BCE; the commentary states the three-axis comparison.
1. Shared timeline, c. 475–221 BCE, with clickable theaters on the **real globe** (Warring States China; eastern Mediterranean / Greek world; Achaemenid–early Hellenistic Near East; late Mahajanapada / Nanda–early Maurya, cautious; mid-Republican Rome only at the late overlap from 264 BCE). Cannae (216) is after 221 and is not used. Intensity is read first from duration, and from the fact that defeat could mean the death of a state. Lewis is cited for the shift from aristocratic chariot warfare to mass infantry; Hui for the Chinese multi-state system and Qin’s stratagems. Hui’s book also compares ancient China with early modern Europe; that European case is **not** used here as a contemporaneous Republican Rome parallel.
2. Institutions in China: household registers, granaries, counties, conscription — machinery, not a single headcount. Shang Yang’s reforms (from about 356 BCE) are the best-documented case; the fiscal-military trend ran wider than Qin. Hui’s “governance arms race” is used for this institutional reading.
3. Inspectable typological weapons (procedural geometry, not museum scans): ge (a formation polearm made to hook and peck in ranks), mass-produced crossbow with bronze trigger, late iron, Zhao cavalry reform 307 BCE. The best evidence for interchangeable trigger manufacture is Qin and Han; the Warring States are the formative period, not a back-dated Han lock. Cast iron’s advantage is stated as mass production of tools, not as universally sharper swords.
4. Scale comparison: 1 block = 1,000 people. Solid blocks are modern estimates; hatched blocks are source claims.
5. Changping, 260 BCE, near present-day Gaoping, Shanxi (a labeled site / representative coordinate, not a trench grid). *Shiji* 400,000 killed, 240 youths spared, is a source narrative. Excavations from 1995 at Yonglu, and later work, confirm a major battle and a massacre (male skeletons with sharp-force injuries, disordered stacking). A single pit is on the order of about a hundred remains, not 400,000. Many modern historians see rhetorical inflation; a few argue that a very broad definition of “soldiers” might make a huge figure less impossible. **No replacement number is invented.** Bai Qi’s cutting of supply and encirclement is the operational fact that can be told.
6. Strategy — “Strategy was already a state craft.” / 「谋略是一种国家技艺。」 Mid-Warring States cursor; a slightly tighter Eurasian framing shows China, the Greek world, and the Near East together. The received *Sunzi* is treated as gradually written down in the mid-to-late Warring States, not as a book already finished by 500 BCE. Beside it stand *Sun Bin*, the *Wuzi*, the *Weiliaozi*, and other works later gathered into the military-canon tradition; the Song canon itself is not back-dated as a Warring States institution. Contemporaneous western writing and practice (Thucydides, Xenophon, Aeneas Tacticus, Alexander’s command) are acknowledged; the contrast is that Warring States military books more systematically turned “how a state remakes itself for war” into a transmissible craft.
7. Close: what the record can actually defend — not a myth of invincibility, and not a contest of numbers, but three visible capacities: sustained high-intensity war supported by household registration and county administration; military-industrial organization typified by the crossbow lock and iron production; and a tradition of strategy written into military books. Room is left for Chapter 2 later.

403 BCE (Zhou recognition of the partition of Jin) is mentioned as a strong alternative start. Nothing in the argument depends on 475 alone.

`BEAT_COUNT` is derived from `BEAT_STAGING.length` and is type-checked against `BEATS.length`; the build fails if they diverge.

## Historical figures used, and how they are qualified

| Figure | Qualification |
| --- | --- |
| Athens, Sicily 415 BCE, first wave ≈ 27,000 including crews | Modern estimate built from Thucydides (5,100 hoplites at the outset, plus light troops and a large fleet) |
| Alexander commonly 30,000–47,000; Gaugamela often ≈ 47,000 | Modern synthesis; ancient authorities differ |
| Mid-Republican consular army ≈ 16,000–20,000 | Standard handbook range; late overlap only |
| Xerxes’ “millions” | **Not used** |
| Nanda 200,000 infantry | Greek/Latin report (Curtius, Diodorus, Plutarch). Same caution as large Chinese totals. Not shown as a verified muster. |
| Chinese narrative claims 100,000–600,000 (e.g. Wang Jian 224 BCE, 600,000) | Shown as **source claims**, hatched, not musters |
| *Shiji* 400,000 Zhao killed at Changping | Source narrative; archaeology confirms a massacre, not that total; a single pit is on the order of about a hundred remains; **no invented replacement** |

Dates and cursors use the project time model in `src/utils/time.ts` (historical year numbering: `-0475` is 475 BCE; year 0 is invalid). JavaScript `Date` is not used to construct BCE civil dates for the journey.

Pins on the globe are regional or site coordinates on the **present-day** Earth, and are labeled as such.

## Research used in this commentary / 用于本次解说的研究文献

Full bilingual entries live in the Sources drawer. In brief, and without invented page numbers:

- Mark Edward Lewis, *Sanctioned Violence in Early China* (SUNY, 1990); also his Warring States political and military discussions in the *Cambridge History of Ancient China*.
- Victoria Tin-bor Hui, *War and State Formation in Ancient China and Early Modern Europe* (Cambridge University Press, 2005); and “Toward a Dynamic Theory of International Politics,” *International Organization* 58.1 (2004). Her European comparison is mainly with early modern Europe, used here for the Chinese-system argument, not as a contemporaneous Rome parallel.
- Yuri Pines and related work on Shang Yang / the *Book of Lord Shang*, including the Oxford Handbook chapter on Warring States institutional reforms.
- Joseph Needham and Robin D. S. Yates, *Science and Civilisation in China*, Vol. 5, Part 6: *Military Technology: Missiles and Sieges* (Cambridge, 1994), on military writing and the crossbow.
- David Williams, “Mass-Produced Pre-Han Chinese Bronze Crossbow Triggers,” *Arms & Armour* 5.2 (2008), discussing interchangeable manufacture (after Yates 2007); and the metrical / craft-organization study of Terracotta Army bronze triggers (Li, Bevan, et al., published in *Antiquity*).
- On iron: work by Yaxiong Liu (including the UCL dissertation *Iron production in the state of Qin during the Warring States period*) and Liu & Wood in *Internet Archaeology* 69, on the coexistence of bloomery and cast iron and on cast iron’s role in mass-producing tools. This chapter does not claim that Chinese swords were universally superior.
- Ralph D. Sawyer, *The Seven Military Classics of Ancient China*, for the received military-canon grouping. The Song canon itself is not back-dated as a Warring States institution.
- Existing Changping, Thucydides, Arrian, and dating notes are kept. Yonglu (1995) is named as the mid-1990s excavation already alluded to.

## Implementation notes / 实现说明

Code lives under `src/journey/` with a small store at `src/store/journey.ts`. This standalone app mounts the journey on first load; it does not hook into the original 《地球往事》 tree.

- `src/journey/force/content.ts` — bilingual beats, including `narration`, and the sources drawer
- `src/journey/force/sites.ts` — camera staging, including the mid-Warring States strategy framing
- `src/journey/force/JourneyOverlay.tsx` — top chrome, lore dock, narration player, and beat asides
- `src/journey/force/JourneyCodex.tsx` and `codex.ts` — 竹简 / 羊皮卷 surfaces, typological plates, and paragraph emphasis
- `src/styles/codex.css` — physical materials (slips, cords, rods, vellum, 封泥)
- `src/store/narration.ts` — click-to-play audio, paragraph clock, beat auto-advance, and speech fallback
- `src/journey/force/JourneyWarLayer.tsx` — typological war demonstrations synced to beat and paragraph
- `src/styles/journey.css` — overlay typography; the commentary is scrollable and kept to the left, so it does not cover the globe’s center or the progress bar

The original project, its public site, and any laptop copy of 《地球往事》 are outside the scope of this file.
