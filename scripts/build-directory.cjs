/* Compile reviewed official-directory batches without inventing admissions facts. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),C=require(path.join(root,'core.js'));
for(const f of ['data.js','enrichment-original.js','data-broad.js','data-more-a.js','data-more-b.js','data-more-c.js'])require(path.join(root,f));
const rich=require(path.join(root,'catalogue.js'))(C,COMPASS_SEEDS,COMPASS_ENRICHMENT,[COMPASS_BROAD_SEEDS,COMPASS_MORE_A,COMPASS_MORE_B,COMPASS_MORE_C]);
const normalize=v=>String(v||'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').replace(/^the /,'').trim();
const normalizeUrl=v=>{const u=new URL(v);for(const key of [...u.searchParams.keys()])if(/^utm_|^fbclid$/i.test(key))u.searchParams.delete(key);return u.href.replace(/\/$/,'');};
const batches=['stanford.json','us.json','uk-au.json'];
const topicsByDiscipline={'政治学':['politics'],'社会学':['sociology'],'人类学':['anthropology'],'历史学':['history'],'文学':['literature'],'哲学':['philosophy'],'经济学':['economics'],'心理学':['psychology'],'教育学':['education'],'法学':['law'],'传播学':['media'],'地理学':['development'],'考古学':['archaeology'],'语言学':['linguistics'],'艺术史':['art'],'公共政策':['development'],'宗教学':['religion']};
const existing=new Set(rich.map(r=>normalize(r.name)+'|'+normalize(r.university))),seen=new Set(),records=[],duplicates=[],sources=[],excludedTeaching=[];
const htmlDir=path.join(root,'artifacts','directory-html');
const responseMap=JSON.parse(fs.readFileSync(path.join(htmlDir,'manifest.json'),'utf8'));
for(const file of fs.readdirSync(htmlDir).filter(f=>f.endsWith('.meta.json'))){const meta=JSON.parse(fs.readFileSync(path.join(htmlDir,file),'utf8'));responseMap[meta.url]=meta;}
const proof=[];
for(const file of batches){const full=path.join(root,'artifacts','directory-batches',file);if(!fs.existsSync(full))continue;const batch=JSON.parse(fs.readFileSync(full,'utf8'));const rows=Array.isArray(batch)?batch:batch.records;
 if(!Array.isArray(rows))throw Error('Missing records in '+file);
 if(batch.sources)sources.push(...batch.sources);
 for(const row of rows){
  const profileUrl=C.safeUrl(row.profileUrl),directoryUrl=C.safeUrl(row.directoryUrl);if(!profileUrl||!directoryUrl||!row.name||!row.university)throw Error('Incomplete source record '+JSON.stringify(row));
  const meta=responseMap[directoryUrl]||Object.values(responseMap).find(m=>m.finalUrl===directoryUrl);
  if(!meta||meta.status!==200||!meta.file)throw Error('No successful saved official response for '+directoryUrl);
  const sourceText=fs.readFileSync(path.join(htmlDir,meta.file),'utf8');
  if(crypto.createHash('sha256').update(sourceText).digest('hex')!==meta.sha256)throw Error('Saved source hash mismatch: '+directoryUrl);
  const html=sourceText.replace(/&amp;/g,'&');
  const person=new URL(profileUrl),linkToken=person.pathname+person.search;
  if(!html.includes(profileUrl)&&!html.includes(linkToken)&&!html.includes(decodeURI(linkToken)))throw Error('Personal-page link not present in saved source: '+row.name+' '+profileUrl);
  if(/emerit|retired|visiting|adjunct|professor of (?:the )?practice|postdoc|graduate student|phd candidate/i.test(row.role||''))throw Error('Excluded role was collected: '+row.name+' '+row.role);
  if(/teaching professor|professor of teaching/i.test(row.role||'')||(['US','CA'].includes(row.country)&&/^lecturer$/i.test(row.role||''))){excludedTeaching.push({name:row.name,role:row.role,source:directoryUrl});continue;}
  const identity=normalize(row.name)+'|'+normalize(row.university),key=normalizeUrl(profileUrl);
  if(existing.has(identity)||seen.has(key)||seen.has(identity)){duplicates.push({name:row.name,university:row.university,profileUrl});continue;}
  existing.add(identity);seen.add(identity);seen.add(key);
  records.push({...row,id:'directory-'+crypto.createHash('sha256').update(key).digest('hex').slice(0,16),profileUrl,directoryUrl,keywords:(row.keywords||[]).slice(0,12),topics:topicsByDiscipline[row.discipline]||[]});
  proof.push({id:records.at(-1).id,source:directoryUrl,profileUrl,sourceSha256:meta.sha256,linkFound:true});
 }
}
const payload=JSON.stringify(records);
const source=`/* Public official directory leads. Individual funding, entry requirements and recent works remain unverified. */
globalThis.COMPASS_DIRECTORY = ${payload}.map(x=>({
 id:x.id,name:x.name,initials:x.name.split(/\\s+/).map(t=>t[0]).slice(0,2).join('').toUpperCase(),university:x.university,universityZh:x.universityZh||'',country:x.country,department:x.department,discipline:x.discipline,topics:x.topics,keywords:x.keywords,methods:[],paths:[],dataTier:'directory',role:x.role||'',profileUrl:x.profileUrl,directoryUrl:x.directoryUrl,checked:x.checked,
 summary:(x.keywords.length?'官网名录研究领域：'+x.keywords.join('；'):'官网名录列于'+x.department+'。具体研究问题与方法需查阅个人资料。')+(x.availabilityNote?' 名录提示：'+x.availabilityNote:''),
 fitNote:'仅核对官网院系名录、身份和名录中列出的字段；学科标签不是个人课题、导师资格或招生确认。',
 eligibility:'unknown',funding:'unknown',admission:'unknown',program:'院系研究学位入口、个人指导资格及目标年度招生待核实。',eligibilityNote:'未核查该人的具体学位指导资格、本科直博要求或先修背景。',fundingNote:'未核查对应项目资金；不能从教师身份或名录推断全奖。',admissionNote:'官网列有教师身份，不表示正在招收博士或研究型硕士。'+(x.availabilityNote?' 名录提示：'+x.availabilityNote+'；不由此推断拒收。':''),
 contact:{email:x.email||'',url:x.profileUrl,office:x.role||'',checked:x.email?x.checked:''},
 students:{status:'unknown',undergrad:'unknown',bachelorEntrants:'unknown',note:'本条为官网名录线索，尚未逐人核查公开学生及入学背景。',url:'',checked:'',records:[]},personalFunding:{status:'unknown',note:'尚未逐人核查个人经费、余额或新生资助名额。',url:'',checked:'',cycle:''},publications:[],pubCoverage:{status:'unknown',note:'尚未补查个人近三年成果；没有收录不等于没有发表。',url:x.profileUrl,checked:''},
 sources:[{type:'官网教师名录',title:x.university+' · '+x.department,url:x.directoryUrl,note:'核对姓名、官方个人页面链接及名录公开字段；不是招生或资金承诺。'}]
}));
`;
fs.writeFileSync(path.join(root,'data-directory.js'),source);
const sourceGroups=new Map();for(const r of records){const s=sourceGroups.get(r.directoryUrl)||{url:r.directoryUrl,university:r.university,discipline:r.discipline,count:0,checked:r.checked};s.count++;sourceGroups.set(r.directoryUrl,s);}
const report={directoryRecords:records.length,duplicatesRemoved:duplicates.length,excludedTeaching:excludedTeaching.length,universities:[...new Set(records.map(r=>r.university))],countries:[...new Set(records.map(r=>r.country))],sources:[...sourceGroups.values()],duplicates,excludedTeachingRecords:excludedTeaching};
fs.writeFileSync(path.join(root,'artifacts','directory-batches','build-report.json'),JSON.stringify(report,null,2));
fs.writeFileSync(path.join(root,'directory-provenance.json'),JSON.stringify({checked:'2026-11-08',records:proof,sources:[...new Map(proof.map(p=>[p.source,{url:p.source,sha256:p.sourceSha256}])).values()]},null,2));
fs.writeFileSync(path.join(root,'directory-sources.json'),JSON.stringify([...sourceGroups.keys()],null,2));
fs.writeFileSync(path.join(root,'DIRECTORY_SOURCES.md'),'# 官网名录来源\n\n以下为仅核对身份与名录公开字段的候选线索，不代表博士指导资格、在招或有资金。每人都保留从名录取得的官方个人页面链接；显式荣休、退休、访问、兼职、博士后和学生条目不收录，另排除明确的纯教学岗。英国普通 University Lecturer 不自动视作纯教学岗。\n\n| 院校 | 学科 | 新增线索 | 来源 | 查阅 |\n| --- | --- | ---: | --- | --- |\n'+[...sourceGroups.values()].map(s=>'| '+s.university+' | '+s.discipline+' | '+s.count+' | [官方名录]('+s.url+') | '+s.checked+' |').join('\n')+'\n\n去除已收录或跨来源重复身份 '+duplicates.length+' 条，排除明确教学岗 '+excludedTeaching.length+' 条。仅覆盖已读取的名录页面；不声称整个院系或全球完整。澳大利亚部分目录拒绝读取，未从失败响应补造数据。进一步核验需查看个人研究、项目资格、学生、近期成果与资金证据。原始抓取留在本地 artifacts/，不发布整页原文。\n');
console.log(JSON.stringify({directory:records.length,duplicates:duplicates.length,universities:report.universities.length,countries:report.countries,sources:sourceGroups.size}));
