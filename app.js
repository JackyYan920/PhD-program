/* Private applicant data is local. Optional literature lookup sends only the faculty name to Crossref. */
(() => {
  'use strict';
  const C=globalThis.Compass, h=C.escape, key='phd-compass.v1';
  const U=globalThis.CompassUI;
  const seeds=globalThis.COMPASS_CATALOGUE;
  let literatureCandidates=null;
  let state=C.emptyState(), route='', filter=defaultFilter(), toastTimer, lastFocus, unreadableRaw=null;
  const $=s=>document.querySelector(s);
  const modal=$('#modal');
  function defaultFilter(){return {q:'',country:'',discipline:'',path:'',funding:'',admission:'',topics:[],sort:'match',hidePaused:false,personalFunding:'',bachelorEvidence:''};}
  function all(){return [...seeds,...state.custom.filter(r=>!seeds.some(s=>s.id===r.id))].map(r=>C.effective(r,state.entries[r.id]));}
  function get(id){return all().find(r=>r.id===id);}
  function entry(id){return C.cleanEntry(state.entries[id]);}
  function notice(message){clearTimeout(toastTimer);const box=modal.open?(modal.querySelector('.modal-toast')||modal.appendChild(Object.assign(document.createElement('div'),{className:'modal-toast',role:'status'}))):$('#toast');box.textContent=message;box.hidden=false;toastTimer=setTimeout(()=>box.hidden=true,4200);}
  function storageWarning(message){$('#storage-warning').hidden=false;$('#storage-warning').textContent=message;}
  try { const raw=localStorage.getItem(key); if(raw){unreadableRaw=raw;state=C.parseState(JSON.parse(raw));unreadableRaw=null;} }
  catch {storageWarning('浏览器中的数据无法读取。原始存储不会被覆盖，本次更改暂存在页面中。请导出备份，再用“使用与数据”导入有效备份恢复保存。');}
  function save(){try{if(unreadableRaw===null)localStorage.setItem(key,JSON.stringify(state));}catch{storageWarning('浏览器无法保存记录，当前更改仅在本次打开期间有效。请立即导出备份。');}updateSidebar();}
  function updateSidebar(){
    $('#nav-total').textContent=all().length;
    $('#nav-saved').textContent=Object.values(state.entries).filter(e=>e.saved).length;
    $('#due-dot').hidden=!Object.values(state.entries).some(e=>e.saved&&e.followup&&e.followup<=C.today()&&e.stage!=='closed');
    $('#sidebar-topics').innerHTML=state.profile.topics.slice(0,4).map(t=>`<span>${h(C.TOPICS[t].label)}</span>`).join('')||'<span>尚未设置偏好</span>';
    document.querySelectorAll('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===route);if(a.dataset.nav===route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  }
  function button(label,action,cls='secondary',id=''){return `<button type="button" class="button ${cls}" data-action="${action}"${id?` data-id="${h(id)}"`:''}>${label}</button>`;}
  function external(url,label,cls='source-link'){const safe=C.safeUrl(url);return safe?`<a class="${cls}" href="${h(safe)}" target="_blank" rel="noopener noreferrer">${h(label)} <span aria-hidden="true">↗</span></a>`:'';}
  function tags(r){return r.topics.map(t=>`<span class="tag">${h(C.TOPICS[t]?.label||t)}</span>`).join('');}
  function badge(label,kind='neutral'){return `<span class="badge ${kind}">${h(label)}</span>`;}
  function heading(kicker,title,sub,actions=''){return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${sub}</p></div><div class="heading-actions">${actions}</div></div>`;}
  function option(value,label,current){return `<option value="${h(value)}"${value===current?' selected':''}>${h(label)}</option>`;}
  function options(map,current){return Object.entries(map).map(([v,l])=>option(v,l,current)).join('');}
  function topicInputs(selected,name='topics'){return Object.entries(C.TOPICS).map(([v,t])=>`<label class="check-chip"><input type="checkbox" name="${name}" value="${v}"${selected.includes(v)?' checked':''}>${h(t.label)}</label>`).join('');}
  function render(){
    route=['discover','saved','outreach','assessment','research','guide'].includes(location.hash.slice(1))?location.hash.slice(1):'discover';
    $('#breadcrumb').textContent={discover:'发现导师',saved:'我的候选',outreach:'套磁与跟进',assessment:'背景与综合评估',research:'官网检索',guide:'使用与数据'}[route];
    updateSidebar();
    if(route==='discover'||route==='saved')renderDiscover();
    if(route==='outreach')renderOutreach();
    if(route==='assessment')renderAssessment();
    if(route==='research')renderResearch();
    if(route==='guide')renderGuide();
    renderCompareBar();
  }
  function renderDiscover(){
    const saved=route==='saved';
    const records=all(); const due=records.filter(r=>{const e=entry(r.id);return e.saved&&e.followup&&e.followup<=C.today()&&e.stage!=='closed';}).length;
    $('#main').innerHTML=heading(saved?'YOUR RESEARCH SHORTLIST':'EXPLORE YOUR NEXT CHAPTER',saved?'把值得的可能，留在这里。':'找到你的研究同路人。',saved?'从一个好选题，到一份有依据的申请清单。':'面向全人文社科，用公开证据寻找导师，用研究背景评估下一步。',button('＋ 添加导师','add','primary'))+
    (!saved?`<section class="focus-banner" aria-label="申请研究偏好"><div class="focus-content"><span class="small-label">你的申请方向</span><h2>从研究兴趣出发，<br>让下一步更清晰。</h2><p>全人文社科 <span>·</span> 全球院校 <span>·</span> PhD / 研究型硕士</p><div class="hero-topics">${state.profile.topics.map(t=>`<span>${h(C.TOPICS[t].label)}</span>`).join('')||'<span>填写背景，让研究方向更清晰</span>'}</div></div><div class="compass-art" aria-hidden="true"><span class="north">N</span><div class="orbit o1"></div><div class="orbit o2"></div><div class="orbit o3"></div><div class="axis ax1"></div><div class="axis ax2"></div><div class="needle"></div><span class="compass-center"></span><span class="art-caption">YOUR RESEARCH. YOUR DIRECTION.</span></div><button class="text-btn banner-edit" type="button" data-action="profile">调整偏好 ↗</button></section>`:'')+
    `<section class="stats" aria-label="工作台概况"><div><span class="stat-symbol">◎</span><div><strong>${records.length.toString().padStart(2,'0')}</strong><span>官网线索候选</span></div><small>精选起点，持续补充</small></div><div><span class="stat-symbol">☆</span><div><strong>${records.filter(r=>entry(r.id).saved).length.toString().padStart(2,'0')}</strong><span>已加入候选</span></div><a href="#saved">查看清单 ↗</a></div><div><span class="stat-symbol">↗</span><div><strong>${due.toString().padStart(2,'0')}</strong><span>待跟进事项</span></div><a href="#outreach">管理跟进 ↗</a></div></section>`+
    `<div class="discovery-layout"><aside class="filter-panel" aria-label="导师筛选"><div class="section-title"><h2>缩小范围</h2><button class="text-btn" type="button" data-action="reset">重置</button></div><form id="filters">
      <label>国家 / 地区<select name="country">${options({'':'全部国家 / 地区',...C.COUNTRIES},filter.country)}</select></label>
      <label>学科入口<select name="discipline">${options({'':'全部人文社科学科',...C.DISCIPLINES},filter.discipline)}</select></label>
      <label>学位与入学路径<select name="path">${options({'':'全部路径',phd:'PhD 博士',bachelor:'本科路径（含条件资格）',mphil:'MPhil 研究型硕士'},filter.path)}</select></label>
      <label>资金状态<select name="funding">${options({'':'全部资金状态',...C.FUNDING},filter.funding)}</select></label>
      <label>招生状态<select name="admission">${options({'':'全部招生状态',...C.ADMISSION},filter.admission)}</select></label>
      <label>导师个人 funding<select name="personalFunding">${options({'':'不限 · 未知也保留',available:'有明确学生资助（需依据）',grant:'有科研项目 · 非学生承诺',unknown:'个人可用资金未知'},filter.personalFunding)}</select></label>
      <label>本科相关公开记录<select name="bachelorEvidence">${options({'':'不限 · 不推断入学背景',undergrad:'有本科生指导记录',bachelorEntrants:'有本科直博先例'},filter.bachelorEvidence)}</select></label>
      <fieldset><legend>研究主题 <small>选中任一即可</small></legend>${Object.entries(C.TOPICS).map(([v,t])=>`<label class="check-row"><input type="checkbox" name="topic" value="${v}"${filter.topics.includes(v)?' checked':''}><span>${h(t.label)}</span></label>`).join('')}</fieldset>
      <label class="check-row"><input type="checkbox" name="hidePaused"${filter.hidePaused?' checked':''}><span>隐藏已知暂停项目</span></label>
    </form><div class="filter-note">本科路径包含 Honours 或同等研究训练条件；奖学金可申请 ≠ 已获得全奖。</div></aside>
    <section class="results-section" aria-labelledby="results-title"><div class="search-row"><div class="search-box"><span aria-hidden="true">⌕</span><input id="search" type="search" aria-label="搜索导师、学校或研究主题" placeholder="搜索导师、学校、关键词…" value="${h(filter.q)}"><kbd>/</kbd></div><button type="button" class="button secondary" data-action="csv">↓ CSV</button></div><div class="results-toolbar"><h2 id="results-title">导师候选 <span id="result-count"></span></h2><label class="sort-label">排序<select id="sort" aria-label="排序">${options({match:'主题重合优先',name:'姓名 A–Z',checked:'资料查阅时间'},filter.sort)}</select></label></div><div class="evidence-tip"><span>ⓘ</span><p>主题重合由标签计算，<strong>不是录取概率</strong>。招生、资格和资金独立核验。<a href="#guide">了解数据 ↗</a></p></div><div id="results" aria-live="polite"></div></section></div>`;
    renderResults();
  }
  function filtered(){return C.filter(all(),{...filter,saved:route==='saved'},state.entries,state.profile);}
  function renderResults(){
    const records=filtered();$('#result-count').textContent=records.length;
    $('#results').innerHTML=records.length?`<div class="cards">${records.map(card).join('')}</div><p class="results-end">已显示全部 ${records.length} 位候选 · 没有合适的？<a href="#research">继续检索官网 ↗</a></p>`:`<div class="empty"><span>⌕</span><h3>${route==='saved'&&!Object.values(state.entries).some(e=>e.saved)?'从一位导师开始你的候选清单':'暂时没有符合条件的导师'}</h3><p>放宽筛选，或先用官网检索补充候选。未知信息不会自动计为满足条件。</p>${button('重置筛选','reset')}${route==='saved'?'<a class="button primary" href="#discover">发现导师 ↗</a>':'<a class="button primary" href="#research">检索官网 ↗</a>'}</div>`;
  }
  function card(r){
    const e=entry(r.id),m=C.match(r,state.profile.topics),inCompare=state.comparisons.includes(r.id);
    return `<article class="candidate" data-card="${h(r.id)}"><div class="card-top"><span class="monogram ${h(r.color)}" aria-hidden="true">${h(r.initials)}</span><div class="card-country">${h(C.COUNTRIES[r.country]||r.country)}<span>${r.paths.includes('mphil')?'PhD / MPhil':'PhD'}</span></div><button type="button" class="icon-btn save-btn${e.saved?' is-saved':''}" data-action="save" data-id="${h(r.id)}" aria-label="${e.saved?'取消收藏':'收藏'} ${h(r.name)}" aria-pressed="${e.saved}" title="${e.saved?'取消收藏':'收藏'}">${e.saved?'★':'☆'}</button></div><h3><button type="button" class="name-btn" data-action="detail" data-id="${h(r.id)}">${h(r.name)}</button></h3><p class="university">${h(r.university)}</p><p class="department">${h(r.department)}</p><div class="tags">${tags(r)}</div><p class="card-summary">${h(r.summary)}</p><div class="match-row"><span>研究主题重合</span><strong>${m.total?m.matched.length+' / '+m.total:'未设偏好'}</strong><div class="match-track"><i style="width:${m.total?100*m.matched.length/m.total:0}%"></i></div></div><div class="status-row">${badge(C.FUNDING[r.funding],r.funding==='package'?'green':'neutral')}${badge(C.ADMISSION[r.admission],r.admission==='paused'?'amber':r.admission==='open'?'green':'neutral')}</div><div class="card-dossier-meta"><span>${r.contact.email?'公开邮箱可查':'邮箱待核实'}</span><span>${C.recentPublications(r).items.length+C.recentPublications(r).boundary.length} 项近年成果线索</span><span>${r.students.records.length} 条指导线索</span></div><div class="verification">${r.personal.length?'◉ 含个人核验记录':C.stale(r.checked)?'◷ 资料需复查':'◉ 研究资料已查阅'}<span>${r.checked||'未查阅'}${r.personal.some(p=>C.stale(p.date))?' · 核验已过 90 天':''}</span></div><div class="card-bottom"><label class="compare-check"><input type="checkbox" data-compare="${h(r.id)}"${inCompare?' checked':''}>加入对比</label><button type="button" class="text-btn" data-action="detail" data-id="${h(r.id)}">查看详情 <span>↗</span></button></div></article>`;
  }
  function renderOutreach(){
    const records=all().filter(r=>entry(r.id).saved),today=C.today();
    const due=records.filter(r=>{const e=entry(r.id);return e.followup&&e.followup<=today&&e.stage!=='closed';});
    const deadlines=records.filter(r=>entry(r.id).deadline&&entry(r.id).stage!=='closed'&&entry(r.id).stage!=='applied').sort((a,b)=>entry(a.id).deadline.localeCompare(entry(b.id).deadline));
    $('#main').innerHTML=heading('MAKE THE NEXT MOVE','每一次联系，都有下一步。','先读论文，再写具体的研究连接。用一处记录保留每一次跟进。',button('↓ 导出跟进 CSV','csv'))+
      `<section class="followup-summary"><div><span class="eyebrow">FOLLOW-UP</span><h2>${due.length} 项今天需跟进</h2><p>跟进日期由你设置；此页面不会发送邮件或后台提醒。</p></div><div class="due-list">${due.length?due.map(r=>`<button type="button" data-action="detail" data-id="${h(r.id)}"><strong>${h(r.name)}</strong><span>${h(entry(r.id).followup)} · ${h(C.STAGES[entry(r.id).stage])} ↗</span></button>`).join(''):'<p>还没有到期的跟进，继续推进你的研究清单。</p>'}</div></section>`+
      `<div class="section-title board-heading"><h2>申请进度 <span class="muted">${records.length} 位候选</span></h2><a href="#saved">管理我的候选 ↗</a></div><div class="board">${Object.entries(C.STAGES).map(([stage,label])=>{const rs=records.filter(r=>entry(r.id).stage===stage);return `<section class="board-column"><h3><span class="stage-dot stage-${stage}"></span>${h(label)}<span>${rs.length}</span></h3>${rs.length?rs.map(r=>{const e=entry(r.id);return `<article class="board-card"><button type="button" class="name-btn" data-action="detail" data-id="${h(r.id)}">${h(r.name)}</button><p>${h(r.universityZh||r.university)}</p>${e.followup?`<span class="badge ${e.followup<=today?'amber':'neutral'}">跟进 ${h(e.followup)}</span>`:''}<label>推进到<select data-stage="${h(r.id)}" aria-label="${h(r.name)} 的申请进度">${options(C.STAGES,e.stage)}</select></label></article>`;}).join(''):'<div class="board-empty">这里等待新的进展</div>'}</section>`;}).join('')}</div><section class="deadline-section"><h2>申请截止记录</h2><p>仅显示你手动录入的日期，请对应目标入学年度核实。</p>${deadlines.length?`<div class="deadline-list">${deadlines.map(r=>`<button type="button" data-action="detail" data-id="${h(r.id)}"><strong>${h(r.name)}</strong><span>${h(entry(r.id).deadline)}${entry(r.id).deadline<today?' · 已过期，请复核':''} ↗</span></button>`).join('')}</div>`:'<div class="inline-empty">打开导师详情，即可添加目标项目的申请截止日期。</div>'}</section>`;
  }
  function renderResearch(){
    $('#main').innerHTML=heading('FOLLOW THE PRIMARY SOURCES','让线索，回到官网。','组合研究主题与地区，生成官方站点检索。先确认人，再确认项目和资金。')+
    `<section class="research-builder"><div class="section-title"><h2>导师发现 · 检索助手</h2>${badge('手动检索可用','green')}</div><p>会在新标签页打开搜索引擎，不会自动抓取、验证或加入导师。</p><form id="research-form"><div class="form-grid"><label>研究关键词（英文效果更好）<input required name="query" value="${h(state.profile.researchText||state.profile.keywords||'social inequality')}" maxlength="300"></label><label>目标国家<select name="country">${options({'':'全球 · 不限制域名',AU:'澳大利亚 · edu.au',US:'美国 · edu',UK:'英国 · ac.uk',CA:'加拿大 · ca',SG:'新加坡 · edu.sg',HK:'香港 · edu.hk'},'')}</select></label><label>要查找什么<select name="intent">${options({people:'导师与研究领域',students:'学生与本科直博先例',publications:'论文与研究成果',admissions:'博士 / MPhil 入学资格',funding:'奖学金与资金',availability:'招生与指导名额'},'people')}</select></label></div><button class="button primary" type="submit">生成官网检索 ↗</button></form><div id="research-links"></div></section>`+
    `<div class="research-bottom"><section class="info-card"><span class="eyebrow">A THREE-STEP CHECK</span><h2>一位候选，三层核验</h2><ol class="steps"><li><span>01</span><div><h3>研究与身份</h3><p>在职院系、近期论文、具体研究问题，是否有博士指导资格。</p></div></li><li><span>02</span><div><h3>项目与年度</h3><p>明确申请哪个项目、哪个学年；本科资格、研究训练与招生名额分别确认。</p></div></li><li><span>03</span><div><h3>资金与覆盖</h3><p>区分学费、生活津贴、医保和期限，以及是竞争奖学金还是录取资助包。</p></div></li></ol></section><section class="info-card automation-card"><span class="eyebrow">AUTOMATION ROADMAP</span><h2>自动发现，需要下一层能力。</h2><p>当前是 GitHub Pages 静态版本，可筛选、保存、导入与生成检索。尚未连接自动搜索服务。</p><div class="capability"><span>自动搜索与官网抓取</span>${badge('需后台')}</div><div class="capability"><span>定时核验与变动提醒</span>${badge('需后台')}</div><div class="capability"><span>跨设备同步与安全存储</span>${badge('需后台')}</div><a href="#guide">查看实现边界与接入方案 ↗</a></section></div>`;
  }
  function renderAssessment(){
    const p=state.profile,records=all().filter(r=>entry(r.id).saved),targets=records.length?records:all();
    $('#main').innerHTML=heading('APPLICANT BACKGROUND & FIT','从你的背景，走向合适的研究。','专业、发表、方向、方法、学术联系与推荐信，分别解释，不汇总为虚假的录取概率。')+`<div class="profile-layout"><section class="info-card profile-editor"><h2>我的申请背景</h2>${U.profileForm(p,topicInputs(p.topics))}</section><aside class="profile-guidance info-card"><span class="eyebrow">HOW THIS ASSESSMENT WORKS</span><h2>评估的依据，始终可见。</h2><p>研究主题、方法与学历条件用于讨论适合的项目。发表、学术联系与推荐信是你自述的准备度，不代表招生委员会会如何评价。</p><ul><li>不把没有发表当作申请资格不合格。</li><li>不根据推荐人声望或关系远近给隐性加分。</li><li>导师回复不等于录取，公开 grant 不等于可给你的 funding。</li><li>未知信息会变成待核实的问题，不会默认为“否”。</li></ul><a href="#research" class="source-link">继续发现官网线索 ↗</a></aside></div><section class="assessment-results"><div class="section-title"><h2>逐位评估 · ${records.length?'我的候选':'起始候选库'}</h2><span class="muted">${targets.length} 位 · 保存背景后更新</span></div><div class="assessment-targets">${targets.map(r=>{const a=C.assessment(r,p,entry(r.id));return `<article><div><h3>${h(r.name)}</h3><p>${h(r.discipline)} · ${h(r.university)}</p></div><div class="assessment-summary">${a.dimensions.slice(0,4).map(d=>`<span class="signal ${h(d.status)}">${h(d.label)} · ${h({match:'有匹配线索',ready:'已准备',caution:'需核实',gap:'有限制',unknown:'未知'}[d.status])}</span>`).join('')}</div><button type="button" class="text-btn" data-action="detail" data-id="${h(r.id)}">查看逐项解释 ↗</button></article>`;}).join('')}</div></section>`;
  }
  function dossier(id){const r=get(id);if(r)showModal(modalHead('PERSONAL DOSSIER','补充 '+r.name+' 的公开资料')+U.dossierEditor(r),true);}
  function saveDossier(id,patch){const e=entry(id);e.dossier=C.cleanDossier({...e.dossier,...patch});e.saved=true;state.entries[id]=e;save();render();detail(id);notice('个人补充已保存，来源与内置资料分开保留。');}
  function handleDossierForm(form,fd,v){
    const forms=['contact-funding-form','student-status-form','student-record-form','publication-form','literature-select-form'];if(!forms.includes(form.id))return false;
    const id=form.dataset.id,r=get(id);if(!r)return true;
    const day=v('checked')||C.today();const validDay=C.date(day)&&day<=C.today();
    if(form.id==='contact-funding-form'){
      if(!validDay)return notice('请提供不晚于今天的有效查阅日期。'),true;
      if(v('email')&&(!C.safeUrl(v('contactUrl'))||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))))return notice('公开邮箱需有效格式、官网来源及查阅日期。'),true;
      if(v('fundingStatus')!=='unknown'&&(!C.safeUrl(v('fundingUrl'))||!v('fundingNote')))return notice('资金结论需要来源网址和明确的范围说明。'),true;
      saveDossier(id,{contact:{...r.contact,email:v('email'),url:C.safeUrl(v('contactUrl')),checked:day},personalFunding:{status:v('fundingStatus'),url:C.safeUrl(v('fundingUrl')),note:v('fundingNote'),cycle:v('cycle'),checked:day}});
    }
    if(form.id==='student-status-form'){
      if(!validDay||((v('undergrad')!=='unknown'||v('bachelorEntrants')!=='unknown')&&(!C.safeUrl(v('url'))||!v('note'))))return notice('本科相关结论需有效日期、来源和具体依据。'),true;
      saveDossier(id,{students:{...r.students,undergrad:v('undergrad'),bachelorEntrants:v('bachelorEntrants'),note:v('note'),url:C.safeUrl(v('url')),checked:day}});
    }
    if(form.id==='student-record-form'){
      if(!v('name')||!v('degree')||!v('relation')||!C.safeUrl(v('url'))||!validDay)return notice('请填写公开姓名、学位、指导关系、有效来源和日期。'),true;
      for(const k of ['startYear','endYear'])if(v(k)&&(!/^\d{4}$/.test(v(k))||Number(v(k))<1900||Number(v(k))>Number(C.today().slice(0,4))))return notice('学生记录年份需为已知的四位年份；未知请留空。'),true;
      if(v('startYear')&&v('endYear')&&v('startYear')>v('endYear'))return notice('开始年份不能晚于结束年份。'),true;
      const x={name:v('name'),degree:v('degree'),relation:v('relation'),startYear:v('startYear'),endYear:v('endYear'),background:v('background'),url:C.safeUrl(v('url')),checked:day};saveDossier(id,{students:{...r.students,status:'listed',records:[...r.students.records,x]}});
    }
    if(form.id==='publication-form'){
      if(!v('title')||!C.safeUrl(v('url'))||!C.safeUrl(v('sourceUrl'))||(!C.date(v('date'))&&!/^\d{4}$/.test(v('year'))))return notice('请填写作品题目、有效作品与证据网址，以及日期或四位年份。'),true;
      if(v('date')&&v('date')>C.today()||Number(v('year'))>Number(C.today().slice(0,4)))return notice('尚未发表的未来作品不计入近三年成果。'),true;
      const x={title:v('title'),date:C.date(v('date')),year:Number(v('date').slice(0,4)||v('year')),type:v('type'),venue:v('venue'),url:C.safeUrl(v('url')),sourceUrl:C.safeUrl(v('sourceUrl')),checked:C.today()};saveDossier(id,{publications:[...r.publications,x],pubCoverage:{status:'selected',note:'公开选列，包含个人补充；非完整目录。',url:r.pubCoverage.url,checked:C.today()}});
    }
    if(form.id==='literature-select-form'){
      if(!literatureCandidates||literatureCandidates.id!==id)return true;const selected=fd.getAll('works').map(i=>literatureCandidates.items[Number(i)]).filter(Boolean);
      if(!selected.length)return notice('请先核对作者身份，再选择要加入的作品。'),true;
      const merged=[...new Map([...r.publications,...selected].map(x=>[x.url,x])).values()];saveDossier(id,{publications:merged,pubCoverage:{status:'selected',note:'含用户核对作者后从 Crossref 加入的作品；数据库可能有遗漏，非完整论文清单。',url:'https://www.crossref.org/',checked:C.today()}});literatureCandidates=null;
    }
    return true;
  }
  async function lookupPublications(id){
    const r=get(id);if(!r)return;
    showModal(modalHead('PUBLIC LITERATURE LOOKUP',r.name+' · 近三年论文补查')+`<p>仅发送导师姓名到 Crossref 公共数据库；同名作者可能混入，需你核对作者、机构与作品。不会发送申请背景。</p><div id="literature-results" data-lookup-id="${h(id)}" aria-live="polite">正在查询，最多等待 15 秒…</div>`,true);
    try{
      const items=await globalThis.CompassLiterature.lookup(r.name,C.today());if(!modal.open||!$('#literature-results')||$('#literature-results').dataset.lookupId!==id)return;literatureCandidates={id,items};
      $('#literature-results').innerHTML=`<p class="inline-warning">以下是待核对候选书目，尚未算入导师成果。数据库不保证完整，尤其可能遗漏专著、章节与非英文成果。</p><form id="literature-select-form" data-id="${h(id)}">${items.map((x,i)=>`<div class="citation-candidate">${U.publication(x)}<p class="fine-print">元数据作者：${h(x.authors)}</p><label class="check-row"><input type="checkbox" name="works" value="${i}">我已核对作者身份，加入这项成果</label></div>`).join('')||'<p>未取得可用结果；这不表示导师没有发表。</p>'}${items.length?'<button type="submit" class="button primary">加入已核对的成果</button>':''}</form>`;
    }catch(error){if($('#literature-results')?.dataset.lookupId===id)$('#literature-results').innerHTML=`<div class="inline-empty">${h(error.name==='AbortError'?'查询超时，请稍后重试。':error.message)} ${external('https://search.crossref.org/?q='+encodeURIComponent(r.name),'打开 Crossref 检索')} ${external(r.pubCoverage.url||r.sources[0]?.url,'回到官网作品页')}</div>`;}
  }

  function renderGuide(){
    $('#main').innerHTML=heading('YOUR DATA, YOUR WORKSPACE','清楚的信息，安心的管理。','理解每一个状态的含义，也让你的申请记录随时可以带走。')+
    `<div class="guide-grid"><section class="info-card"><span class="eyebrow">BACKUP & TRANSFER</span><h2>数据备份与迁移</h2><p>收藏、备注、草稿与核验记录仅存在当前浏览器。清除浏览器数据或更换网址后可能无法访问，请定期备份。</p><div class="button-row">${button('↓ 导出完整 JSON','backup','primary')}<label class="button secondary file-label">↑ 导入 JSON<input type="file" id="import-file" accept=".json,application/json"></label>${button('↓ 导出导师 CSV','csv')}</div><p class="fine-print">导入会先展示合并预览。同一导师的个人记录以备份为准；现有自建导师保留。内置官网线索不会被覆盖。</p><div id="import-preview"></div></section><section class="info-card"><span class="eyebrow">HOW TO READ THE SIGNALS</span><h2>状态不是承诺</h2><dl class="definitions"><dt>主题重合</dt><dd>与你选中的研究标签重合数；等权计数，不评价学术能力或录取概率。</dd><dt>研究资料已查阅</dt><dd>只表示查阅过研究方向来源，不代表确认招生或全奖；90 天后提示复查。</dd><dt>项目全奖政策</dt><dd>项目官网发布的资助包；以对应年度录取条件为准，不是你的个人 offer。</dd><dt>公开指导领域</dt><dd>导师官网愿指导相关研究，不表示目标学年仍有空缺。</dd><dt>个人核验记录</dt><dd>由你附来源、日期和依据更新状态；未被网站自动核实，详情中单独展示。</dd></dl></section><section class="info-card"><span class="eyebrow">STATIC, BY DESIGN</span><h2>现在就能做</h2><p>跨学科筛选、背景与材料评估、联系方式、指导记录、个人资金、近三年成果、在线论文补查、收藏对比、套磁进度及 JSON / CSV 备份。</p><p>页面不需要账户，不含外部脚本或统计。仅在点击在线论文补查时向 Crossref 发送导师姓名；你的个人背景、connection 与推荐信说明不会发送。</p><p>GitHub Pages 仓库中的资料是公开的。个人备注存在本地，不要把备份上传到公开仓库。</p></section><section class="info-card"><span class="eyebrow">THE NEXT LAYER</span><h2>需要后台才能做</h2><p>自动搜索需搜索 API、限速抓取与结果去重；官网核验需保存原文、时间戳及变动证据。招生和资金的机器结论仍应由人复核。</p><p>可用独立服务或 GitHub Actions 定时生成待审核的公开 JSON，再由静态页面读取。密钥放在服务端或 Actions Secrets，不能写入网页。</p><p>持续同步、私人数据和邮件提醒需要身份认证、数据库与定时任务。当前版本没有运行这些服务，也不会自动发信。</p></section></div><section class="info-card source-catalog"><div class="section-title"><h2>内置候选的官方资料</h2><span class="muted">查阅于 2026-11-08 · 共 ${seeds.length} 位</span></div><p>这是涵盖多个学科的精选起始清单，并非全球完整导师数据库。研究标签人工归类，学生与作品是有来源的选列；资料未公开不表示不存在。</p><div class="catalog">${seeds.map(r=>`<div><strong>${h(r.name)}</strong><div>${r.sources.map(s=>external(s.url,s.title)).join('')}</div></div>`).join('')}</div></section>`;
  }
  function showModal(content,wide=false){lastFocus=document.activeElement;$('#modal-content').innerHTML=content;modal.classList.toggle('wide',wide);if(!modal.open)modal.showModal();modal.scrollTop=0;}
  function modalHead(kicker,title){return `<div class="modal-head"><div><div class="eyebrow">${kicker}</div><h2 id="modal-title">${h(title)}</h2></div><button type="button" class="icon-btn" data-action="close" aria-label="关闭弹窗">×</button></div>`;}
  function detail(id){
    const r=get(id);if(!r)return;const e=entry(id),m=C.match(r,state.profile.topics);
    showModal(modalHead('SUPERVISOR PROFILE',r.name)+`<div class="detail-intro"><span class="monogram ${h(r.color)}">${h(r.initials)}</span><div><h3>${h(r.university)}</h3><p>${h(r.department)}</p><div class="tags">${tags(r)}</div></div></div><p class="detail-summary">${h(r.summary)}</p><div class="detail-fit"><strong>研究标签重合 ${m.total?m.matched.length+' / '+m.total:'未设置'}</strong><p>${h(r.fitNote)} 标签依据简介人工归类。</p></div>${U.dossierSections(r,e)}<section class="detail-section"><h3>结合你的背景：综合评估</h3>${U.dimensions(r,state.profile,e)}<a href="#assessment" class="source-link" data-action="go-assessment">填写或更新背景 ↗</a></section><section class="detail-section"><h3>项目与申请可行性</h3><p>${h(r.program)}</p><div class="assessment-grid"><div>${badge(C.ADMISSION[r.admission],r.admission==='paused'?'amber':'neutral')}<p>${h(r.admissionNote)}</p></div><div>${badge(C.ELIGIBILITY[r.eligibility])}<p>${h(r.eligibilityNote)}</p></div><div>${badge(C.FUNDING[r.funding],r.funding==='package'?'green':'neutral')}<p>${h(r.fundingNote)}</p></div></div>${r.personal.length?`<p class="inline-warning">以上部分状态来自你的个人核验。核验日期与来源见下方；${r.personal.some(p=>C.stale(p.date))?'有记录已超过 90 天，请复查。':'网站未自动验证这些结论。'}</p>`:''}</section><section class="detail-section"><h3>官网证据与入口 <small>研究资料查阅：${r.checked||'未查阅'}</small></h3><div class="source-list">${r.sources.length?r.sources.map(s=>`<div><span class="small-label">${h(s.type)}</span>${external(s.url,s.title)}<p>${h(s.note)}</p></div>`).join(''):'<p>尚未添加来源。</p>'}</div></section><section class="detail-section"><h3>我的核验记录 <small>附来源与日期，才能更新状态</small></h3><div class="evidence-history">${e.evidence.map(x=>`<div>${badge(x.kind)}<strong>${h(x.date)}${C.stale(x.date)?' · 需复查':''}</strong><p>${h(x.note)}</p>${external(x.url,'查看依据')}${x.status?`<small>记录状态：${h(({'招生':C.ADMISSION,'资金':C.FUNDING,'资格':C.ELIGIBILITY}[x.kind]||{})[x.status]||'无状态变更')}</small>`:''}</div>`).join('')||'<p class="muted">还没有个人核验记录。打开官网查阅后，在这里保留依据。</p>'}</div><form id="evidence-form" data-id="${h(id)}"><div class="form-grid"><label>核验类别<select name="kind" id="evidence-kind">${options({'研究':'研究','招生':'招生','资金':'资金','资格':'资格'},'研究')}</select></label><label>更新状态<select name="status" id="evidence-status"><option value="">仅记录证据</option></select></label><label>查阅日期<input name="date" type="date" required value="${C.today()}" max="${C.today()}"></label><label>来源网址<input name="url" type="url" required placeholder="https://大学官网/…" maxlength="2000"></label></div><label>核验依据（含目标学年、覆盖范围或例外条件）<textarea name="note" required rows="2" maxlength="2000" placeholder="记录网页明确说明的内容；个人回复可填院系联系页，并标明回复日期和来源。"></textarea></label><button type="submit" class="button secondary">＋ 保存核验记录</button></form></section><section class="detail-section"><h3>我的申请记录</h3><form id="entry-form" data-id="${h(id)}"><div class="form-grid"><label>申请进度<select name="stage">${options(C.STAGES,e.stage)}</select></label><label>首次联系日期<input type="date" name="contacted" value="${h(e.contacted)}"></label><label>下次跟进<input type="date" name="followup" value="${h(e.followup)}"></label><label>申请截止（手动核实）<input type="date" name="deadline" value="${h(e.deadline)}"></label></div><label>研究笔记<textarea name="notes" rows="3" maxlength="6000" placeholder="读过的论文、具体研究连接、资格疑问…">${h(e.notes)}</textarea></label><label>英文套磁草稿<textarea id="draft-text" name="draft" class="draft-input" rows="8" maxlength="12000" placeholder="先生成框架，再补充你读过的论文、研究问题和个人背景。">${h(e.draft)}</textarea></label><p class="fine-print">草稿含待替换内容，生成后须人工修改；此处不发送邮件。</p><div class="button-row"><button type="button" class="button secondary" data-action="draft" data-id="${h(id)}">生成草稿框架</button><button type="button" class="button secondary" data-action="copy">复制草稿</button><button type="submit" class="button primary">保存并加入候选</button></div></form></section>`,true);
  }
  function profile(){showModal(modalHead('APPLICANT BACKGROUND','你的背景与研究坐标')+U.profileForm(state.profile,topicInputs(state.profile.topics)),true);}
  function add(){showModal(modalHead('GROW YOUR SHORTLIST','添加一位导师')+`<p>先记录线索，再逐项核验。新候选的招生、资金与资格默认待确认。</p><form id="add-form"><div class="form-grid"><label>导师姓名<input name="name" required maxlength="100"></label><label>大学英文名<input name="university" required maxlength="200"></label><label>国家 / 地区<select name="country">${options(C.COUNTRIES,'US')}</select></label><label>学科<select name="discipline">${options(C.DISCIPLINES,'跨学科')}</select></label></div><label>院系 / 项目<input name="department" maxlength="200"></label><label>官网资料网址<input name="url" type="url" required maxlength="2000" placeholder="https://大学官网/导师"></label><fieldset><legend>研究主题（人工判断）</legend><div class="topic-inputs">${topicInputs([])}</div></fieldset><fieldset><legend>可能的学位入口（仍需核实）</legend><label class="check-row"><input type="checkbox" name="paths" value="phd" checked>PhD</label><label class="check-row"><input type="checkbox" name="paths" value="mphil">MPhil</label></fieldset><label>研究线索摘要<textarea name="summary" rows="3" maxlength="6000"></textarea></label><button class="button primary" type="submit">添加并收藏</button></form>`);}
  function renderCompareBar(){
    state.comparisons=state.comparisons.filter(id=>get(id));
    const bar=$('#compare-bar');bar.hidden=!state.comparisons.length;
    bar.innerHTML=`<div><strong>${state.comparisons.length} / 3 位导师</strong><span>${state.comparisons.map(id=>h(get(id).name)).join(' · ')}</span></div>${button('清空','clear-compare','ghost')}${button('开始对比 ↗','compare','primary')}`;
  }
  function compare(){const rs=state.comparisons.map(get).filter(Boolean);if(!rs.length)return;
    const rows=[['研究主题',r=>`<div class="tags">${tags(r)}</div>`],['主题重合',r=>{const m=C.match(r,state.profile.topics);return m.total?m.matched.length+' / '+m.total:'未设置偏好';}],['项目入口',r=>h(r.program)],['本科资格',r=>`<strong>${h(C.ELIGIBILITY[r.eligibility])}</strong><p>${h(r.eligibilityNote)}</p>`],['资金',r=>`<strong>${h(C.FUNDING[r.funding])}</strong><p>${h(r.fundingNote)}</p>`],['招生',r=>`<strong>${h(C.ADMISSION[r.admission])}</strong><p>${h(r.admissionNote)}</p>`],['联系方式',r=>h(U.compareExtras(r).contact)],['本科与学生',r=>h(U.compareExtras(r).students)],['导师个人经费',r=>h(U.compareExtras(r).funding)],['近三年成果',r=>h(U.compareExtras(r).publications)],['综合评估',r=>{const a=C.assessment(r,state.profile,entry(r.id));return a.dimensions.map(d=>`<p><strong>${h(d.label)}</strong> · ${h(d.detail)}</p>`).join('');}],['证据',r=>`${r.personal.length?'含个人核验记录 · ':''}研究资料 ${h(r.checked||'待查阅')}<br>${external(r.sources[0]?.url,'官网资料')}`],['我的进度',r=>h(C.STAGES[entry(r.id).stage])]];
    showModal(modalHead('SIDE BY SIDE','把可能性，放在一起看。')+`<p>比较申请可行性；研究相近与项目可申请是两个独立判断。</p><div class="table-scroll"><table class="compare-table"><thead><tr><th scope="col">对比项目</th>${rs.map(r=>`<th scope="col">${h(r.name)}<small>${h(r.university)}</small></th>`).join('')}</tr></thead><tbody>${rows.map(([label,fn])=>`<tr><th scope="row">${label}</th>${rs.map(r=>`<td>${fn(r)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,true);
  }
  function download(content,type,name){const u=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
  function backup(){if(unreadableRaw!==null)download(unreadableRaw,'application/json',`phd-compass-unreadable-${C.today()}.json`);download(JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2),'application/json',`phd-compass-backup-${C.today()}.json`);notice('已导出收藏、笔记、草稿与核验记录。');}
  function exportCsv(){const records=route==='discover'||route==='saved'?filtered():route==='outreach'?all().filter(r=>entry(r.id).saved):all();
    const rows=[['导师','大学','国家','工作邮箱','学生记录','本科生指导','本科直博先例','导师个人经费','个人经费依据','近三年成果','主题','主题重合数','偏好主题总数','项目','本科资格','资金','招生','研究资料查阅','个人核验依据','收藏','进度','首次联系','跟进','截止','笔记','官网'],...records.map(r=>{const e=entry(r.id),m=C.match(r,state.profile.topics);return [r.name,r.university,r.country,r.contact.email,r.students.records.map(x=>x.name+' '+x.degree+' '+x.relation+' '+x.url).join('\n'),U.tri[r.students.undergrad],U.tri[r.students.bachelorEntrants],U.fundingLabels[r.personalFunding.status],r.personalFunding.url,C.recentPublications(r).items.map(x=>[x.date||x.year,x.title,x.url].join(' ')).join('\n'),r.topics.map(t=>C.TOPICS[t].label).join(' / '),m.matched.length,m.total,r.program,C.ELIGIBILITY[r.eligibility],C.FUNDING[r.funding],C.ADMISSION[r.admission],r.checked,r.personal.map(x=>`${x.kind} ${x.date}: ${x.note} ${x.url}`).join('\n'),e.saved?'是':'否',C.STAGES[e.stage],e.contacted,e.followup,e.deadline,e.notes,r.sources.map(s=>s.url).join('\n')];})];
    download('\uFEFF'+rows.map(row=>row.map(C.csv).join(',')).join('\r\n'),'text/csv;charset=utf-8',`phd-compass-${route}-${C.today()}.csv`);notice(`已导出 ${records.length} 位导师。`);
  }
  let incoming=null;
  document.addEventListener('click',async event=>{
    if(event.target.closest('.skip')){event.preventDefault();$('#main').focus();$('#main').scrollIntoView();return;}
    const target=event.target.closest('[data-action]');if(!target)return;
    const {action,id}=target.dataset;
    if(action==='close'){modal.close();return;}
    if(action==='add')add();if(action==='profile')profile();if(action==='detail')detail(id);
    if(action==='dossier')dossier(id);if(action==='publications')lookupPublications(id);if(action==='go-assessment'){modal.close();location.hash='assessment';}
    if(action==='backup')backup();if(action==='csv')exportCsv();if(action==='compare')compare();
    if(action==='save'){const e=entry(id);e.saved=!e.saved;state.entries[id]=e;save();render();notice(e.saved?'已加入候选，可在套磁与跟进中管理。':'已取消收藏；笔记和核验记录仍保留。');}
    if(action==='reset'){filter=defaultFilter();render();}
    if(action==='clear-compare'){state.comparisons=[];save();render();}
    if(action==='draft'){$('#draft-text').value=C.makeDraft(get(id),state.profile);notice('已生成框架，请补充具体论文并保存。');}
    if(action==='copy'){const value=$('#draft-text').value;if(!value.trim())return notice('请先填写或生成草稿。');try{await navigator.clipboard.writeText(value);notice('草稿已复制。');}catch{$('#draft-text').focus();$('#draft-text').select();notice('自动复制不可用，已选中文字，请手动复制。');}}
    if(action==='confirm-import'&&incoming){try{backup();state=C.mergeState(state,incoming,seeds.map(r=>r.id));incoming=null;unreadableRaw=null;$('#storage-warning').hidden=true;save();render();notice('已合并备份，并导出导入前的数据。');}catch(error){notice(error.message);}}
    if(action==='cancel-import'){incoming=null;$('#import-preview').innerHTML='';}
  });
  document.addEventListener('input',event=>{if(event.target.id==='search'){filter.q=event.target.value;renderResults();}});
  document.addEventListener('change',async event=>{
    const t=event.target;
    if(t.closest('#filters')){const fd=new FormData($('#filters'));for(const k of ['country','discipline','path','funding','admission','personalFunding','bachelorEvidence'])filter[k]=fd.get(k)||'';filter.topics=fd.getAll('topic');filter.hidePaused=fd.has('hidePaused');renderResults();}
    if(t.id==='sort'){filter.sort=t.value;renderResults();}
    if(t.dataset.compare){const id=t.dataset.compare;if(t.checked){if(state.comparisons.length===3){t.checked=false;return notice('最多对比 3 位导师，请先取消一位。');}state.comparisons.push(id);}else state.comparisons=state.comparisons.filter(x=>x!==id);save();renderCompareBar();}
    if(t.dataset.stage){const e=entry(t.dataset.stage);e.stage=t.value;state.entries[t.dataset.stage]=e;save();renderOutreach();notice('申请进度已保存。');}
    if(t.id==='evidence-kind'){const map={'招生':C.ADMISSION,'资金':C.FUNDING,'资格':C.ELIGIBILITY}[t.value]||{};$('#evidence-status').innerHTML=option('','仅记录证据','')+options(map,'');}
    if(t.id==='import-file'&&t.files[0]){try{if(t.files[0].size>5000000)throw new Error('备份超过 5 MB，请拆分后导入。');const raw=JSON.parse(await t.files[0].text());incoming=C.parseState(raw);$('#import-preview').innerHTML=`<div class="import-preview"><h3>合并预览</h3><p>${incoming.custom.length} 位自建导师 · ${Object.keys(incoming.entries).length} 条个人记录。研究偏好将替换，同 ID 个人记录将更新；其他现有记录保留。导入前会自动导出当前备份。</p><div class="button-row">${button('确认合并','confirm-import','primary')}${button('取消','cancel-import')}</div></div>`;}catch(error){incoming=null;notice('导入失败：'+error.message);}t.value='';}
  });
  document.addEventListener('submit',event=>{
    const form=event.target;if(!['profile-form','add-form','entry-form','evidence-form','research-form','contact-funding-form','student-status-form','student-record-form','publication-form','literature-select-form'].includes(form.id))return;
    event.preventDefault();const fd=new FormData(form),v=name=>String(fd.get(name)||'').trim();
    if(handleDossierForm(form,fd,v))return;
    if(form.id==='profile-form'){state.profile=C.cleanProfile({...Object.fromEntries(fd),topics:fd.getAll('topics'),methods:fd.getAll('methods')});save();modal.close();render();notice('背景已保存，综合评估已更新。');}
    if(form.id==='add-form'){
      const url=C.safeUrl(v('url'));if(!url)return notice('请填写有效的 http 或 https 官网网址。');
      if(!fd.getAll('paths').length)return notice('请至少选择一种可能的学位入口。');
      const id='custom-'+crypto.randomUUID();const r=C.cleanRecord({id,name:v('name'),initials:v('name').split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase(),university:v('university'),country:v('country'),discipline:v('discipline'),department:v('department'),topics:fd.getAll('topics'),paths:fd.getAll('paths'),summary:v('summary'),program:v('department')||'项目入口待确认',sources:[{type:'个人添加的线索',title:'导师资料入口（待核验）',url,note:'由你添加的网址，尚未确认官网内容。'}]});
      state.custom.push(r);state.entries[id]=C.cleanEntry({saved:true});save();modal.close();render();notice('导师已加入候选，申请资格、招生和资金待核验。');
    }
    if(form.id==='entry-form'){const id=form.dataset.id,e=entry(id);for(const name of ['stage','contacted','followup','deadline','notes','draft'])e[name]=v(name);e.saved=true;state.entries[id]=C.cleanEntry(e);save();modal.close();render();notice('申请记录已保存。');}
    if(form.id==='evidence-form'){
      const id=form.dataset.id,e=entry(id),url=C.safeUrl(v('url')),day=C.date(v('date'));
      if(!url||!day||day>C.today())return notice('请提供有效来源网址与不晚于今天的核验日期。');
      if(e.evidence.length>=100)return notice('每位导师最多保存 100 条核验记录，请先导出备份。');
      e.evidence.push({kind:v('kind'),status:v('status'),url,date:day,note:v('note')});e.saved=true;state.entries[id]=C.cleanEntry(e);save();render();detail(id);notice('核验依据已保存，有依据的状态已应用于筛选。');
    }
    if(form.id==='research-form'){
      const domain={AU:'site:edu.au',US:'site:edu -site:edu.au',UK:'site:ac.uk',CA:'site:ca',SG:'site:edu.sg',HK:'site:edu.hk'}[v('country')]||'';
      const intents={people:'(faculty OR researcher OR professor OR supervisor)',students:'(supervision OR advisees OR students) (PhD OR undergraduate OR bachelor)',publications:'(publications OR research OR CV)',admissions:'(PhD OR MPhil) admissions entry requirements bachelor',funding:'(PhD OR MPhil) scholarship international tuition stipend',availability:'(PhD supervision OR prospective students) availability'};
      const query=`${domain} ${v('query')} ${intents[v('intent')]}`;
      $('#research-links').innerHTML=`<div class="generated-links"><span class="small-label">可编辑的检索式</span><p>${h(query)}</p><div class="button-row">${external('https://www.google.com/search?q='+encodeURIComponent(query),'用 Google 检索','button primary')}${external('https://www.bing.com/search?q='+encodeURIComponent(query),'用 Bing 检索','button secondary')}${button('添加发现的导师','add')}</div><p class="fine-print">搜索结果不保证来自目标国家的大学；请核对机构、页面日期与具体项目。</p></div>`;
    }
  });
  modal.addEventListener('close',()=>{if(lastFocus?.isConnected)lastFocus.focus();});
  window.addEventListener('hashchange',()=>{filter=defaultFilter();render();window.scrollTo(0,0);});
  document.addEventListener('keydown',event=>{if(event.key==='/'&&!modal.open&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){event.preventDefault();$('#search')?.focus();}});
  render();
})();
