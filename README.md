# 力 · 中国力量 / Earth Force

这是一个轻量的三维地球网页，用于向世界介绍中国自古以来的武力与动员能力。页面首次打开会自动进入第一章「战国」导览。

本项目是从成熟作品《地球往事》中抽出地球渲染核心后，单独重建的比赛用应用。《地球往事》原仓库与线上站点不在本项目范围内。

当前包含四条并行导览：

- 第一章 战国：`?journey=force`（默认）
- 抗美援朝：`?journey=korea`，说明见 [`src/journey/korea/README.md`](./src/journey/korea/README.md)
- 2026 军力基线：`?journey=baseline2026`
- 灾难应对与动员：`?journey=mobilize`，说明见 [`src/journey/mobilize/README.md`](./src/journey/mobilize/README.md)

三条后开的支线已纳入同一代码库，后期再合并为一条完整叙事。史学表述与数字以各章正文和 [JOURNEY.md](./JOURNEY.md) 为准，不要另行改写规模数字。

This is a lightweight 3D Earth page for a competition entry on China’s historical military capability, will, and mobilization. It was extracted from the mature local app 《地球往事》; that original remains a separate project. Chapter I (Warring States) is the default journey; the Korean War, 2026 baseline, and disaster-mobilization journeys live alongside it and are not yet merged into one narrative.

## 本地运行

```bash
npm install
npm run dev
```

然后打开 [http://localhost:5173/](http://localhost:5173/)。默认进入第一章；也可以使用：

- [http://localhost:5173/?journey=force](http://localhost:5173/?journey=force)
- [http://localhost:5173/?journey=korea](http://localhost:5173/?journey=korea)
- [http://localhost:5173/?journey=baseline2026](http://localhost:5173/?journey=baseline2026)
- [http://localhost:5173/?journey=mobilize](http://localhost:5173/?journey=mobilize)

预览构建请用 `npm run preview`（端口 5174，避免占用原作常用的 4173）。

```bash
npm run build
npm run preview
```

## 操作

- 数字键 `0`–`7` 跳转段落
- `←` `→` 或空格前进
- 拖动地球；滚轮缩放
- 点击战场、石碑、兵器或规模方阵查看卡片
- 弩可以打开青铜机括
- 导览层提供 Sources / 史料与注释，以及 EN / 中文
- `Esc` 先关闭资料或卡片，再退出导览，进入可自由浏览的地球；标题栏可再次进入

## 纹理来源

以下说明沿用《地球往事》README 中的归属，不另发明许可：

- 地表：NASA Blue Marble: Next Generation（October 2004），本地转换为 4K WebP
- 夜间灯光：`three-globe` 示例资源
- 海陆遮罩：Three.js 官方示例资源
- 云层：`turban/webgl-earth` 的 `fair_clouds_4k`，本地缩放为 2K WebP

运行时纹理都在 `public/textures/`，约 2.6 MB，无需 API Key。

## 和原作的关系

只带走了地球着色与镜头、时间模型，以及已经完成的第一章导览和三条并行支线。百科图片、古地理贴图、火星、月球、航天器、姊妹世界、网络模式等均未纳入。古地理在着色器中被关闭（`uPaleoBlend = 0`），不加载古大陆纹理，也不另绘海岸线。
