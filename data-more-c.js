/* Additional real HSS research leads, checked against university and author/publisher sources.
 * Selected 2024–2026 works only: not complete bibliographies or confirmed admissions offers.
 * Public professional emails; no private contact details or inferred student relationships. */
globalThis.COMPASS_MORE_C = (() => {
  const checked = '2026-11-08';
  const source = (type,title,url,note) => ({type,title,url,note});
  const publication = (title,year,type,venue,url,sourceUrl,date='') => ({title,year,type,venue,url,sourceUrl,date,checked});
  const students = url => ({status:'unknown',undergrad:'unknown',bachelorEntrants:'unknown',note:'本轮未找到可逐人核实的近期招生年份、指导关系与入学背景名单。授课、合著或同属研究中心不自动算作指导关系；未知不等于没有学生。',url,checked,records:[]});
  const funding = url => ({status:'unknown',note:'未找到面向目标入学年度、可用于新生的个人经费承诺。学院任职、研究项目和社会影响不等同于可分配学生奖学金。',url,checked,cycle:''});
  const defaults = {
    paths:['phd'],eligibility:'unknown',funding:'unknown',admission:'unknown',checked,color:'sage',
    eligibilityNote:'仅核实研究身份与公开资料；本科直博、先修课程、学位等同性和语言要求仍须查对应年度项目。',
    fundingNote:'未核实对应博士项目的正式资助条款；项目资金包、竞争奖学金及导师个人经费分别判断。',
    admissionNote:'未确认目标入学年度的个人名额；大学教职不保证能作为你所申请项目的主导师。'
  };
  const marya='https://www.sbs.ox.ac.uk/about-us/people/marya-besharov';
  const ethan='https://mgmt.wharton.upenn.edu/profile/emollick/';
  const rana='https://www.hks.harvard.edu/faculty/rana-mitter';
  const catherine='https://profiles.sydney.edu.au/catherine.driscoll';
  const tania='https://www.lse.ac.uk/people/tania-burchardt';
  const taniaOlder='https://tertiary.outweb.lse.ac.uk/social-policy/people/academic-staff/Dr-Tania-Burchardt';
  const jennifer='https://www.demography.ox.ac.uk/people/jennifer-beam-dowd';
  return [
    {
      ...defaults,id:'marya-besharov',name:'Marya Besharov',initials:'MB',university:'University of Oxford',universityZh:'牛津大学',country:'UK',
      department:'Saïd Business School · Organisations and Impact',discipline:'管理学',topics:['sociology','development','climate'],methods:['qual'],
      keywords:['组织理论','社会创新','社会企业','领导力','混合组织','组织影响','organisation theory','social innovation','hybrid organisations','leadership','social impact'],
      summary:'研究组织如何处理社会使命与财务目标之间的张力，关注领导力、社会创新与混合组织。',
      fitNote:'官网明确列有质性研究方法。适合组织研究与社会影响课题；“可持续”主题并不自动等于环境经济学方法匹配。',
      program:'Oxford Saïd · DPhil Management 入口与具体指导安排待确认',
      contact:{email:'marya.besharov@sbs.ox.ac.uk',url:marya,office:'Saïd Business School, Park End Street, Oxford OX1 1HP',checked},
      students:students(marya),personalFunding:funding(marya),
      publications:[
        publication('Thinking in Systems: From Ceremonial to Meaningful Use of Systems Perspectives in Organization and Management Research',2025,'article','Academy of Management Annals','https://doi.org/10.5465/annals.2022.0081',marya,'2025-07-01'),
        publication('Monetary impact valuation for sustainable business',2025,'article','Nature Sustainability','https://doi.org/10.1038/s41893-025-01630-9',marya,'2025-09-18')
      ],
      pubCoverage:{status:'selected',note:'大学个人页列出的两篇 2025 年合著论文；日期采用该页书目记录，非近三年完整清单。',url:marya,checked},
      sources:[source('身份、联系与研究方法','Oxford Saïd · Marya Besharov',marya,'官方教职、公开邮箱、质性研究专长及研究方向。'),source('近三年成果','Oxford Saïd · Publications',marya,'个人页列出论文标题、作者、年份、日期及 DOI。')]
    },
    {
      ...defaults,id:'ethan-mollick',name:'Ethan Mollick',initials:'EM',university:'University of Pennsylvania',universityZh:'宾夕法尼亚大学',country:'US',color:'blue',
      department:'Wharton School · Management / Generative AI Labs',discipline:'商学',topics:['technology','education','digital','development'],methods:[],
      keywords:['人工智能','创业','商业创新','教育模拟','工作','AI','entrepreneurship','innovation','education','generative AI','business'],
      summary:'研究人工智能对工作、创业和教育的影响，并参与生成式 AI 教学工具的设计与研究。',
      fitNote:'商学与管理、教育科技存在交叉。选列成果包含预印本与面向公众的著作，不将它们冒充同行评审论文。',
      program:'Wharton 博士项目、主导师资格与目标年度指导容量待确认',
      contact:{email:'emollick@wharton.upenn.edu',url:ethan,office:'2026 SH-DH, 3620 Locust Walk, Philadelphia, PA 19104',checked},
      students:students(ethan),personalFunding:funding(ethan),
      publications:[
        publication('AI Agents and Education: Simulated Practice at Scale',2024,'preprint','arXiv · 作者提交的研究预印本','https://arxiv.org/abs/2407.12796','https://arxiv.org/abs/2407.12796','2024-06-20'),
        publication('Co-Intelligence: Living and Working with AI',2024,'book','Penguin Portfolio · 面向公众的商业与 AI 著作',ethan,ethan)
      ],
      pubCoverage:{status:'selected',note:'Wharton 个人页与作者预印本原始记录中的 2024 年成果选列。书籍为商业与 AI 通识著作，预印本不表示已经同行评审；非完整论文清单。',url:ethan,checked},
      sources:[source('身份与联系','Wharton Management · Ethan Mollick',ethan,'大学公开教职、邮箱、办公室与研究主题。'),source('研究预印本','arXiv · AI Agents and Education','https://arxiv.org/abs/2407.12796','作者、题名及 2024-06-20 的提交记录；按预印本分类。'),source('近年书籍','Wharton · Co-Intelligence',ethan,'官方个人书目明确列为 2024 年书籍，不归为期刊论文。')]
    },
    {
      ...defaults,id:'rana-mitter',name:'Rana Mitter',initials:'RM',university:'Harvard University',universityZh:'哈佛大学',country:'US',color:'sand',
      department:'Harvard Kennedy School · U.S.–Asia Relations / History affiliated faculty',discipline:'区域研究',topics:['history','competition','ipe'],methods:[],
      keywords:['中国研究','现代中国史','战争记忆','国家与无国籍','亚洲研究','China studies','modern Chinese history','war memory','Asia','statelessness'],
      summary:'以现代中国史和战争记忆为基础研究中国与世界的关系，任职美国—亚洲关系领域。',
      fitNote:'适合中国与亚洲区域研究、历史及政治交叉课题。HKS 任职和 History affiliated faculty 不自动确立某一博士项目的主导师资格。',
      program:'Harvard 相关博士项目入口及跨院指导安排须分别确认',
      contact:{email:'ranamitter@hks.harvard.edu',url:'https://history.fas.harvard.edu/people/rana-mitter',office:'Harvard Kennedy School；公开助理联系与电话见官方主页。',checked},
      students:students(rana),
      personalFunding:{status:'grant',note:'HKS 个人页列出 2024 年及 2025 年播客项目的外部资助。其用途为项目活动，并未声明有博士生奖学金、剩余预算或可招收的资助名额。',url:rana,checked,cycle:'2024-10、2025-09 的公开项目资助记录；非学生资金承诺'},
      publications:[
        publication('Open or closed? China’s dilemmas in a changing geopolitical and geoeconomic order',2024,'article','Oxford Review of Economic Policy 40(2), 366–373','https://www.hks.harvard.edu/publications/open-or-closed-chinas-dilemmas-changing-geopolitical-and-geoeconomic-order',rana),
        publication('War, memory, the state, and statelessness in China',2025,'chapter','Statelessness after Arendt · Manchester University Press',rana,rana)
      ],
      pubCoverage:{status:'selected',note:'HKS Selected Publications 中选列 2024 年学术论文与 2025 年书章，未混入书评或报刊评论；非完整清单。',url:rana,checked},
      sources:[source('身份、论文与项目资助','Harvard Kennedy School · Rana Mitter',rana,'官方研究简介、Selected Publications 与外部 sponsored projects；资助用途不等同学生经费。'),source('公开联系与院系身份','Harvard History · Rana Mitter','https://history.fas.harvard.edu/people/rana-mitter','历史系 affiliated faculty 页面提供完整公开邮箱。'),source('2024 年期刊论文','HKS · Open or closed?','https://www.hks.harvard.edu/publications/open-or-closed-chinas-dilemmas-changing-geopolitical-and-geoeconomic-order','大学单篇成果页确认标题、作者和 2024 年记录。')]
    },
    {
      ...defaults,id:'catherine-driscoll',name:'Catherine Driscoll',initials:'CD',university:'University of Sydney',universityZh:'悉尼大学',country:'AU',color:'plum',
      department:'School of Humanities · Gender and Cultural Studies',discipline:'文化研究',topics:['gender','media','literature','sociology'],methods:[],
      keywords:['文化研究','性别研究','男孩研究','表征与身份','日常生活','cultural studies','gender studies','boys studies','representation','identity','everyday life'],
      summary:'研究性别、文化理论、媒体文化和日常生活，近期合作成果讨论男孩研究与女性主义。',
      fitNote:'大学目录列有 Research supervision 可用性，但不是对特定入学年度名额的保证。书目须区分卷期年份与实际在线出版年份。',
      admission:'areas',admissionNote:'官方资料把 Research supervision 列为可合作事项；未确认具体年度、学生人数或资助名额。',
      program:'Sydney Gender and Cultural Studies / Humanities 研究学位入口待核实',
      contact:{email:'catherine.driscoll@sydney.edu.au',url:catherine,office:'School of Humanities, Faculty of Arts and Social Sciences',checked},
      students:students(catherine),
      personalFunding:{status:'unknown',note:'大学项目页列有 Australian Boys: Beyond the Boy Problem（2021–2025），公开周期已结束；不能据此推定目标年度仍有个人经费或学生奖学金。',url:'https://www.sydney.edu.au/arts/our-research/research-areas/humanities/sydney-public-humanities.html',checked,cycle:'该公开 ARC 项目记录：2021-03-02 至 2025-04-30'},
      publications:[
        publication('Transforming Boys Studies: Between Risk and Empathy',2025,'article','Australian Feminist Studies 39(119–120), 1–11 · 特刊导论','https://doi.org/10.1080/08164649.2025.2482472','https://www.tandfonline.com/doi/pdf/10.1080/08164649.2025.2482472')
      ],
      pubCoverage:{status:'selected',note:'选列出版商原始 PDF 确认的合著特刊导论，文档标示 ©2025，卷期标为 2024，故按在线版权版本年份 2025 记录，未补造日期；不是完整论文清单。',url:'https://www.tandfonline.com/doi/pdf/10.1080/08164649.2025.2482472',checked},
      sources:[source('身份、联系与研究领域','Sydney · Catherine Driscoll',catherine,'官方学者页提供公开邮箱、文化研究领域与 Research supervision 可用性。'),source('在职院系','Sydney · Gender and Cultural Studies','https://www.sydney.edu.au/arts/schools/school-of-humanities/gender-and-cultural-studies.html','大学当前学术人员名单。'),source('原始成果与年份说明','Taylor & Francis · Transforming Boys Studies','https://www.tandfonline.com/doi/pdf/10.1080/08164649.2025.2482472','原始 PDF 明确作者、题名、卷期与版权年份；属于特刊导论。'),source('公开项目周期','Sydney · Public Humanities','https://www.sydney.edu.au/arts/our-research/research-areas/humanities/sydney-public-humanities.html','列有 Australian Boys 项目及结束日期，不当作在招学生经费。')]
    },
    {
      ...defaults,id:'tania-burchardt',name:'Tania Burchardt',initials:'TB',university:'London School of Economics and Political Science',universityZh:'伦敦政治经济学院',country:'UK',color:'rose',
      department:'Department of Social Policy / CASE',discipline:'社会政策',topics:['development','sociology','gender'],methods:[],
      keywords:['社会政策','能力方法','不平等','照护','福利政策','贫困','social policy','capability approach','inequality','care','welfare policy','poverty'],
      summary:'研究不平等、能力方法与福利政策，近期关注照护的社会风险和儿童物质匮乏。',
      fitNote:'适合社会政策、照护及不平等研究。官网明确说明目前接收新博士的容量有限，需先确认具体年度与课题安排。',
      admission:'areas',admissionNote:'LSE 官网明确列有博士指导领域，同时说明目前接收新 PhD 的容量有限；不标为明确开放名额。',
      program:'LSE MPhil / PhD Social Policy；目标年度资格与容量待确认',paths:['phd','mphil'],
      contact:{email:'t.burchardt@lse.ac.uk',url:tania,office:'St Clements, S409；会面时间与预约方式见官方页。',checked},
      students:{...students(tania),note:'官网确认指导 Social Policy 博士，但未在本轮核实逐人入学年、入学背景和本科研究指导名单。当前容量有限须单独询问。'},
      personalFunding:{status:'grant',note:'LSE 个人页说明参与 Extreme Wealth Line、Children’s Information Project 等有资助研究。未公开确认可用于新博士的个人奖学金或剩余经费。',url:tania,checked,cycle:'官网列作当前研究；学生经费及预算余额未公布'},
      publications:[
        publication('Determinants of the social risk of caring',2025,'article','International Journal of Care and Caring','https://doi.org/10.1332/23978821Y2025D000000120','https://eprints.lse.ac.uk/127467/3/ijcc-article-10.1332-23978821Y2025D000000120.pdf','2025-06-04'),
        publication('Living Arrangements, Intra-Household Inequality and Children’s Deprivation: Evidence from EU-SILC',2024,'article','Child Indicators Research 17, 2319–2359','https://doi.org/10.1007/s12187-024-10149-y','https://link.springer.com/article/10.1007/s12187-024-10149-y','2024-06-14')
      ],
      pubCoverage:{status:'selected',note:'大学机构库及出版商确认的两篇合著/独著研究论文，非完整清单。排除仅因卷期为 2024、但首次在线已在 2022 年的旧条目。',url:taniaOlder,checked},
      sources:[source('身份、公开联系及容量限制','LSE · Tania Burchardt',tania,'最新官方页列为 Social Policy 教授，明确说明目前接收新博士容量有限。'),source('近三年论文原稿','LSE Research Online · Caring','https://eprints.lse.ac.uk/127467/3/ijcc-article-10.1332-23978821Y2025D000000120.pdf','大学保存的论文原稿列明 2025-06-04 首次在线发表。'),source('近三年出版商记录','Springer · Children’s deprivation','https://link.springer.com/article/10.1007/s12187-024-10149-y','作者、题名及 2024-06-14 在线发表记录。')]
    },
    {
      ...defaults,id:'jennifer-beam-dowd',name:'Jennifer Beam Dowd',initials:'JD',university:'University of Oxford',universityZh:'牛津大学',country:'UK',color:'moss',
      department:'Leverhulme Centre for Demographic Science · Demography and Population Health',discipline:'其他人文社科',topics:['sociology','methods','development'],methods:['quant'],
      keywords:['人口学','人口健康','死亡率','寿命','生命历程','健康不平等','demography','population health','mortality','life expectancy','life course','health inequality'],
      summary:'结合人口学、经济学和流行病学训练，定量研究生命历程、健康不平等及寿命变化。',
      fitNote:'归入其他人文社科中的人口学，而不是临床医学。需要核对人口学或相关社会科学博士项目的统计训练与正式入口。',
      program:'Oxford 人口学 / 社会科学相关博士入口及主导师资格待确认',
      contact:{email:'jennifer.dowd@demography.ox.ac.uk',url:jennifer,office:'Leverhulme Centre for Demographic Science, University of Oxford',checked},
      students:students(jennifer),
      personalFunding:{status:'grant',note:'大学简介明确列其担任 ERC MORTAL 项目负责人，并提及 NIH 等研究资助；没有公开确认可给目标年度新生的资助名额或剩余学生预算。',url:jennifer,checked,cycle:'官网当前项目说明；未公布新生经费承诺'},
      publications:[
        publication('Midlife health in Britain and the United States: a comparison of two nationally representative cohorts',2024,'article','International Journal of Epidemiology 53(5), dyae127','https://doi.org/10.1093/ije/dyae127',jennifer,'2024-08-14'),
        publication('The generational health drift: A systematic review of evidence from the British birth cohort studies',2026,'article','Population Studies · 综述论文','https://doi.org/10.1080/00324728.2026.2652038',jennifer,'2026-05-21')
      ],
      pubCoverage:{status:'selected',note:'大学中心公开书目选列两篇近三年论文，均含明确书目日期；第二篇为综述。非完整清单，不由研究中心成员推断指导关系。',url:jennifer,checked},
      sources:[source('身份、联系、方法与项目','Oxford LCDS · Jennifer Beam Dowd',jennifer,'大学中心页面提供公开邮箱、定量研究身份、当前项目及逐条成果书目。'),source('2026 年论文原始记录','Population Studies · Generational health drift','https://www.tandfonline.com/doi/pdf/10.1080/00324728.2026.2652038','出版商原始论文确认作者 Jennifer B. Dowd、标题及综述类型。')]
    }
  ];
})();
