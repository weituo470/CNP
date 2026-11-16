# 灾难应对与动员线与其他各章的合并说明

本章几乎全部新代码都在 `src/journey/mobilize/` 与 `public/audio/mobilize/`、`public/art/mobilize/`。`src/journey/force/`、`src/journey/korea/`、`src/journey/baseline2026/` **未改动**，应保持字节级一致。未改 `src/store/experience.ts`，也未改 `src/store/journey.ts` 与 `src/store/narration.ts`（二者已通过 `runtime.ts` 按活动导览查表）。

共享文件只做了可合并的增量修改，目的是注册 `mobilize` 这一新的 `JourneyId`，并按活动导览挂载 overlay、地球图层与镜头。不要把本线的旗帜写进战国、抗美援朝或 2026 基线的类型里。

## 共享文件逐项

### `src/journey/types.ts`

- `JourneyId` 在原有 `'force' | 'baseline2026' | 'korea'` 上**加法**扩为再加 `'mobilize'`。
- **未新增** `JourneyCardKind`。本线复用已有的 `institution`、`site`、`campaign`、`doctrine`（以及需要时的 `estimate`）。若三方合并时其他线也扩展了 `JourneyId`，做成联合即可，不要互相覆盖。

### `src/journey/runtime.ts`

- 增加对 `mobilize/content` 与 `mobilize/sites` 的导入。
- `getJourneyBeatCount` / `getJourneyStaging` / `getJourneySite` / `getJourneyBeats` / `getNarrationManifestUrl` / `getNarrationAudioBase` 增加 `id === 'mobilize'` 分支。
- 音频路径为 `audio/mobilize/zh/manifest.json` 与 `/audio/mobilize/zh`。
- 函数签名未改。

合并时：保留按 `JourneyId` 查表的写法。若其他线也加了分支，并列保留，不要删掉 `mobilize` 分支，也不要写回战国默认路径。

### `src/journey/useAppJourney.ts`

- `requestedJourney()` 增加 `?journey=mobilize` 解析。
- **默认不变**：裸 `/` 与未知值仍进入第一章 / `force`。
- 退出后仍把非默认导览留在 URL 里（已有逻辑对任何非 `force` 的 `lastExitedJourney` 生效），因此 Esc 后刷新会重新进入 `?journey=mobilize`。

合并时：不要重新在 App 里调用 `useForceJourney`。把 `mobilize` 的解析与 `korea` / `baseline2026` 并列即可。

### `src/journey/index.ts`

- 在原有导出之外，增加 `MobilizeOverlay`，以及 `MOBILIZE_JOURNEY_META` / `MOBILIZE_JOURNEY_UI` 别名。未删除任何既有导出。

### `src/App.tsx`

- `TITLES` / `BRAND` 增加 `mobilize` 条目。
- `JOURNEY_ORDER` **追加** `'mobilize'`，未重排已有的 `force`、`baseline2026`、`korea`，以降低三方合并冲突。
- `enterLabel` 增加 `mobilize` 分支。
- `journeyActive` 把 `mobilize` 算作活动导览。
- 在已有 overlay 旁挂上 `<MobilizeOverlay />`（`activeJourney !== 'mobilize'` 时自行返回 `null`）。

合并时：保留追加顺序；若其他线也往 `JOURNEY_ORDER` 追加，把 `mobilize` 留在既有三项之后即可。

### `src/components/earth/EarthScene.tsx`

- `ActiveJourneyLayer` / `ActiveJourneyCamera` 增加 `mobilize` 分支，分别挂载 `MobilizeJourneyLayer` 与 `MobilizeJourneyCamera`。
- 未创建第二套地球渲染器，仍复用 `src/components/earth/`。
- 地球状态：战国仍用 `WARRING_STATES_EARTH`（城市灯光关闭）；`mobilize` 走已有的非 `force` 默认，即 `PRESENT_DAY_EARTH`（城市灯光打开）。未改战国灯光行为。
- `aria-label` 与 `TextureLoadingCopy` 为 `mobilize` 增加文案。

合并时：保持「按 `activeJourney` 条件挂载」。不要把战国层重新写成始终存在，否则本线会叠上战国战场。

### 未改动的共享文件

- `src/store/journey.ts`、`src/store/narration.ts`：已按 `runtime` 查表，本线无需再改。
- `src/store/experience.ts`：未改。
- 根目录 `README.md`、`JOURNEY.md`：未改，避免与第一章文档冲突。说明见本目录 `README.md`。

## 四条线应当如何落地

1. **force（战国）**：本线未改其目录。`/` 与 `?journey=force` 仍进入第一章，灯光关闭。
2. **korea（抗美援朝）**：本线未改其目录。预览仍是 `?journey=korea`。
3. **baseline2026（2026 军力基线）**：本线未改其目录。预览仍是 `?journey=baseline2026`。
4. **mobilize（灾难应对与动员）**：以本目录为准。预览 `?journey=mobilize`。

收束段与资料抽屉已为另外三章留下明确接口：

- 战国章：户籍、粮仓、县制，作为更早的国家机器。
- 抗美援朝：战时动员，与平时灾害动员对照。
- 2026 军力基线：国防动员、投送、军民两用能力，作为同一套国家能力的另一面。

建议合并顺序：先合 `types.ts` + `runtime.ts`，再合 `useAppJourney.ts` / `index.ts`，再合 `App.tsx` / `EarthScene.tsx`，最后放入各章自己的 overlay 与图层。若出现重复的 `JourneyId` 扩展，保留联合类型。
