# 2026 年中国军力基线 / 2026 China military baseline

A pitch-ready, bilingual popular-science tour on the same 3D Earth as Chapter I. This is a **public baseline**, not an intelligence briefing, and not a who-would-win scoreboard. Official announcements and external estimates are labeled throughout. Pins are regional or typological. No classified material, no targeting guide, and no campaign plan is used.

这是嵌在同一颗三维地球上的公开基线科普导览，供现场路演。官方公布与外部估计全程分开标明。地球仍是舞台；解说层是当代卷宗/白皮书式的卷轴，而不是战国的竹简或羊皮卷。

This work is **local only**. It is not deployed.

## Enter / 进入

```bash
npm install
npm run dev
```

Open [http://localhost:5173/?journey=baseline2026](http://localhost:5173/?journey=baseline2026).

`/` and `?journey=force` still enter Chapter I, with the Warring States Earth and bamboo/parchment surfaces. `?journey=korea` enters the sibling 1950–53 journey if that line is present. After Esc, the header’s primary button re-enters the journey you came from.

默认语言为中文；英文是完整对照，不是摘译。语音解说目前仅为中文。

## Presenter controls / 演示操作

- Click **播放解说 / Play narration** (a red document stamp on the dock). Browsers block autoplay, so a click is required. The globe then flies to each beat’s region.
- `Space` plays or pauses narration (it does not advance the beat).
- `0`–`7` jump to hook and beats 1–7; if narration is playing, the new beat’s clip starts immediately.
- `←` `→` move between beats.
- Drag to orbit; scroll to dolly.
- Click a theater region, typological silhouette, industrial region, country comparison column, or a row in the scale-beat chart for a short, source-careful card.
- **信源与注释 / Sources** opens the citations drawer.
- EN / 中文 toggles the overlay language. Spoken audio is Chinese-only; English keeps the on-screen text and pauses any playing voice.
- **从头播放 / Replay from the start** returns to beat 0 and plays again.

## Beats / 段落

The dock is a contemporary **卷宗 / 白皮书** paper scroll, with the same open/close choreography as Chapter I. Official-voice paragraphs use a cream dossier sheet; external-estimate paragraphs use a cool, faintly hatched sheet. Typological plates at `public/art/baseline2026/` are labeled 示意 / schematic. Body text is set horizontally and stays readable. Ink emphasis follows the spoken paragraph, and the camera may ease slightly when a paragraph has a tighter focus.

0. Hook — 「先把尺子摆正。」 The same Earth as Chapter I, calendar cursor 2026. This is a public baseline, not a threat briefing. Three axes: 体量与编成, 装备与工业, 研发方向与战争思想. Official numbers and external estimates will be labeled. No invented replacements.
1. Shared timeline / why a baseline — Recall Chapter I’s three visible capacities (household registration and counties; military-industrial organization; strategy written as statecraft). Ask what they look like in the 2026 public record. 1950–53 is another calibration point, told on a sibling journey, not in this chapter.
2. 体量与编成 — Official structure: CMC; five theater commands established on 1 February 2016 (official); services and arms. Official 19 April 2024 announcement: Information Support Force established; Strategic Support Force designation abolished; Military Aerospace Force and Cyberspace Force leadership adjusted; official layout also includes the Joint Logistic Support Force. Theater pins are **regional centroids**, not headquarters. China does not publish a detailed public end-strength table; IISS *The Military Balance* 2026, in open summaries, lists about 2.035 million active personnel — treated here as an external estimate on the order of two million. Official 2026 defense budget: 1.94 trillion yuan national general public budget (+6.9% vs previous year’s executed figure); 1.91 trillion yuan central-level (+7%). SIPRI’s estimate for **2025** is about 336 billion US dollars (broader definition; not a 2026 SIPRI figure).
3. 装备与工业 — Typological, public platforms only. Liaoning commissioned 2012, Shandong 2019 (official, in service). Fujian launched June 2022 and officially commissioned on 5 November 2025; a PLAN spokesperson said trials and ship-aircraft training would continue after commissioning. Type 055 first ship Nanchang officially commissioned 12 January 2020. J-20 officially confirmed in service in 2017–2018 and displayed at official events. The Rocket Force is an official service; no missile inventory and no sites are marked. Industry marks are typological coastal regions, not yards.
4. Scale comparison — A global reading of magnitude on the same Earth, not a scoreboard. At typological regional centroids (not capitals, HQs, or bases), each of eight countries stands a cluster of hatched columns: active personnel (IISS *The Military Balance* 2026 open summary, active forces during 2025), SIPRI military expenditure in 2025, and FlightGlobal *World Air Forces* 2026 combat aircraft. China is tallest on personnel; the United States is tallest on spending and on combat aircraft. North Korea has no SIPRI Table 1 figure for 2025, so that spending bar is omitted. Germany and the United Kingdom appear on the scroll’s spending (and aircraft) chart as top SIPRI spenders, without personnel columns on the globe. Navy hull totals are not stacked into a column, because definitions vary too widely; the already-checked 2024 US DoD wording on the PLAN is kept, and CRS is cited for an official US Navy battle-force total of 293 ships as of 1 October 2025, with the caution that the definitions are not the same. China’s official 2026 budget remains in the structure beat and in the China card, but the cross-country money axis is SIPRI so the units match. Camera: a high northern-hemisphere / near-Arctic overview (distance 6.45), then a slightly north-shifted Eurasian frame (5.35) so clusters sit in the visible ring around the centered paper, then a Pacific frame so US columns sit beside China, Japan, and the ROK (6.2).
5. 近海与远海的公开叙事 — Official language of the 2019 defense white paper *China’s National Defense in the New Era* (still the most recent comprehensive defense white paper as of 2026): a defensive national defense policy, safeguarding sovereignty, security, and development interests. External analysts discuss near-seas capabilities and growing power-projection tools. Both voices are placed on the table. The camera holds a **wide** western-Pacific framing. No island or base is pinned as a military objective.
6. 研发方向与战争思想 — Official public vocabulary: building a world-class military; fused development of mechanization, informatization, and intelligentization; joint operations; Xi Jinping Thought on Strengthening the Military as official public framing only. Contrast with Chapter I: then, strategy became a written state craft; now, modernization is articulated as public programs. Only officially displayed systems and official S&T/industry statements are mentioned.
7. Close — What the public record can defend: a large, reformed, industrial military mid-way through a publicly stated shift toward joint, high-tech modernization; many important numbers still come from external estimates. Not a myth of invincibility, and not a contest of raw counts. Chapter I is the ancient tick of the same three capacities; this is the 2026 tick; 1950–53 can be told on a sibling journey. A discreet regional interface mark on the peninsula is a hook only, not a campaign map.

`BEAT_COUNT` is derived from `BEAT_STAGING.length` and is type-checked against `BEATS.length`.

## Figures used, and how they are qualified

| Figure | Qualification |
| --- | --- |
| Five theater commands, 1 Feb 2016 | Official announcement (Chinese government website / Xinhua) |
| 19 Apr 2024 force-structure change; official names of Information Support Force, Military Aerospace Force, Cyberspace Force; SSF designation abolished | Official ceremony and Ministry of National Defense briefing; Chinese government website / Xinhua |
| Official 2026 defense budget: 1.94 trillion yuan national (+6.9%); 1.91 trillion yuan central-level (+7%); MoF table 190,956.1 million yuan central-level defense | Official, March 2026 NPC / PLA and PAP delegation spokesperson Zhang Xiaogang (MoD, 10 Mar 2026); Ministry of Finance table published 24 Mar 2026; budget report approved 12 Mar 2026 |
| Active personnel, 2025 (China 2,035,000; India 1,501,000; United States 1,340,000; North Korea 1,280,000; Russia 1,264,000; South Korea 450,000; Japan 247,000; France 204,000) | External estimate. IISS *The Military Balance* 2026, as published by Business Insider, “The largest militaries in the world, ranked by the number of active troops,” updated 26 October 2026, citing active armed forces during 2025. No printed IISS page number was independently inspected, and none is invented. The China figure is still treated as an order of two million. IISS defense-budget figures in that article are not used. URL: https://www.businessinsider.com/largest-militaries-ranked-by-size |
| SIPRI military expenditure, 2025, Table 1, current USD billion: United States 954; China [336]; Russia [190]; Germany 114; India 92.1; United Kingdom 89.0; France 68.0; Japan 62.2; South Korea 47.8; world 2,887; top five = 58% | External estimate. *Trends in World Military Expenditure, 2025* (fact sheet, April 2026). Square brackets = SIPRI estimate. Broader definition than the official 2026 PRC budget already introduced in the structure beat. Not a 2026 SIPRI figure. North Korea is not in Table 1. https://www.sipri.org/publications/2026/sipri-fact-sheets/trends-world-military-expenditure-2025 and https://www.sipri.org/sites/default/files/2026-04/2604_milex_2025.pdf |
| PLAN “world’s largest navy by hull count”; battle force of more than 370 ships and submarines, including more than 140 major surface combatants | External estimate. US DoD *Military and Security Developments Involving the PRC* 2024. The 2025 edition (released 23 Dec 2025) is noted as the latest in the series; this tour does not invent a newer PLAN hull count from it. No operational or contingency material is used. Navy totals are not stacked into a comparison column. |
| US Navy battle force: 293 ships as of 1 October 2025 | Official US figure, cited with that date from CRS Report RL32665, *Navy Force Structure and Shipbuilding Plans*. Definitions are not identical to the 2024 DoD wording on the PLAN. https://www.congress.gov/crs_external_products/RL/HTML/RL32665.web.html |
| Combat aircraft (United States 2,718; China 1,814; Russia 1,559; India 600; North Korea 455; South Korea 340; Japan 264; France 223; Germany 190; United Kingdom 141). US all-aircraft total 13,033 of a world 52,231 (context only) | External count. FlightGlobal *World Air Forces* 2026 (Cirium data, 1 October 2025), combat-aircraft column (fighters, attack aircraft, and bombers as FlightGlobal defines them). Open corroboration: https://airmuseums.co.uk/numbers/air-forces-of-the-world and https://aerospaceglobalnews.com/news/world-combat-aircraft-fleets-2026/. Totals and combat counts are not interchangeable. |
| Liaoning commissioned 25 Sep 2012; Shandong 17 Dec 2019; Fujian launched Jun 2022, commissioned 5 Nov 2025 | Official Xinhua / government / MoD reports. Post-commissioning trials are stated in the official spokesperson’s wording only. |
| Type 055 first ship Nanchang commissioned 12 Jan 2020 | Official Xinhua / MoD |
| J-20 inducted into PLAAF combat units, 2017–2018 official confirmation; later official displays | Official MoD / Xinhua |

Dates use the project time model in `src/utils/time.ts`. The representative cursors are `2026-01-01` (hook) and `2026-07-01` (later beats). JavaScript `Date` is not used to invent civil dates.

## Implementation notes / 实现说明

- `src/journey/baseline2026/comparison.ts` — typed source of truth for comparison figures, typological centroids, and number formatting
- `src/journey/baseline2026/content.ts` — bilingual beats, cards, and the sources drawer
- `src/journey/baseline2026/sites.ts` — regional / typological placements and camera staging
- `src/journey/baseline2026/ComparisonChart.tsx` — 2D dossier chart and globe legend for the scale beat
- `src/journey/baseline2026/JourneyOverlay.tsx` / `JourneyCodex.tsx` — top chrome, dossier scroll, sources, bilingual UI
- `src/styles/baseline2026.css` — torn 卷宗 paper (cream official / cool-gray estimate), laid flat at the center, 720ms settle / 420ms lift
- `public/art/baseline2026/dossier-sheet.webp` and `estimate-sheet.webp` — original torn/burnt-edge sheets; not Chapter I’s parchment-sheet.webp
- `src/journey/baseline2026/JourneyLayer.tsx` — regional theater marks, typological silhouettes, hatched three-axis comparison clusters, a wide western-Pacific arc
- `src/journey/baseline2026/JourneyCamera.tsx` — camera flight on the existing Earth renderer
- `public/audio/baseline2026/zh/` — Yunyang neural MP3s at −8%, with paragraph timings in `manifest.json`; `speechSynthesis` remains the fallback
- Shared wiring is documented in `MERGE.md`

The original project, its public site, and any copy of 《地球往事》 are outside the scope of this file.
