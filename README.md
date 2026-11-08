# PhD Compass

面向全人文社会科学申请的导师检索、公开证据核验与申请准备工作台。从本科专业、研究问题、方法训练、发表、学术联系和推荐信准备情况出发，逐项查看匹配线索、申请限制和待确认问题。

**适用学科范围不等于数据库已收录全部导师。** 当前精选起点包含 14 位研究人员，覆盖国际关系、政治学、法学、历史学、哲学、社会学、语言学、心理学、经济学、教育学与人类学。其他领域可通过自定义关键词、官网检索及自建导师扩充。

## 打开与使用

解压后双击 `index.html` 可使用本地功能，不需要安装依赖。建议使用固定网址以稳定保存记录。本地预览需要 Node.js 18 或更高版本：

```sh
npm start
```

打开 `http://127.0.0.1:4173`。

1. 填写申请背景：本科专业、拟申请学科、学历阶段、成绩与研究训练、研究问题、关键词、方法和研究语言。发表、connection、推荐信以具体自述记录。
2. 按学科、地区、研究主题、学位路径、招生、项目资金和导师个人资金筛选，也可输入未预设的研究关键词。
3. 打开详情查看联系方式、学生与指导记录、本科相关证据、个人 funding、近三年成果及逐项评估。最多三位导师可并排比较。
4. 查阅来源后补充资料或核验记录。判断应附网址、日期及适用年度；不会因打开官网自动变成已核实。
5. 收藏后管理套磁阶段、笔记、联系日期、跟进日期、截止日期和草稿。页面不会自动发信或后台提醒。
6. 定期导出完整 JSON。CSV 适合查看整理，不能代替保留完整个人记录的 JSON 备份。

## 如何理解评估与证据

评估分别解释研究、方法、入学资格、招生、资金和材料准备度，不计算录取百分比，不按本科院校、期刊名气、connection 或推荐人声望自动加分。关键词重合只是弱匹配线索；跨专业或尚无发表不会自动判定不适合。推荐人已同意、导师曾回复等只是个人自述，不代表录取承诺。

| 信息 | 页面采用的含义 |
| --- | --- |
| 指导过本科生 | 有公开本科研究、荣誉论文或暑研指导证据；不是本科直博先例 |
| 招过本科直博生 | 需要能确认入学时学历和路径的独立证据；有学士学位不足以证明 |
| 学生年份 | 区分入学/开始年和毕业/结束年；未知年份留空，不用毕业年倒推 |
| 指导关系 | 主导师、共同指导、委员会成员、本科项目导师分别注明；名单不是完整招生名册 |
| 个人可用 funding | 需确认当前可用于新生的资助、年度及覆盖范围；与院系政策独立 |
| 有在研 grant | 只证明项目存在，不能推断余款、国际生学费或博士津贴名额 |
| 未知 / 未公开 | 来源不足，不代表没有学生、没有 funding 或不接受本科生 |
| 近三年成果 | 滚动三年窗口内精选可核实成果，分清专著、书章、预印本、报告和论文；非完整清单 |

研究资料和个人核验超过 90 天提示复查。仅知年份、处于三年日期边界的成果单列。公开工作邮箱可用于联系；未找到邮箱时保留官方联系入口，不猜测地址。

## 本地与在线功能

本地可完成筛选、背景评估、收藏对比、自建导师、个人资料补充、核验历史、申请跟进及 JSON/CSV 导出。旧版 v1 备份可继续导入，新增字段以安全默认值补齐。

官网检索生成搜索引擎入口，不自动抓取结果。在线补查论文由用户主动触发，通过 [Crossref 公共 REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/)查询作者姓名与近三年书目，不发送申请背景、笔记、connection 或推荐信内容。结果可能有同名作者、合著归属或日期误差，须确认作者与来源后再保存。无结果或请求失败不代表该导师没有发表。

尚未部署全网自动导师发现、定时官网核验、私人账户数据库、跨设备同步、邮件发送或提醒服务。搜索、抓取和定时更新需要独立服务或适当的执行环境；密钥不能写入静态网页。

## 数据保存与迁移

背景、备注、草稿、收藏、核验历史及个人补充保存在浏览器 `localStorage`，按网址隔离，不会因连接 GitHub 而上传。更换设备、浏览器、端口或域名后可导入 JSON。清除浏览器数据可能导致记录丢失；存储受限时页面会提示。

导入先展示预览。同 ID 个人记录以备份整条记录为准，不同 ID 保留；自建导师按 ID 合并，内置资料不被导入覆盖。个人背景以导入版本为准，对比选择保留。确认合并前导出当前备份。取消收藏不删除笔记或核验历史。

CSV 含扩展公开资料和申请记录，不保证保留完整结构及全部草稿。**不要把私人 JSON 备份、推荐信正文或个人材料提交到公开仓库。**

## 内置来源与重要更正

资料查阅于 2026-11-08，逐项链接与限制保存在数据文件及详情。学生列表不完整，不能据此统计录取率。

- **Darren Lim**：[ANU 研究门户](https://researchportalplus.anu.edu.au/en/persons/darren-lim/)明确不接收 2026 或 2027 年开始的新博士生，另列澳大利亚公务员 fellowship 咨询例外；已更正早期招生待确认状态。
- **Jessica Chen Weiss**：[SAIS 招生页](https://sais.jhu.edu/admissions-aid/doctoral-program-admissions/doctor-of-philosophy)说明 2026–2027 暂停博士招生，2027–2028 信息待回查；SAIS 不等于 JHU 政治学系。
- **Amy King**：[指导页](https://amykingonline.com/teaching)区分博士、硕士、Honours/PhB 和角色；[Wenting He 毕业说明](https://amykingonline.com/news/economics-security-second-sino-japanese-war-76hhp)确认 2025 年答辩、2026 年毕业，不能写成 2026 年入学。
- **Meg Rithmire**：[Harvard 2024 本科暑研摘要册](https://bpb-us-e1.wpmucdn.com/websites.harvard.edu/dist/6/132/files/2025/12/2024_hsurv_abstract_book_final.pdf)提供具名本科指导证据，不能据此推断本科直博政策。
- **Emma Aisbett**：[ANU 研究门户](https://researchportalplus.anu.edu.au/en/persons/emma-aisbett/)列有 2026–2029 在研项目，能否分配给新学生未确认。
- **Abraham Newman**：[Government FAQ](https://government.georgetown.edu/ph-d-in-government/graduate-admissions/faqs/)发布的是项目政策，不是导师个人经费或某位申请者的 offer。

新增候选包括 Jill Lepore、Amia Srinivasan、Ozan Aksoy、Alexandra D’Arcy、Nick Haslam、Esther Duflo、Kalwant Bhopal 和 Anna L. Tsing。合计选列 31 项成果，仍须按实际日期窗口区分。联系方式、学生关系、成果和 funding 均有独立来源及不确定性说明。Jill Lepore 所列为办公室处理的公开联系邮箱，并非私人邮箱。

## GitHub 与发布

目标公开仓库：[JackyYan920/PhD-program](https://github.com/JackyYan920/PhD-program)。同步代码与 Pages 上线是两步；是否上线须以实际工作流及 Pages 结果为准。

1. 同步源文件，保留 `.github/workflows/pages.yml`。工作流监听 `main`，若分支不同需调整。
2. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 运行 `Deploy PhD Compass to GitHub Pages`；后续推送触发检查、打包和部署。
4. 从成功部署结果获取实际地址。相对资源路径兼容仓库子目录。

只打包公共网页资源与公开线索，排除 `artifacts/`、个人备份及私有材料。参见 [GitHub 发布源说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 维护与验证

```sh
npm run check
```

没有第三方运行依赖，不需要 `npm install`。最新检查结果及浏览器验证范围见 `VALIDATION.md`。

| 文件 | 用途 |
| --- | --- |
| `data.js` | 原有六位公共线索 |
| `enrichment-original.js` | 原候选的联系、学生、资金、成果及招生补充；来源须追加保留 |
| `data-broad.js` | 新增跨学科候选和证据 |
| `core.js` | 数据清理、旧数据兼容、筛选、日期窗口和解释性评估 |
| `ui-extended.js` | 背景表单、资料补充、成果和评估展示 |
| `literature.js` | 用户主动触发的 Crossref 查询与解析 |
| `app.js` / `styles.css` | 页面交互、本地保存与响应式布局 |

维护数据必须保留来源和查阅日期。不要补造学生入学年、学历背景、未公开邮箱或导师余款；仅知年份的作品不要补造月日。
