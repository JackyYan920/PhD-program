/* Additional humanities and applied-social-science candidates.
 * Checked 2026-11-08. Public professional contacts; selected outputs only.
 * Unpublished student/funding information remains unknown, never inferred absent. */
globalThis.COMPASS_MORE_B = (() => {
  const checked='2026-11-08';
  const source=(type,title,url,note)=>({type,title,url,note});
  const pub=(title,year,type,venue,url,sourceUrl,date='')=>({title,year,type,venue,url,sourceUrl,date,checked});
  const students=(url,note='本轮未建立可核实指导关系、入学年份与背景的近期具名学生名单。未公开不代表没有学生；本科授课不等于本科研究指导，也不能推断本科直博。')=>({status:'unknown',undergrad:'unknown',bachelorEntrants:'unknown',note,url,checked,records:[]});
  const funding=url=>({status:'unknown',note:'未发现当前可分配给新研究生的个人资金、资助名额及覆盖范围承诺。学校任职、既往奖项或项目存在不能替代新生 funding 证明。',url,checked,cycle:''});
  const defaults={color:'sage',paths:['phd'],eligibility:'unknown',funding:'unknown',admission:'unknown',checked,eligibilityNote:'尚未核实目标年度项目的本科直博资格、先修要求或研究训练条件。',fundingNote:'尚未核实具体项目的学费、生活津贴与国际生资助政策。',admissionNote:'未确认目标年度是否仍有指导名额；在职或曾指导博士不等于当前可接收。'};
  const kecia='https://www.bu.edu/religion/faculty/kecia-ali/';
  const claire='https://www.gc.cuny.edu/people/claire-bishop';
  const kate='https://www.kcl.ac.uk/people/dr-kate-mcmillan';
  const kateWork='https://www.kcl.ac.uk/news/exhibition-brings-a-haunting-exploration-of-colonial-violence-to-the-strand';
  const eric='https://experts.utexas.edu/eric_drott';
  const ericBook='https://www.jstor.org/stable/jj.12011267';
  const ungar='https://www.dal.ca/faculty/health/socialwork/faculty-staff/our-faculty/michael-ungar.html';
  const chirag='https://ischool.uw.edu/people/faculty/profile/chirags';
  return [
    {
      ...defaults,id:'kecia-ali',name:'Kecia Ali',initials:'KA',university:'Boston University',universityZh:'波士顿大学',country:'US',department:'Department of Religion',discipline:'宗教学',
      topics:['religion','gender','law','history'],methods:['theory'],keywords:['伊斯兰研究','宗教伦理','性别','宗教法','传记','Islamic studies','gender','ethics','Islamic law','biography'],
      summary:'研究伊斯兰法、女性与性别、伦理和传记，也关注学术界性别与引证政治。',
      fitNote:'适合宗教学、伊斯兰研究和性别伦理的理论或历史研究；需要结合目标项目与研究语言核对。',
      program:'Religion 博士项目（具体研究领域、资格与当年指导容量待确认）',
      contact:{email:'ka@bu.edu',url:kecia,office:'Department of Religion（大学官方教员页）',checked},
      students:students(kecia),personalFunding:funding(kecia),
      publications:[pub('The Woman Question in Islamic Studies',2024,'book','Princeton University Press · 专著', 'https://doi.org/10.1515/9780691263748',kecia)],
      pubCoverage:{status:'selected',note:'选列大学教员页明确标示的 2024 年专著，未据此声称完整三年论文目录。仅确认出版年份，不补造月日。',url:kecia,checked},
      sources:[source('身份、研究与邮箱','Boston University Religion · Kecia Ali',kecia,'官网列其为宗教与伊斯兰研究教授、研究生项目负责人，并提供邮箱及 2024 年新书。'),source('专著书目','Princeton University Press / DOI','https://doi.org/10.1515/9780691263748','出版方 DOI 书目确认作者、题名及 2024 年出版。')]
    },
    {
      ...defaults,id:'claire-bishop',name:'Claire Bishop',initials:'CB',university:'City University of New York Graduate Center',universityZh:'纽约市立大学研究生中心',country:'US',department:'Art History · Presidential Professor',discipline:'艺术史',
      topics:['art','history','media'],methods:['theory'],keywords:['当代艺术','行为艺术','展览史','艺术政治','观众研究','去殖民理论','contemporary art','performance art','exhibition history','spectatorship','postcolonial theory'],
      summary:'研究当代艺术、行为艺术、展览史与艺术政治，关注数字媒介条件下的观看和注意力。',
      fitNote:'适合艺术史、展览与当代艺术理论研究；艺术实践型博士入口需另核实。',
      program:'Art History PhD（当年项目资格、指导安排及资金待确认）',
      contact:{email:'cbishop@gc.cuny.edu',url:claire,office:'CUNY Graduate Center · Art History',checked},
      students:students(claire),personalFunding:funding(claire),
      publications:[
        pub('Disordered Attention: How We Look at Art and Performance Today',2024,'book','Verso · 专著',claire,claire),
        pub('Merce Cunningham’s Events: Key Concepts',2024,'book','Koenig Buchhandlung · 专著',claire,claire)
      ],
      pubCoverage:{status:'selected',note:'大学教员页明确列出的两部 2024 年著作；非全部论文清单。2024 Guggenheim Fellowship 不据此标为 2026 年新生可用资金。',url:claire,checked},
      sources:[source('身份、研究、联系与著作','CUNY Graduate Center · Claire Bishop',claire,'大学页列出 Presidential Professor、工作邮箱、研究兴趣及两部 2024 年著作。')]
    },
    {
      ...defaults,id:'kate-mcmillan',name:'Kate McMillan',initials:'KM',university:"King’s College London",universityZh:'伦敦国王学院',country:'UK',department:'Culture, Media and Creative Industries · Reader in Creative Practice',discipline:'艺术学',
      topics:['art','gender','media','history'],methods:['qual','theory'],keywords:['艺术实践','艺术研究方法','性别不平等','殖民记忆','声音装置','creative practice','arts-based research','gender inequality','colonialism','listening practices'],
      summary:'视觉艺术与创作实践研究者，以声音、影像及装置探索殖民记忆、女性历史与艺术界性别不平等。',
      fitNote:'官网明确列有创作实践、艺术研究方法与全球南方艺术等博士指导经验；项目需确认是否接纳实践型研究及作品集。',
      program:'Culture, Media and Creative Industries 研究学位（实践型路径、作品集及资格待确认）',
      contact:{email:'kate.mcmillan@kcl.ac.uk',url:kate,office:'Department of Culture, Media and Creative Industries',checked},
      students:students(kate,'官网列出已指导博士课题的领域，但未在本轮来源提供具名近期学生及入学年份。指导经验不等于目标年度仍有名额，本科指导及直博情况未确认。'),personalFunding:funding(kate),
      publications:[pub('The River’s Stomach (Songs of Empire)',2025,'creative','theCOLAB 委约 · 场域特定声音影像装置；创作与展演成果，非期刊论文',kateWork,kateWork,'2025-05-22')],
      pubCoverage:{status:'selected',note:'选列 2025 年大学新闻确认的艺术实践研究成果。创作/展演与学术论文分开标注；本轮没有将早于三年窗口的旧论文补作近年论文。',url:kateWork,checked},
      sources:[source('身份、联系方式与博士指导领域','King’s College London · Kate McMillan',kate,'大学页公开工作邮箱、Reader in Creative Practice 身份及具体博士指导研究领域。'),source('近年创作研究成果','King’s · The River’s Stomach',kateWork,'大学 2025-05-28 新闻确认该装置于 2025-05-22 开幕、作者与委约机构。')]
    },
    {
      ...defaults,id:'eric-drott',name:'Eric Drott',initials:'ED',university:'University of Texas at Austin',universityZh:'得克萨斯大学奥斯汀分校',country:'US',department:'Sarah and Ernest Butler School of Music',discipline:'音乐学',
      topics:['music','media','digital','ipe'],methods:['theory'],keywords:['音乐理论','音乐政治经济','音乐流媒体','音乐与抗议','数字音乐','music theory','music streaming','music and protest','genre theory','political economy of music'],
      summary:'研究当代音乐文化、音乐与抗议、流派理论及数字音乐平台的政治经济。',
      fitNote:'适合音乐学/音乐理论与媒介政治经济交叉课题；不把数字音乐研究直接等同于计算机音乐技术指导。',
      program:'Butler School of Music 研究学位（Music Theory 等入口及具体资格待确认）',
      contact:{email:'drott@mail.utexas.edu',url:eric,office:'Butler School of Music（大学公开专家目录）',checked},
      students:students(eric),personalFunding:funding(eric),
      publications:[pub('Streaming Music, Streaming Capital',2024,'book','Duke University Press · 专著',ericBook,ericBook)],
      pubCoverage:{status:'selected',note:'按 Duke University Press 出版书目及出版社授权 JSTOR 记录采用 2024 年；大学新闻正文另写 2023，存在年份差异，未将其掩盖。当前仅选列一部近年专著。',url:ericBook,checked},
      sources:[source('身份、研究与联系','UT Austin Experts · Eric Drott',eric,'大学公开目录列为 Butler School of Music 教授，提供工作邮箱和研究范围。'),source('专著出版年份','Duke University Press · Spring 2024 catalog','https://assets-us-01.kc-usercontent.com/f7ca9afb-82c2-002a-a423-84e111d5b498/11842040-ace5-4897-969b-b0777bc2b3c1/S24-catalog-web.pdf','出版社 2024 年春季书目列出该书。'),source('出版书目','Duke University Press / JSTOR · Streaming Music, Streaming Capital',ericBook,'出版方平台记录版权年为 2024。'),source('研究内容与年份差异','UT Austin Fine Arts · Book Q&A','https://finearts.utexas.edu/news/qa-professor-eric-drott-examines-how-streaming-music-has-transformed-business-making','2024 年新闻说明研究内容，正文将该书列为 2023，故单独保留差异。')]
    },
    {
      ...defaults,id:'michael-ungar',name:'Michael Ungar',initials:'MU',university:'Dalhousie University',universityZh:'达尔豪斯大学',country:'CA',department:'School of Social Work · Professor',discipline:'社会工作',
      topics:['socialwork','psychology','development','methods'],methods:['mixed','qual'],keywords:['社会工作','复原力','儿童与青少年','家庭','生态社会工作','项目评估','resilience','child welfare','youth','family therapy','ecological social work','program evaluation'],
      summary:'以混合方法研究儿童、家庭与社区复原力，以及儿童福利、跨文化研究和社会工作项目评估。',
      fitNote:'适合社会工作、青少年与社区研究课题；临床执业或临床训练资格不可从研究领域推断。',
      program:'Social Work / 相关研究博士项目入口与指导安排待核实',
      contact:{email:'michael.ungar@dal.ca',url:ungar,office:'School of Social Work, Mona Campbell Building, Halifax',checked},
      students:students(ungar),personalFunding:funding(ungar),
      publications:[
        pub('Pathways to Homelessness and Stable Housing Among Youth in Nova Scotia Involved with Child Welfare Services: Case Studies',2026,'article','International Journal on Homelessness · 与 Kassa Maksudi 合著，online first','https://doi.org/10.5206/ijoh.2026.2.22842','https://ojs.lib.uwo.ca/index.php/ijoh/article/view/22842'),
        pub('A Guest Editorial: Turning Your Research into a Best-Seller—An Innovative Approach to Knowledge Mobilization and Becoming Newsworthy',2025,'article','Research on Social Work Practice · 客座社论；2025 提前在线、2026 卷期，非实证论文','https://doi.org/10.1177/10497315251352828','https://journals.sagepub.com/doi/full/10.1177/10497315251352828','2025-06-27')
      ],
      pubCoverage:{status:'selected',note:'选列出版商确认的两项近年成果，区分原创研究与社论。2025/2026 差异来自提前在线和正式卷期，并非两篇独立作品。',url:ungar,checked},
      sources:[source('身份、工作邮箱与方法','Dalhousie Social Work · Michael Ungar',ungar,'大学页确认教授身份、工作邮箱以及混合方法、复原力和项目评估领域。'),source('近期学术成果','International Journal on Homelessness · Case Studies','https://ojs.lib.uwo.ca/index.php/ijoh/article/view/22842','出版平台确认 2026 年文章作者、题名和 DOI。'),source('近期社论','SAGE · Knowledge Mobilization Editorial','https://journals.sagepub.com/doi/full/10.1177/10497315251352828','出版方标示 2025 年提前在线及 2026 年正式卷期。')]
    },
    {
      ...defaults,id:'chirag-shah',name:'Chirag Shah',initials:'CS',university:'University of Washington',universityZh:'华盛顿大学',country:'US',department:'Information School · Professor',discipline:'图书情报学',
      topics:['information','digital','technology','methods'],methods:['computational'],keywords:['信息检索','信息行为','推荐系统','负责任人工智能','人机协作','information retrieval','information seeking','recommendation systems','responsible AI','human-AI collaboration'],
      summary:'研究智能信息获取、检索与推荐系统、人机交互及负责任人工智能。',
      fitNote:'适合图书情报、信息科学与人机信息交互；含计算方法研究，申请者应核对方法和先修课程要求。',
      program:'Information School PhD（具体方向、先修背景及当年招生待确认）',
      contact:{email:'chirags@uw.edu',url:chirag,office:'Allen Library 193B',checked},
      students:students(chirag),personalFunding:funding(chirag),
      publications:[
        pub('Envisioning Information Access Systems: What Makes for Good Tools and a Healthy Web?',2024,'article','ACM Transactions on the Web 18(3) · 与 Emily M. Bender 合著',chirag,chirag),
        pub('From Prompt Engineering to Prompt Science with Humans in the Loop',2025,'article','Communications of the ACM 68(6), 54–61','https://doi.org/10.1145/3709599',chirag)
      ],
      pubCoverage:{status:'selected',note:'从大学公开发表目录选列两篇 2024/2025 论文。目录另含大量成果及不同版本，本轮不声称完整覆盖。',url:chirag,checked},
      sources:[source('身份、工作邮箱、研究与发表','University of Washington iSchool · Chirag Shah',chirag,'大学目录列出教授、工作邮箱、办公室、研究领域及两篇论文的书目信息。'),source('论文出版记录','ACM · From Prompt Engineering to Prompt Science','https://doi.org/10.1145/3709599','出版社 DOI 入口，供核对正式论文。')]
    }
  ];
})();
