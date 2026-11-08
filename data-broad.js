/* Cross-disciplinary starter evidence. Selected works, not exhaustive bibliographies.
 * Public professional contact only. Unknown does not mean no students or no funds.
 * Sources checked on 2026-11-08; entry dates are never inferred from graduation years. */
globalThis.COMPASS_BROAD_SEEDS = (() => {
  const checked = '2026-11-08';
  const unknownStudents = (url, note='本轮未查到可逐人核对的近期指导名单；不能据此判断没有学生。') => ({status:'unknown',undergrad:'unknown',bachelorEntrants:'unknown',note,url,checked,records:[]});
  const unknownFunding = url => ({status:'unknown',note:'未找到针对目标入学年度、可用于新生的个人经费承诺；需向导师和项目分别确认。',url,checked,cycle:''});
  const pub = (title, year, type, venue, url, sourceUrl, date='') => ({title,year,type,venue,url,sourceUrl,checked,date});
  const source = (type,title,url,note) => ({type,title,url,note});
  const defaults = {
    color:'sage',paths:['phd'],eligibility:'unknown',funding:'unknown',admission:'unknown',checked,
    eligibilityNote:'本轮仅核对研究与公开资料，具体本科背景、先修课程及直博资格仍须核对当年项目要求。',
    fundingNote:'项目层面资助政策尚未核实；与导师个人 grant 或可用学生经费分开判断。',
    admissionNote:'没有确认目标入学年度的个人名额；公开指导领域和现有学生不等于仍有空缺。'
  };
  const amia='https://www.politics.ox.ac.uk/person/amia-srinivasan';
  const amiaContact='https://philosophy.site.ox.ac.uk/people/amia-srinivasan';
  const ozan='https://www.sociology.ox.ac.uk/people/ozan-aksoy';
  const ozanPubs='https://www.nuffield.ox.ac.uk/people/profiles/ozan-aksoy/';
  const alex='https://www.uvic.ca/humanities/sllc/contact/darcy-alexandra.php';
  const alexLab='https://www.alexandradarcy.ca/';
  const alexStudents='https://www.uvic.ca/humanities/sllc/people/graduate-students/index.php';
  const nick='https://psychologicalsciences.unimelb.edu.au/research/msps-research-groups/social-personality-laboratory';
  const duflo='https://economics.mit.edu/people/faculty/esther-duflo';
  const dufloPubs=duflo+'/published-papers';
  const jill='https://jlepore.scholars.harvard.edu/';
  return [
    {
      ...defaults,id:'jill-lepore',name:'Jill Lepore',initials:'JL',university:'Harvard University',universityZh:'哈佛大学',country:'US',
      department:'Department of History / Harvard Law School',discipline:'历史学',topics:['history','law','digital'],methods:['archives','theory'],
      keywords:['美国史','历史证据','宪法史','技术史','American history','constitutional history','history of evidence','technology'],
      summary:'研究美国历史、宪法与历史证据，也关注技术如何重塑公共生活。',
      fitNote:'适合从档案、史学与法律史切入的课题；数字议题相关不等于其指导计算方法。',
      program:'History 博士项目入口与指导安排待确认（另有法学院任职）',
      contact:{email:'officeofjilllepore@law.harvard.edu',url:jill,office:'办公室公开联系邮箱，由办公室处理；非私人邮箱。',checked},
      students:unknownStudents(jill,'本轮未找到可核实入学年份及指导关系的近期学生名单。教授本科课程不等于已确认指导本科研究。'),
      personalFunding:unknownFunding(jill),
      publications:[
        pub('We the People: A History of the U.S. Constitution',2025,'book','Liveright · 学术著作',jill,'https://1776.history.fas.harvard.edu/'),
        pub('The Rise and Fall of the Artificial State',2026,'book','Liveright · 学术著作','https://current.fas.harvard.edu/stories/jill-lepore-history-dangers-artificial-state','https://guides.library.harvard.edu/books/ai','2026-08-25')
      ],
      pubCoverage:{status:'selected',note:'近三年著作选列；人文学科包含学术专著。非全部论文。第一本按 Harvard 项目书目与作者简介的 2025 年初版记录，作者主页自动书目也出现 2026 年，版本须核对。',url:jill,checked},
      sources:[
        source('身份与联系','Harvard · Jill Lepore',jill,'大学托管个人主页及办公室联系邮箱。'),
        source('著作年份','Harvard in 1776 · 书目','https://1776.history.fas.harvard.edu/','列出 We the People 的 2025 年版本。'),
        source('近三年著作','Harvard FAS · Artificial State','https://current.fas.harvard.edu/stories/jill-lepore-history-dangers-artificial-state','大学新闻确认 2026 年新书及研究主题。'),
        source('出版日期','Harvard Library · AI books','https://guides.library.harvard.edu/books/ai','图书馆书目记录 Artificial State 出版日期。')
      ]
    },
    {
      ...defaults,id:'amia-srinivasan',name:'Amia Srinivasan',initials:'AS',university:'University of Oxford',universityZh:'牛津大学',country:'UK',
      department:'Faculty of Philosophy / All Souls College / DPIR',discipline:'哲学',topics:['philosophy','gender','history'],methods:['theory'],
      keywords:['认识论','女性主义哲学','政治哲学','伦理学','epistemology','feminist theory','political philosophy','ethics'],
      summary:'研究认识论、政治哲学、女性主义与哲学的方法问题。',
      fitNote:'研究主题适合哲学或政治理论路径；跨院指导需按实际申请项目确认。',
      paths:['phd','mphil'],program:'Oxford MPhil / DPhil（Philosophy 或 Politics 具体入口须确认）',
      contact:{email:'amia.srinivasan@philosophy.ox.ac.uk',url:amiaContact,office:'All Souls College',checked},
      students:{status:'listed',undergrad:'unknown',bachelorEntrants:'unknown',note:'院系公开确认一位 DPhil 共同指导学生。学生已有 MPhil 等研究生背景；不据此推断本科直博案例。没有核实招生年份。',url:'https://www.politics.ox.ac.uk/person/simple-rajrah',checked,records:[
        {name:'Simple Rajrah',degree:'DPhil Politics',startYear:'',endYear:'',background:'公开简介列有 Oxford MPhil、JNU 研究生学位及 Delhi 政治学荣誉学士。',relation:'与 Sophie Smith 共同指导（官网列出的 supervisor）',url:'https://www.politics.ox.ac.uk/person/simple-rajrah',checked}
      ]},
      personalFunding:unknownFunding(amia),
      publications:[
        pub('Whistling a Thin Tune: Williams, Wittgenstein and Genealogical Anxiety',2026,'article','Philosophy 101(2), 391–426','https://doi.org/10.1017/S0031819126101351',amia),
        pub('The Aptness of Anger: Amia Srinivasan Interviewed by Stephen Law',2026,'article','Think 24(71), 5–10 · 哲学访谈','https://doi.org/10.1017/s1477175625100742',amia)
      ],
      pubCoverage:{status:'selected',note:'从大学公开书目选列近三年条目，含一篇哲学访谈，非完整研究论文清单；只核实年份，不补造月份。',url:amia,checked},
      sources:[
        source('身份与联系','Oxford Philosophy · Amia Srinivasan',amiaContact,'官方研究领域及公开邮箱。'),
        source('指导与论文','Oxford DPIR · Amia Srinivasan',amia,'列有 MPhil / DPhil 指导范围与近年书目。'),
        source('学生与关系','Oxford DPIR · Simple Rajrah','https://www.politics.ox.ac.uk/person/simple-rajrah','学生页明确列出共同导师及学历背景；无准确入学年。')
      ]
    },
    {
      ...defaults,id:'ozan-aksoy',name:'Ozan Aksoy',initials:'OA',university:'University of Oxford',universityZh:'牛津大学',country:'UK',
      department:'Department of Sociology / Nuffield College',discipline:'社会学',topics:['sociology','gender','methods'],methods:['quant','experimental','computational','theory'],
      keywords:['合作','信任','宗教','社会规范','cooperation','trust','religion','social norms','game theory'],
      summary:'以博弈论、统计及实验方法研究合作、信任、宗教行为与社会规范。',
      fitNote:'适合定量、实验或机制解释取向；学科标签相同仍需核对具体研究问题。',
      program:'Sociology DPhil 入口及目标年度导师容量待确认',
      contact:{email:'ozan.aksoy@sociology.ox.ac.uk',url:ozan,office:'Nuffield College, Oxford OX1 1NF',checked},
      students:unknownStudents(ozan,'大学简介表示愿指导相关博士研究，但本轮未核实具名近期学生及本科研究指导记录。'),
      personalFunding:{status:'grant',note:'资助方公开列出 2024–2027 研究项目；这不是已开放博士奖学金或可给新生的个人资助承诺。',url:'https://www.nuffieldfoundation.org/project/evaluating-the-fundamental-british-values-initiative-of-the-dfe',checked,cycle:'2024-10 至 2027-09'},
      publications:[
        pub('Making Sense of Honor Killings',2025,'article','American Sociological Review 90(3), 427–454','https://doi.org/10.1177/00031224251324504','https://journals.sagepub.com/toc/asra/90/3','2025-04-11'),
        pub('Religious markers reduce perceived trustworthiness in a Muslim-majority country',2026,'article','Proceedings of the National Academy of Sciences 123(7)','https://doi.org/10.1073/pnas.2512131123',ozanPubs),
        pub('Standards in sociology: A position statement at the 25th anniversary of the European Academy of Sociology',2026,'article','Rationality and Society 38(2), 267–280','https://doi.org/10.1177/10434631261444988','https://journals.sagepub.com/doi/10.1177/10434631261444988','2026-04-22')
      ],
      pubCoverage:{status:'selected',note:'大学书目与出版商页面中的近三年论文选列，非完整清单。',url:ozanPubs,checked},
      sources:[
        source('身份与指导领域','Oxford Sociology · Ozan Aksoy',ozan,'公开邮箱、方法与拟指导方向。'),
        source('论文','Nuffield College · Ozan Aksoy',ozanPubs,'学院书目列有 2025 与 2026 年论文。'),
        source('在研项目','Nuffield Foundation · FBV project','https://www.nuffieldfoundation.org/project/evaluating-the-fundamental-british-values-initiative-of-the-dfe','2024–2027 在研项目，不代表博士奖学金。')
      ]
    },
    {
      ...defaults,id:'alexandra-darcy',name:'Alexandra D’Arcy',initials:'AD',university:'University of Victoria',universityZh:'维多利亚大学',country:'CA',
      department:'School of Languages, Linguistics and Cultures',discipline:'语言学',topics:['linguistics','history','digital'],methods:['quant','archives'],
      keywords:['社会语言学','语言变异','历时语言学','语用学','sociolinguistics','language variation','diachronic linguistics','discourse pragmatics'],
      summary:'研究英语变异与变化，结合历时和共时语料，也讨论语言研究伦理。',
      fitNote:'适合社会语言学、历史语料与语言变异课题。实验室有本科参与者，不表示本科直博政策已确认。',
      program:'Linguistics 研究学位项目及博士入口待核实',
      contact:{email:'adarcy@uvic.ca',url:alex,office:'MWB A109（学院公开目录）',checked},
      students:{status:'listed',undergrad:'yes',bachelorEntrants:'unknown',note:'官网链接的个人研究页说明实验室包含本科生，但未提供其姓名；院系列出当前及近年毕业研究生。毕业年份不是入学年份，有学士学历也不等于证实直博。',url:alexLab,checked,records:[
        {name:'Ruby Arkoh',degree:'PhD',startYear:'',endYear:'',background:'本轮未核实入学前背景。',relation:'与 Sonja Lanehart 共同指导（大学当前学生名单）',url:alexStudents,checked},
        {name:'Lillian Abells',degree:'MA Linguistics',startYear:'',endYear:'',background:'大学简介列有 CalPoly San Luis Obispo 英语学士、语言学辅修。',relation:'导师（大学当前学生名单）',url:alexStudents,checked},
        {name:'Jamie Buckley',degree:'MA',startYear:'',endYear:'2025',background:'未公开核实入学背景；2025 为大学所列毕业年。',relation:'导师（大学近年毕业生名单）',url:alexStudents,checked}
      ]},
      personalFunding:unknownFunding(alex),
      publications:[
        pub('A Welcome and a Thank You',2024,'article','Journal of English Linguistics 52(1), 3 · 期刊社论（非实证论文）','https://doi.org/10.1177/00754242231226391','https://journals.sagepub.com/doi/full/10.1177/00754242231226391','2024-02-05'),
        pub('IRBs, Researchers, and Social Media as (Socio)linguistic Field Sites',2025,'chapter','Dimensions of Linguistic Variation · Oxford University Press','https://doi.org/10.1093/oso/9780197533499.003.0003','https://academic.oup.com/book/59713/chapter-abstract/507059668','2025-03-20')
      ],
      pubCoverage:{status:'selected',note:'近三年选列一篇书章及一篇社论，不代表完整论文清单。已排除出版社于 2026 年迁移上线但原刊于 2021 年的旧论文。',url:alex,checked},
      sources:[
        source('身份与联系','UVic · Alexandra D’Arcy',alex,'官方目录提供研究领域、办公室及公开邮箱。'),
        source('实验室与本科参与','Alexandra D’Arcy · 官方链接个人页',alexLab,'大学资料页链接的研究者个人网站，说明本科及研究生参与实验室。'),
        source('学生名单','UVic · Graduate students',alexStudents,'当前指导关系及 2025 年硕士毕业记录。'),
        source('近三年书章','Oxford Academic · Linguistic Field Sites','https://academic.oup.com/book/59713/chapter-abstract/507059668','出版商确认作者与 2025 年出版日期。')
      ]
    },
    {
      ...defaults,id:'nick-haslam',name:'Nick Haslam',initials:'NH',university:'University of Melbourne',universityZh:'墨尔本大学',country:'AU',
      department:'Melbourne School of Psychological Sciences',discipline:'心理学',topics:['psychology','linguistics','digital'],methods:['experimental','computational','quant'],
      keywords:['社会心理学','概念扩张','心理健康概念','语义变化','concept creep','social psychology','semantic change','dehumanization'],
      summary:'研究社会与人格心理学、心理健康概念变化，并使用实验与自然语言处理方法。',
      fitNote:'适合心理学与计算社会科学、语言学交叉问题；项目的心理学先修资格需要单独确认。',
      program:'Psychological Sciences / 跨学院博士入口待确认',
      contact:{email:'nhaslam@unimelb.edu.au',url:nick,office:'Melbourne School of Psychological Sciences；公开电话 +61 3 8344 6379',checked},
      students:{status:'listed',undergrad:'unknown',bachelorEntrants:'unknown',note:'实验室列有博士成员；Jemima Kang 的大学个人页明确共同指导关系，未列招生年份。没有确认本科研究学生或本科直博案例。',url:'https://cis.unimelb.edu.au/people/graduate-researchers/artificial-intelligence/jemima-kang',checked,records:[
        {name:'Jemima Kang',degree:'PhD（研究生研究者）',startYear:'',endYear:'',background:'本轮未核实入学前学位。',relation:'与 Mike Conway 共同指导（大学研究者页）',url:'https://cis.unimelb.edu.au/people/graduate-researchers/artificial-intelligence/jemima-kang',checked}
      ]},
      personalFunding:{status:'grant',note:'实验室官网列有 ARC Discovery Projects DP250102690 与 DP260104296 的研究支持；是否留有国际博士生津贴与学费预算未说明。',url:nick,checked,cycle:'官网列为当前研究支持；未公布个人可支配余额或学生名额'},
      publications:[
        pub('What should we call mental ill health? Historical shifts in the popularity of generic terms',2024,'article','PLOS Mental Health 1(1), e0000032','https://doi.org/10.1371/journal.pmen.0000032','https://journals.plos.org/mentalhealth/article?id=10.1371/journal.pmen.0000032','2024-06-04'),
        pub('Public awareness of mental illness: Mental health literacy or concept creep?',2024,'article','Australasian Psychiatry · 2024 在线版本','https://doi.org/10.1177/10398562241292202','https://minerva-access.unimelb.edu.au/server/api/core/bitstreams/1b1f7427-ab8f-45bd-8179-a0e2dde7193c/content'),
        pub('Concept Creep and the Mental Health Crisis',2026,'article','Social Issues and Policy Review','https://minerva-access.unimelb.edu.au/server/api/core/bitstreams/10439ac7-cd25-4a18-b24e-0a5fc88eda54/content','https://minerva-access.unimelb.edu.au/server/api/core/bitstreams/10439ac7-cd25-4a18-b24e-0a5fc88eda54/content')
      ],
      pubCoverage:{status:'selected',note:'从出版商与大学机构库选列近三年论文；2024 条目按公开在线稿年份，未假定最终卷期。非完整清单。',url:nick,checked},
      sources:[
        source('身份、研究与项目支持','Melbourne · Social/Personality Laboratory',nick,'实验室主任、联系邮箱、研究方法、成员及 ARC 项目支持。'),
        source('学生与共同指导','Melbourne · Jemima Kang','https://cis.unimelb.edu.au/people/graduate-researchers/artificial-intelligence/jemima-kang','官方研究生页明确列出两位导师。'),
        source('论文原始记录','PLOS · Mental ill health terminology','https://journals.plos.org/mentalhealth/article?id=10.1371/journal.pmen.0000032','出版商作者与 2024 年在线出版记录。')
      ]
    },
    {
      ...defaults,id:'esther-duflo',name:'Esther Duflo',initials:'ED',university:'Massachusetts Institute of Technology',universityZh:'麻省理工学院',country:'US',
      department:'Economics / J-PAL（另有 University of Zurich 任职）',discipline:'经济学',topics:['economics','development','education','methods'],methods:['quant','experimental'],
      keywords:['发展经济学','反贫困','政策评估','教育','随机实验','development economics','poverty','policy evaluation','education','randomized trials'],
      summary:'通过实地实验与计量分析研究减贫、教育和社会政策，公开资料同时列有 Zurich 任职。',
      fitNote:'适合发展经济学、教育政策与实验评估课题；计量及数学准备、实际申请机构与指导容量须核对。',
      program:'Economics 博士入口待确认（MIT / Zurich 任职与指导安排需分别核实）',
      contact:{email:'eduflo@mit.edu',url:duflo,office:'MIT E52-300；公开助理联系 Heather McCurdy（见官网）',checked},
      students:unknownStudents(duflo,'本轮未核对可明确归属近年招收或指导的具名学生名单。研究中心成员及合著者不直接计为博士学生。'),
      personalFunding:unknownFunding(duflo),
      publications:[
        pub('Changes in Social Network Structure in Response to Formal Credit Markets',2024,'article','Review of Economic Studies · May 2024',dufloPubs,dufloPubs),
        pub('Children’s arithmetic skills do not transfer between applied and academic mathematics',2025,'article','Nature · February 2025','https://doi.org/10.1038/s41586-024-08502-w',dufloPubs)
      ],
      pubCoverage:{status:'selected',note:'从 MIT 研究者公开论文目录选列，非近三年完整清单。只核实到月份的条目不补造日期。',url:dufloPubs,checked},
      sources:[
        source('身份与联系','MIT Economics · Esther Duflo',duflo,'MIT 公开邮箱及办公室；简介也列有 Zurich 与 Collège de France 任职。'),
        source('近三年论文','MIT Economics · Published papers',dufloPubs,'研究者公开论文目录与出版年份。')
      ]
    },
    {
      ...defaults,id:'kalwant-bhopal',name:'Kalwant Bhopal',initials:'KB',university:'University of Birmingham',universityZh:'伯明翰大学',country:'UK',
      department:'School of Education / Centre for Research in Race & Education',discipline:'教育学',topics:['education','sociology','gender'],methods:['qual'],
      keywords:['教育不平等','种族与教育','高等教育','交叉性','质性研究','ethnography','educational inequalities','race','higher education','intersectionality'],
      summary:'研究教育中的不平等、种族化与社会正义，官网指导领域包含质性、案例与民族志研究。',
      fitNote:'适合教育社会学、教育不平等和批判性研究路径；需要结合写作样本说明问题与方法。',
      program:'Education 博士研究路径与导师名额待确认',
      contact:{email:'k.bhopal@bham.ac.uk',url:'https://www.birmingham.ac.uk/staff/profiles/education/bhopal-kalwant',office:'School of Education',checked},
      students:unknownStudents('https://www.birmingham.ac.uk/staff/profiles/education/bhopal-kalwant','官网列有研究生指导领域，未查得可逐人核实的近年招生年份与背景名单。本科研究受试者不算本科指导学生。'),
      personalFunding:unknownFunding('https://www.birmingham.ac.uk/staff/profiles/education/bhopal-kalwant'),
      publications:[
        pub('Race and Education: Reproducing White Supremacy in Britain',2024,'book','Penguin Press · 学术著作','https://www.birmingham.ac.uk/research/crre/events/2024/race-and-education','https://www.birmingham.ac.uk/research/crre/events/2024/race-and-education'),
        pub('The (un)equal university: Training programmes and the commodification of race',2024,'article','Higher Education Quarterly 78(4), e12518','https://doi.org/10.1111/hequ.12518','https://onlinelibrary.wiley.com/doi/10.1111/hequ.12518','2024-03-28')
      ],
      pubCoverage:{status:'selected',note:'选列近三年一部专著与一篇研究论文，不是完整成果统计；评价成果需同时复核出版商最新状态。',url:'https://www.birmingham.ac.uk/staff/profiles/education/bhopal-kalwant',checked},
      sources:[
        source('身份、联系与指导','Birmingham · Kalwant Bhopal','https://www.birmingham.ac.uk/staff/profiles/education/bhopal-kalwant','官方研究简介、指导领域及公开联系信息。'),
        source('著作与年份','Birmingham · Race and Education launch','https://www.birmingham.ac.uk/research/crre/events/2024/race-and-education','2024 年大学书籍发布活动确认著作。'),
        source('论文原始记录','Wiley · The (un)equal university','https://onlinelibrary.wiley.com/doi/10.1111/hequ.12518','出版商作者、标题与首次在线日期。')
      ]
    },
    {
      ...defaults,id:'anna-tsing',name:'Anna L. Tsing',initials:'AT',university:'University of California, Santa Cruz',universityZh:'加州大学圣克鲁兹分校',country:'US',
      department:'Anthropology Department',discipline:'人类学',topics:['anthropology','gender','development'],methods:['qual'],
      keywords:['多物种人类学','民族志','全球化','环境人类学','东南亚','multispecies anthropology','ethnography','globalization','environment','Southeast Asia'],
      summary:'研究文化政治、多物种人类学、全球化与森林社会生态，采用多点民族志视角。',
      fitNote:'适合环境人文与人类学交叉课题；不能仅因涉及环境就按自然科学实验室申请。',
      admissionNote:'官方目录在办公时间栏标注 On Leave；未说明目标年度博士名额，须直接确认实际指导安排。',
      program:'Anthropology 博士项目与当前指导安排待确认',
      contact:{email:'atsing@ucsc.edu',url:'https://anthro.ucsc.edu/directory/atsing/',office:'Social Sciences 1, 411；公开电话 831-459-4795',checked},
      students:unknownStudents('https://anthro.ucsc.edu/directory/atsing/','本轮未查得可逐人确认的近年指导名单或本科指导案例；不根据合著者、合作中心成员推断师生关系。'),
      personalFunding:unknownFunding('https://anthro.ucsc.edu/directory/atsing/'),
      publications:[
        pub('Field Guide to the Patchy Anthropocene: The New Nature',2024,'book','Stanford University Press · 合著学术著作','https://senate.ucsc.edu/committees/cfrl-committee-on-faculty-research-lecture/current-year-lecture/2025-annatsingfrlprogram.pdf','https://senate.ucsc.edu/committees/cfrl-committee-on-faculty-research-lecture/current-year-lecture/2025-annatsingfrlprogram.pdf')
      ],
      pubCoverage:{status:'selected',note:'大学 2025 年学术讲座资料确认的 2024 年合著专著；非近三年全部论文清单。',url:'https://senate.ucsc.edu/committees/cfrl-committee-on-faculty-research-lecture/current-year-lecture/2025-annatsingfrlprogram.pdf',checked},
      sources:[
        source('身份与联系','UC Santa Cruz · Anna L Tsing','https://anthro.ucsc.edu/directory/atsing/','官方目录、研究领域、公开邮箱及 On Leave 标记。'),
        source('近三年著作','UCSC Academic Senate · Faculty Research Lecture','https://senate.ucsc.edu/committees/cfrl-committee-on-faculty-research-lecture/current-year-lecture/2025-annatsingfrlprogram.pdf','大学资料明确列出 2024 年合著书籍。')
      ]
    }
  ];
})();
