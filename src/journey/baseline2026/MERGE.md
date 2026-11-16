# 2026 军力基线 · 共享文件合并说明

本线的几乎全部新代码都在 `src/journey/baseline2026/`，以及 `public/audio/baseline2026/` 与 `public/art/baseline2026/`。样式在 `src/styles/baseline2026.css`（会引用既有的 `codex.css` 布局，但不改其战国材质）。

**未改动** `src/journey/force/`（应保持与第一章原作一致）。**未改动** `src/journey/korea/`。**未改动** `src/store/experience.ts`。日历光标仍通过既有 journey store 的 `applyEarthWindow` 写入。

工作期间，抗美援朝线已在同一仓库落地了共享路由（`runtime.ts`、`useAppJourney`、按 `activeJourney` 切换的 store 与地球图层）。本线接到那套已有骨架上，而不是再拆一套互相覆盖的注册表。

预览：

```bash
npm run dev
# http://localhost:5173/?journey=baseline2026
```

`/` 与 `?journey=force` 仍进入第一章。`?journey=korea` 仍进入抗美援朝线（若该线已合并）。

## 共享文件逐项

### `src/journey/types.ts`

- `JourneyId` 扩展为 `'force' | 'baseline2026' | 'korea'`。
- `JourneyCardKind` **只做加法**：保留战国原有五种，并加上本线的 `'platform' | 'estimate' | 'doctrine'`，以及抗美援朝线已使用的 `'campaign' | 'equipment' | 'site'`。
- 新增 `JourneyStoreStaging`（仅 `cursor` + `focus`）。`JourneyCameraStaging` 是它的别名，供已落地的 `runtime.ts` 使用。`JourneyStaging` 原样保留给战国 `BEAT_STAGING`。

合并时：若出现重复的 `JourneyId` 或卡片种类扩展，做成联合，不要互相覆盖。

### `src/journey/runtime.ts`

这是 store 实际调用的薄注册表（由抗美援朝线引入）。本线在其中增加了 `baseline2026` 分支：段数、镜头分期、`SITE_INDEX`、音频清单路径 `audio/baseline2026/zh/manifest.json`。战国与抗美援朝的查找逻辑保持原契约（`getJourneyStaging` 不返回 `null`）。

### `src/journey/registry.ts`（新）

文档入口，从 `runtime.ts` 再导出同一组函数，方便三线合并时只认一个「按 `JourneyId` 查表」的名字。不要再维护第二套互不相同的实现。

### `src/store/journey.ts`

抗美援朝线已把 `startJourney` / `setBeat` / `openCard` 改为走 `runtime` 辅助函数，并增加 `lastExitedJourney`。本线不再改写这些函数：只要 `runtime.ts` 认识 `baseline2026`，store 就会使用本线的 cursor、focus 与地点。未改 `experience.ts`。

### `src/store/narration.ts`

抗美援朝线已按 `activeJourney` 加载清单、切换时清缓存，并支持 `initNarration(journeyId?)`。本线不再改此文件：`getNarrationManifestUrl('baseline2026')` 指向本线清单。mp3 由 `zh-CN-YunyangNeural`、语速 `-8%` 生成；失败时仍回退 `speechSynthesis`。

### `src/journey/useAppJourney.ts`

在已有 force / korea 路由上增加：

- `?journey=baseline2026` 启动本线并 `initNarration('baseline2026')`。
- 退出后，非战国导览会把 `?journey=` 留在地址栏，刷新会回到刚才那条线；退出第一章仍去掉参数，默认 `/` 行为不变。
- 数字键范围跟随当前导览的 beat 数（本线仍是 `0–7`）。

**不要**在 App 里重新调用 `useForceJourney`：它会在挂载时无条件 `startJourney('force')`，抢走 `?journey=baseline2026` 和 `?journey=korea`。

本目录另有 `useBaseline2026Journey.ts`，供日后若改回 ForceApp / Baseline2026App / KoreaApp 三个子树时使用。当前 App 走共享 `useAppJourney`。

### `src/journey/index.ts`

在既有 force / korea 导出之外，增加 `Baseline2026Overlay`。未删除任何既有导出。

### `src/App.tsx`

- `journeyActive` 把 `baseline2026` 算进去。
- 标题：「力 · 2026 军力基线」/ “Force · 2026 Military Baseline”。
- 退出后的主按钮再次进入刚退出的那条线；另外两个按钮进入其余两条线。默认路由的第一章进入按钮保持可用。
- 在既有 overlay 旁挂上 `Baseline2026Overlay`（`activeJourney !== 'baseline2026'` 时自行返回 `null`）。

### `src/components/earth/EarthScene.tsx`

- `activeJourney === 'baseline2026'` 时挂载本线的 `Baseline2026Layer` / `Baseline2026Camera`。战国层只在 `force` 时出现，抗美援朝层只在 `korea` 时出现。
- 地球状态：战国仍用 `WARRING_STATES_EARTH`（无城市灯光）；本线与抗美援朝、自由浏览使用 `PRESENT_DAY_EARTH`（城市灯光打开）。没有第二套地球。
- `aria-label` 与载入遮罩为本线增加了一支文案。

### 未改的文件

- `src/journey/force/` 全部
- `src/journey/korea/` 全部
- `src/store/experience.ts`
- 根目录 `JOURNEY.md`、`README.md`、`index.html`（标题仍由 App 在运行时改写）

## 韩国线（以及以后的第三条线）如何接入

抗美援朝线已经接在同一套 `runtime` + `useAppJourney` + 条件图层上。以后若再加一条线：

1. 把代码放在 `src/journey/<id>/`，不要改 `force/` 或本目录。
2. 在 `types.ts` 把 `JourneyId` 做成联合，卡片种类只加不改。
3. 在 `runtime.ts` 登记段数、staging、地点索引、音频清单。
4. 在 `useAppJourney` 的 `requestedJourney()` 里识别 `?journey=<id>`。
5. 在 `App.tsx` 增加标题/进入按钮，并挂上该线 overlay。
6. 在 `EarthScene.tsx` 的 `ActiveJourneyLayer` / `ActiveJourneyCamera` 增加一支条件挂载；非战国线使用今日地球。

建议合并顺序：先合 `types` + `runtime`，再合两个 store 与 `useAppJourney`，再合 App / EarthScene，最后放入各章自己的 overlay、图层与音频。若 `JourneyId` 扩展重复，保留联合类型。


## Scale-beat comparison increment

Rewriting beat 4 into a global personnel / spending / combat-aircraft comparison did **not** require further edits to shared files (`App.tsx`, `types.ts`, `runtime.ts`, `useAppJourney.ts`, `EarthScene.tsx`, or the stores). `runtime.ts` already reads `SITE_INDEX` and `BEAT_STAGING` from this directory; the new typological country sites replace the former China-only scale fields inside `sites.ts`. New code stays under `src/journey/baseline2026/`, plus `src/styles/baseline2026.css` and `public/audio/baseline2026/zh/scale.mp3` (with matching `manifest.json` timings for that beat only).

This increment also upgrades the 2026 scroll off the rectangular steel-roller dossier onto original torn/burnt-edge paper (`public/art/baseline2026/dossier-sheet.webp` for official voice, `estimate-sheet.webp` for external estimates). Open/close motion is 720ms settle / 420ms lift with fade, matching Chapter I’s quality bar without copying `/art/codex/parchment-sheet.webp` or editing `src/styles/codex.css`. Globe labels that would sit over the centered `.baseline-paper` are hidden. No additional shared-file edits were required; `src/journey/force/`, `src/journey/korea/`, and `src/journey/mobilize/` were not touched.
