# 抗美援朝线与战国线的合并说明

本章几乎全部新代码都在 `src/journey/korea/` 与 `public/audio/korea/`、`public/art/korea/`。`src/journey/force/` 未改动，应保持字节级一致。未改 `src/journey/baseline2026/`（该目录由并行助手创建），也未改 `src/store/experience.ts`。

共享文件只做了可合并的增量修改，目的是让 store、地球和 App 能按活动导览切换，而不是把韩国战争的旗帜塞进战国类型里。

## 共享文件逐项

### `src/journey/types.ts`

- `JourneyId` 扩展为包含 `'korea'`。若并行的 2026 线已经把 id 写成 `'force' | 'baseline2026' | 'korea'`，保留这个三元联合，不要删掉任何一条线的 id。
- `JourneyCardKind` 增加 `'campaign' | 'equipment' | 'site'`（以及其他线可能已加入的 `'platform' | 'estimate' | 'doctrine'`）。原有 `theater | weapon | institution | formation | changping` 保持不变，战国卡片继续工作。`'equipment'` 是抗美援朝卡片所必需的。
- 共享镜头分期类型（`JourneyCameraStaging` / `JourneyStoreStaging`）只含 `cursor` + `focus`。`JourneyStaging` 原样保留，供战国 `BEAT_STAGING` 使用；抗美援朝用自己的 `KoreaStaging`，不把 `showLogistics` 一类字段塞进战国形状。

合并时：`JourneyId` 与卡片种类一律做成联合，不要互相覆盖。

### `src/journey/runtime.ts`（新的薄注册表）

这是唯一新增的共享运行时入口。它从 `force/sites`、`force/content`、`korea/sites`、`korea/content` 读取 beat 数、镜头分期、地点和音频清单地址，供 store 使用。

合并时：直接保留此文件。若 force 线后来也做了注册表，以「按 `JourneyId` 查表」为准，避免两套并行。

### `src/store/journey.ts`

- 不再直接 `import { BEAT_COUNT, BEAT_STAGING, THEATER_SITES } from '../journey/force/sites'`。
- `startJourney` / `setBeat` 通过 `getJourneyStaging` / `getJourneyBeatCount` 读取**当前**导览的 cursor、focus 与段数。战国仍使用 `src/journey/force/sites.ts` 的表。
- `openCard` 用 `getJourneySite(activeJourney, id)` 回退镜头，不再写死战国 `THEATER_SITES`。战国点击战场时仍能对上，因为注册表把 force 的 `THEATER_SITES` 暴露了出去。
- 新增 `lastExitedJourney`，供退出后的标题栏「再次进入刚才退出的导览」，并同时提供进入另一章的按钮。

冲突风险：若 force 线仍按 `BEAT_STAGING[0]` 写死 `startJourney`，合并时保留注册表写法，否则 `?journey=korea` 会套用战国第一段的镜头与日期。

### `src/store/narration.ts`

- 不再写死 `BEATS`、`BEAT_COUNT` 和 `/audio/zh/manifest.json`。
- 按活动导览加载对应清单（战国：`public/audio/zh/`；抗美援朝：`public/audio/korea/zh/`），切换导览时停止上一份音频并清空清单缓存。
- `fallbackManifest` 使用当前导览的解说段落；mp3 失败则回退 `speechSynthesis`（`zh-CN`），再失败则静音并给出短错误。
- 英文界面仍暂停中文口播（与战国行为一致）。夹结束仍经短间隔 `setBeat` 自动进入下一段。
- `initNarration(journeyId?)` 可指定导览；未指定时用当前活动导览。

冲突风险：若 force 线改过音频时钟或 `bindNarrationToJourney`，合并时务必保留「按 `activeJourney` 换清单、换段数」这一段。不要把清单 URL 写回战国路径。

### `src/journey/useAppJourney.ts`（新）

取代 App 对 `useForceJourney` 的调用。`useForceJourney.ts` **未改、也不再从 App 调用**：它会在首次加载时无条件启动战国，连 `?journey=korea` 也会被覆盖。

本钩子：

- URL 为 `?journey=korea` 时启动 korea，并 `initNarration('korea')`。
- 预览端口 `5175` 为抗美援朝专用：没有 `journey` 参数时也进入 korea，避免打开 `http://127.0.0.1:5175/` 却落到第一章。
- 其他首次加载（`/` 或 `?journey=force`，以及默认的 5173）保持原行为，进入第一章。
- 同步查询串；键盘（空格播放/暂停、方向键、数字键跳段、Esc 先关资料/卡片再退出）跟随**当前**导览及其 beat 数（战国 0–7，抗美援朝 0–6）。
- 监听 `popstate`，查询串变化时会切换导览，不只在首次挂载时读一次 URL。

### `vite.config.ts`

增加了仅对 5175 生效的开发服务器中间件：访问 `http://127.0.0.1:5175/` 会 302 到 `/?journey=korea`。5173 / 5174 行为不变。

合并时：App 继续调用 `useAppJourney`，不要重新挂上 `useForceJourney`。force 文件可原样留在仓库里。

### `src/journey/index.ts`

在原有 force 导出之外，增加 `useAppJourney`、`KoreaJourneyOverlay` 和韩国文案的别名导出。未删除任何 force 导出。

### `src/App.tsx`

- 使用 `useAppJourney`，不再使用 `useForceJourney`。
- `journeyActive` 在 `force` 或 `korea` 时为真。
- `document.title` 与退出后的品牌条随当前/刚退出的导览切换。
- 退出后的主按钮再次进入刚退出的那一章，旁边提供进入另一章的按钮。
- 在战国 overlay 旁挂上 `KoreaJourneyOverlay`（后者在 `activeJourney !== 'korea'` 时自行返回 `null`）。

### `src/App.css`

仅增加 `.app-chrome-actions`，用于并排两个进入按钮。

### `src/components/earth/EarthScene.tsx`

- 不再无条件挂载战国的 `JourneyLayer` / `JourneyCameraController`。
- `activeJourney === 'force'` 时挂战国层与镜头；`=== 'korea'` 时挂韩国层与镜头。
- 地球状态：战国仍用 `WARRING_STATES_EARTH`（城市灯光关闭）；抗美援朝与自由浏览使用 `PRESENT_DAY_EARTH`（城市灯光打开）。
- 无第二套地球渲染器，仍复用 `src/components/earth/`。
- 载入遮罩与 `aria-label` 随导览微调。

冲突风险：若 force 线改过 `Planet` / `Scene` 的挂载点，合并时保持「按 `activeJourney` 条件挂载」，不要把战国层重新写成始终存在，否则韩国章会叠上战国战场。

### 根目录 `README.md`

只加了一小段指针，指向 `?journey=korea` 与 `src/journey/korea/README.md`。未改写 `JOURNEY.md`（战国说明仍在原处）。

## 三条线应当如何落地

1. **force（战国）**：本目录文件保持不动。共享 store / App / Earth 的增量修改必须继续让 `/` 与 `?journey=force` 进入第一章，灯光关闭，竹简 overlay 与战争层照常工作。
2. **korea（抗美援朝）**：以本目录为准。预览 `?journey=korea`。
3. **baseline2026（2026 军力基线）**：由并行助手在 `src/journey/baseline2026/` 开发。本线不改那个目录。共享的 `runtime.ts`、`App.tsx` 与 `EarthScene.tsx` 已按活动导览注册该 id（`?journey=baseline2026`），以便三线在同一构建里共存。合并时保留联合类型与注册表，不要互相覆盖。

建议合并顺序：先合 types + runtime，再合两个 store，再合 App / EarthScene，最后放入各章自己的 overlay 与图层。若出现重复的 `JourneyId` 扩展，保留联合类型。

## 本次北极星迭代（仅 korea 目录）

为对齐章一的完成度，本轮只改了 `src/journey/korea/` 与 `public/art/korea/`：

- 卷面改为浅色旧纸 + 不规则焦边的居中简报（`brief-sheet.webp`），开合改为画面中央的淡入淡出 / 下落与抬起，不再使用方正木轴卷或廉价矩形框。
- 插图换成类型学故事画，作为印在卷上的画，而不是卷旁的线稿示意图。
- 地球地名与战争层 Html 标签在本线关闭（三维钉位与战争示意仍在），避免挡住正中的卷。这是 korea 目录内的处理，没有改共享地球标签或章一的 `JourneyLayer`。
- 镜头分期仍只写在 `korea/sites.ts`。动员开场对到东北后方，收束末段把地球停在半岛停战线附近，与口播说到的地点对齐。

本轮没有再改任何共享文件（`App.tsx`、store、`EarthScene.tsx`、types、runtime 等）。章一、2026 线、mobilize 目录均未触碰。
