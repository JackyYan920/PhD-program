/* Verified cross-disciplinary additions, checked 2026-11-08.
 * Bibliographies and supervision lists are selected public records, not complete cohorts. */
globalThis.COMPASS_MORE_A = (() => {
  const checked='2026-11-08';
  const source=(type,title,url,note)=>({type,title,url,note});
  const pub=(title,year,type,venue,url,sourceUrl,date='')=>({title,year,type,venue,url,sourceUrl,date,checked});
  const student=(name,degree,relation,url,background='本轮未核实入学前学历。')=>({name,degree,relation,url,background,startYear:'',endYear:'',checked});
  const students=(url,records=[],note='本轮未核实具名近期指导记录；未公开不等于没有学生。')=>({status:records.length?'listed':'unknown',undergrad:'unknown',bachelorEntrants:'unknown',url,records,note,checked});
  const funding=url=>({status:'unknown',note:'未找到可用于目标年度新生的个人资金承诺。研究项目、院系资助政策与个人学生经费须分别核实。',url,checked,cycle:''});
  const base={color:'sage',paths:['phd'],eligibility:'unknown',funding:'unknown',admission:'unknown',checked,
    eligibilityNote:'本科背景、先修训练及可申请学位类型待当年项目确认；不根据导师任职推断可本科直博。',
    fundingNote:'本轮未核对对应学位项目的完整资助条件。',
    admissionNote:'未确认目标年度个人名额；既往指导和公开联系入口不等于正在招生。'};
  const rita='https://english.as.virginia.edu/people/rita-felski';
  const bridges='https://www.law.berkeley.edu/our-faculty/faculty-profiles/khiara-bridges/';
  const hancock='https://profiles.stanford.edu/jeffrey-hancock?tab=bio';
  const hancockContact='https://cyber.fsi.stanford.edu/people/jeff-hancock';
  const kenny='https://www.bennettschool.cam.ac.uk/about-us/person/michael-kenny-2/';
  const dorling='https://www.spc.ox.ac.uk/people/prof-danny-dorling';
  const gowland='https://dur.ac.uk/staff/rebecca-gowland/';
  return [
    {
      ...base,id:'rita-felski',name:'Rita Felski',initials:'RF',university:'University of Virginia',universityZh:'弗吉尼亚大学',country:'US',
      department:'Department of English',discipline:'文学',topics:['literature','philosophy','gender'],methods:['theory'],
      keywords:['文学理论','美学','阐释','后批评','女性主义','literary theory','aesthetics','interpretation','postcritique'],
      summary:'研究文学理论、美学与阐释方法，以及文学和日常经验、文化关系。',
      fitNote:'适合文学理论、比较阅读与文化研究。需用写作样本说明具体文本、语言能力和方法。',
      program:'English 博士项目入口及个人指导容量待确认',
      admissionNote:'官方资料注明 2026 年春季休假；目标入学年度的指导安排未确认，不能据此推断持续停招。',
      contact:{email:'felski@virginia.edu',url:rita,office:'232 Bryan Hall；公开电话 434 924-6622',checked},
      students:students(rita),personalFunding:funding(rita),
      publications:[pub('Love, Etc.: Essays on Contemporary Literature and Culture',2024,'book','University of Virginia Press · 与 Camilla Schwartz 共同编辑','https://www.upress.virginia.edu/title/10019/','https://portal.findresearcher.sdu.dk/en/publications/love-etc-essays-on-contemporary-literature-and-culture/','2024-10-17')],
      pubCoverage:{status:'selected',note:'近三年已出版成果选列，为共同编辑的学术论文集；非个人论文全集。2026 年新书未作为已出版成果补造日期。',url:'https://www.upress.virginia.edu/title/10019/',checked},
      sources:[source('身份与联系','UVA English · Rita Felski',rita,'大学公开身份、研究领域、邮箱及休假学期。'),source('近年成果','University of Virginia Press · Love, Etc.','https://www.upress.virginia.edu/title/10019/','大学出版社确认编者、标题及 2024 年出版。'),source('出版日期','University of Southern Denmark · Research portal','https://portal.findresearcher.sdu.dk/en/publications/love-etc-essays-on-contemporary-literature-and-culture/','大学研究库确认 2024-10-17 出版日期。')]
    },
    {
      ...base,id:'khiara-bridges',name:'Khiara M. Bridges',initials:'KB',university:'University of California, Berkeley',universityZh:'加州大学伯克利分校',country:'US',
      department:'School of Law',discipline:'法学',topics:['law','gender','anthropology'],methods:['theory'],
      keywords:['生殖权利','种族与法律','宪法','法律与社会','reproductive rights','constitutional law','critical legal theory','law and society'],
      summary:'研究种族、阶层与生殖权利的交叉，以及宪法、批判法律理论与社会正义。',
      fitNote:'法律与人类学交叉候选。JD、JSD 与其他研究博士的资格和指导制度不同，必须先确认申请入口。',
      program:'法学院研究学位入口待确认（不能直接按政治学 PhD 申请）',
      contact:{email:'khiara.m.bridges@berkeley.edu',url:bridges,office:'Berkeley School of Law',checked},
      students:students(bridges,[],'公开法学课程的修读学生不等于博士指导学生；本轮未核实近期具名研究指导记录。'),
      personalFunding:funding(bridges),
      publications:[
        pub('Race in the Machine: Racial Disparities in Health and Medical AI',2024,'article','Virginia Law Review 110, 243','https://www.law.berkeley.edu/wp-content/uploads/2024/09/2024-Berkeley-Law-Recent-Faculty-Scholarship.pdf','https://www.law.berkeley.edu/wp-content/uploads/2024/09/2024-Berkeley-Law-Recent-Faculty-Scholarship.pdf'),
        pub('Expecting Inequity: How the Maternal Health Crisis Affects Even the Wealthiest Black Americans',2026,'book','学术专著 · 依 Berkeley 官方作者资料',bridges,bridges)
      ],
      pubCoverage:{status:'selected',note:'大学公开论文目录与作者资料中的近三年成果选列。书籍按当前官网所列 2026 年，不沿用早期材料的预计年份。',url:bridges,checked},
      sources:[source('身份与联系','Berkeley Law · Khiara M. Bridges',bridges,'官方研究领域、公开邮箱及 2026 年著作。'),source('论文记录','Berkeley Law · Recent Faculty Scholarship 2024','https://www.law.berkeley.edu/wp-content/uploads/2024/09/2024-Berkeley-Law-Recent-Faculty-Scholarship.pdf','大学法学院公开书目确认 2024 年研究论文。')]
    },
    {
      ...base,id:'jeff-hancock',name:'Jeff Hancock',initials:'JH',university:'Stanford University',universityZh:'斯坦福大学',country:'US',
      department:'Department of Communication / Stanford Social Media Lab',discipline:'传播学',topics:['media','digital','psychology'],methods:['computational','experimental'],
      keywords:['社交媒体','信任','虚假信息','人工智能传播','social media','misinformation','trust','AI-mediated communication'],
      summary:'研究社交技术、人工智能、信任与人的行为，采用计算语言与实验研究等方法。',
      fitNote:'适合数字传播、信任与虚假信息研究；具体研究设计仍需阅读论文讨论。',
      program:'Communication 博士项目及个人指导容量待确认',
      contact:{email:'hancockj@stanford.edu',url:hancockContact,office:'Stanford Social Media Lab / FSI 官方联系入口',checked},
      students:students(hancock,[student('Bingxu Han','Doctoral (Program)','官方 profile 的博士项目 advisee；不等同已完成论文主导师确认',hancock),student('Aya Salim','Doctoral (Program)','官方 profile 的博士项目 advisee',hancock),student('Sarah Wu','Doctoral (Program)','官方 profile 的博士项目 advisee',hancock)],'大学资料明确区分博士项目指导、论文 reader 与硕士 advisor；这里仅选列博士项目 advisees。未公开核实招生年份或本科背景。'),
      personalFunding:funding(hancock),
      publications:[
        pub('Collaboration, crowdsourcing, and misinformation',2024,'article','PNAS Nexus 3(10), pgae434','https://doi.org/10.1093/pnasnexus/pgae434',hancock),
        pub('Internal Fractures: The Competing Logics of Social Media Platforms',2024,'article','Social Media + Society 10(3)','https://doi.org/10.1177/20563051241274668',hancock)
      ],
      pubCoverage:{status:'selected',note:'大学公开 profile 的近三年论文选列，非所有项目成果或近年论文全集。',url:hancock,checked},
      sources:[source('身份与联系','Stanford FSI · Jeff Hancock',hancockContact,'官方教职、研究中心与公开邮箱。'),source('学生与成果','Stanford Profiles · Jeffrey Hancock',hancock,'明确区分指导角色，并列有论文的 DOI 与发表年份。')]
    },
    {
      ...base,id:'michael-kenny',name:'Michael Kenny',initials:'MK',university:'University of Cambridge',universityZh:'剑桥大学',country:'UK',
      department:'Bennett School of Public Policy',discipline:'公共政策',topics:['development','sociology','history'],methods:[],
      keywords:['公共政策','地方治理','分权','基础设施','城乡分化','public policy','devolution','governance','place-based policy','territorial politics'],
      summary:'研究公共政策、治理与地方政策，包括分权、基础设施、城乡分化及英国政治。',
      fitNote:'适合地方治理与政策制度课题。官网 Public Policy MPhil 不能自动当作有奖研究型硕士，需单独核对。',
      program:'Public Policy PhD 入口、指导与资金安排待确认',
      contact:{email:'',url:kenny,office:'官网提供 Send email 联系入口；本轮未解析确认具体邮箱，未猜测地址。',checked},
      students:students('https://www.polis.cam.ac.uk/people/jack-liddall',[student('Jack Liddall','PhD','官方学生页明确列 Michael Kenny 为 supervisor','https://www.polis.cam.ac.uk/people/jack-liddall')],'当前官方学生页确认指导关系，但没有确认入学年份、本科直接入学或资金来源。'),
      personalFunding:funding(kenny),
      publications:[
        pub('Fractured Union: Politics, Sovereignty and the Fight to Save the UK',2024,'book','Hurst Publishers',kenny,kenny),
        pub('How to get science back into policymaking',2025,'article','Nature · 与 Diane Coyle 合作',kenny,kenny)
      ],
      pubCoverage:{status:'selected',note:'大学教职页的近三年著作和文章选列；未纳入官网列出的 2027 年未来出版物。',url:kenny,checked},
      sources:[source('身份、联系与成果','Cambridge Bennett School · Michael Kenny',kenny,'现任公共政策教授及院系负责人、官网联系按钮和近期书目。'),source('博士指导记录','Cambridge POLIS · Jack Liddall','https://www.polis.cam.ac.uk/people/jack-liddall','官方学生页列出导师与研究课题。')]
    },
    {
      ...base,id:'danny-dorling',name:'Danny Dorling',initials:'DD',university:'University of Oxford',universityZh:'牛津大学',country:'UK',
      department:'School of Geography and the Environment',discipline:'地理学',topics:['development','sociology','methods'],methods:['quant'],
      keywords:['人文地理','社会不平等','人口','儿童贫困','human geography','inequality','population','social geography'],
      summary:'从人文与社会地理视角研究不平等、人口与社会空间差异。',
      fitNote:'适合空间与社会不平等研究；统计、地理数据与目标项目的训练要求需另行确认。',
      program:'Geography and the Environment DPhil 项目及指导容量待确认',
      contact:{email:'danny.dorling@ouce.ox.ac.uk',url:dorling,office:'Oxford School of Geography and the Environment；公开电话 +44 (0)1865 275880',checked},
      students:students(dorling),personalFunding:funding(dorling),
      publications:[pub('Seven Children',2024,'book','学术著作 · 依 Oxford College 官方书目',dorling,dorling),pub('Peak Injustice',2024,'book','学术著作 · 依 Oxford College 官方书目',dorling,dorling)],
      pubCoverage:{status:'selected',note:'学院公开简介确认两部 2024 年书籍，选列简称；不是完整论文清单。出版社版本和副标题可进一步核对。',url:dorling,checked},
      sources:[source('身份、联系与著作','Oxford St Peter’s College · Danny Dorling',dorling,'官方现任身份、公开邮箱及两部 2024 年作品。'),source('机构库记录','Oxford ORA · Peak injustice and seven children','https://ora.ox.ac.uk/objects/uuid%3A6726a438-4ae7-4d5b-aa72-5e1f1e460013','大学机构库记录 2024 年两部作品的节选文章与出版背景。')]
    },
    {
      ...base,id:'rebecca-gowland',name:'Rebecca Gowland',initials:'RG',university:'Durham University',universityZh:'杜伦大学',country:'UK',
      department:'Department of Archaeology',discipline:'考古学',topics:['anthropology','history','methods'],methods:['quant'],
      keywords:['生物考古','古病理学','童年健康','社会身份','bioarchaeology','palaeopathology','childhood health','skeletal evidence','embodiment'],
      summary:'结合人类骨骼证据与社会身份理论，研究过去的健康、照护、童年和身体经验。',
      fitNote:'考古学与生物人类学交叉候选；人文学科背景申请时应核对实验与骨骼分析训练要求。',
      program:'Archaeology PhD 研究路径及导师容量待确认',
      contact:{email:'rebecca.gowland@durham.ac.uk',url:'https://www.york.ac.uk/health-sciences/research/health-policy/equipol/people/',office:'Durham Department of Archaeology；邮箱亦见公开论文通信信息。',checked},
      students:students(gowland,[student('Christina Koureta','研究学生（具体学位待核实）','官网 Supervision students 名单',gowland),student('Matthew Lee','Postgraduate Research Student','官网 Supervision students 名单',gowland),student('Naomi Kilburn','研究学生（具体学位待核实）','官网 Supervision students 名单',gowland),student('Noel Hincha','研究学生（具体学位待核实）','官网 Supervision students 名单',gowland),student('Sarah Seeley','Research Student','官网 Supervision students 名单',gowland)],'官网列有五位指导学生；未补造其入学年、毕业年、具体学位或此前背景。无本科直接入学的核实依据。'),
      personalFunding:funding(gowland),
      publications:[
        pub('Skeleton matter(s): Reframing current approaches in bioarchaeology towards a more inclusive future',2025,'article','International Journal of Paleopathology 51, 73–81','https://doi.org/10.1016/j.ijpp.2025.10.002','https://pubmed.ncbi.nlm.nih.gov/41192239/','2025-11-04'),
        pub('Assessing the effectiveness of the one paleopathology workshop',2026,'article','Evolution, Medicine, and Public Health 14(1), 1–10','https://doi.org/10.1093/emph/eoaf041',gowland)
      ],
      pubCoverage:{status:'selected',note:'从大学研究者书目和原始论文元数据选列两篇近三年成果；非完整清单。年份已确认而准确日期未确认的条目保持仅年份。',url:gowland,checked},
      sources:[source('身份、指导与论文','Durham · Rebecca Gowland',gowland,'官方研究简介、博士指导说明、具名学生清单与近期论文。'),source('公开联系','York EQUIPOL · People','https://www.york.ac.uk/health-sciences/research/health-policy/equipol/people/','大学合作项目公开列出的职业邮箱。'),source('论文日期','PubMed · Skeleton matter(s)','https://pubmed.ncbi.nlm.nih.gov/41192239/','论文首次在线日期与作者通信信息。')]
    }
  ];
})();
