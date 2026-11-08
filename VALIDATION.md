# 验证记录

记录日期：2026-11-08。

## 当前扩展范围

本轮扩展为面向全人文社科的检索与申请准备工具：32 位起点候选，29 个学科分类均有实际记录；公开联系方式、学生与指导记录、本科指导与本科直博的独立状态、个人 funding、滚动三年成果、申请背景及解释性逐项评估。完整名单与选列数量见 CATALOGUE.md；不声称完整覆盖所有导师或全部近三年发表。

个人背景及补充资料保持本地保存；书目补查由用户主动请求 Crossref，条目需确认作者身份。没有部署全网自动导师发现、后台招生核验或录取概率预测。

## 本轮验证状态

- `enrichment-original.js` 已通过 `node --check`。
- `node scripts/check.cjs`：39 项自动检查通过，0 项失败；包括旧数据兼容、档案补充、扩展数据及书目解析。
- 扩展界面：32 位候选正常渲染；实际点选文学、法学、考古、宗教、音乐、社会工作、管理与图书情报筛选均返回真实记录。另已验证历史学与个人 grant 筛选。
- 申请背景保存后刷新仍保留；JSON 备份导入预览与确认恢复成功，测试用背景已恢复。
- 桌面 1440×1000 与手机 390×844 的页面无横向溢出，评估表单正常显示，浏览器错误/警告日志为空。
- Crossref 真实在线查询成功，结果先显示待核对而非自动保存；实测出现同名作者，已明确警示。解析器排除 peer-review 回复及未知类型，不伪装成论文。
- 单元测试验证 DOI 与日期、限流失败、未来作品排除、论文类型、闰日窗口，以及无来源的资金/本科结论不显示为确认事实。
- 手工提交联系方式及资金依据补充表单后，公开联系方式与个人补充标记正常，刷新仍保留；艺术创作按“创作 / 展演”展示。
- 个人补充的序列化与迁移由自动测试验证；本轮未逐一手工提交全部类型的学生/作品补充表单。

所有检查限定于实际执行范围，不据代码已添加就声称完整数据或自动核验已完成。

## 已核查的数据语义

- [Darren Lim 官方研究门户](https://researchportalplus.anu.edu.au/en/persons/darren-lim/)明确不接收 2026 或 2027 年开始的新博士生，保留例外说明。
- [Amy King 指导页](https://amykingonline.com/teaching)区分博士、本科 Honours/PhB 及角色；未知入学年份不倒推。
- [Wenting He 毕业记录](https://amykingonline.com/news/economics-security-second-sino-japanese-war-76hhp)中的 2026 年为毕业年，而非招生年。
- [Harvard 本科暑研摘要册](https://bpb-us-e1.wpmucdn.com/websites.harvard.edu/dist/6/132/files/2025/12/2024_hsurv_abstract_book_final.pdf)确认 Meg Rithmire 本科指导，不能据此标记本科直博。
- [Emma Aisbett 研究门户](https://researchportalplus.anu.edu.au/en/persons/emma-aisbett/)列有现行项目，保留 grant 不等于现有学生资助的限制。
- 成果为选列，专著、书章、学术论文及政策评论分开标注，不冒充完整清单。

## 旧版基线（历史结果）

扩展前，旧版通过 15 项自动测试及桌面 1440×1000、手机 390×844 的浏览器检查。已验证旧版筛选、搜索、收藏、对比、草稿与跟进保存、检索入口和 JSON 备份恢复。这只说明旧版基线可用，不代表扩展版已通过。

## 仓库与发布范围

目标公开仓库：[JackyYan920/PhD-program](https://github.com/JackyYan920/PhD-program)。源文件与 Pages 配置可用于部署；本记录不声明 Pages 已上线。只同步公共文件及证据，不上传个人背景、草稿、推荐信或 JSON 备份。
