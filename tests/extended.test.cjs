const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const C=require('../core.js'),L=require('../literature.js');
require('../data.js');require('../data-broad.js');require('../enrichment-original.js');
require('../data-more-a.js');require('../data-more-b.js');require('../data-more-c.js');
const records=require('../catalogue.js')(C,COMPASS_SEEDS,COMPASS_ENRICHMENT,[COMPASS_BROAD_SEEDS,COMPASS_MORE_A,COMPASS_MORE_B,COMPASS_MORE_C]);
test('integrated catalogue has unique multi-discipline candidates and sourced contacts',()=>{
  assert.equal(records.length,32);assert.equal(new Set(records.map(r=>r.id)).size,records.length);
  for(const discipline of Object.keys(C.DISCIPLINES)) assert.ok(records.some(r=>r.discipline===discipline),discipline+' 应有实际导师记录');
  for(const r of records){assert.ok(C.safeUrl(r.contact.url));assert.ok(C.date(r.contact.checked));assert.ok(r.publications.length>0);for(const p of r.publications)assert.ok(p.title&&p.url&&p.sourceUrl);for(const t of r.topics)assert.ok(C.TOPICS[t]);}
  assert.equal(C.filter(records,{q:'Whistling a Thin Tune'},{},C.emptyState().profile)[0].id,'amia-srinivasan');
});
test('latest official recruitment evidence replaces old unknown rather than inventing availability',()=>{
  const r=records.find(r=>r.id==='darren-lim');assert.equal(r.admission,'closed');assert.match(r.admissionNote,/2026.*2027/);assert.ok(r.sources.some(s=>s.url.includes('/en/persons/darren-lim/')));
});
test('undergraduate mentoring does not imply bachelor entry; grants are distinct from studentships',()=>{
  const amy=records.find(r=>r.id==='amy-king');assert.equal(amy.students.undergrad,'yes');assert.equal(amy.students.bachelorEntrants,'unknown');
  const grant=records.filter(r=>r.personalFunding.status==='grant');assert.ok(grant.length>=2);assert.ok(!grant.some(r=>r.personalFunding.status==='available'));
});
test('Crossref only receives public faculty name and rolling publication window',()=>{
  const url=new URL(L.queryUrl('Test Faculty','2026-11-08'));assert.equal(url.searchParams.get('query.author'),'Test Faculty');assert.match(url.searchParams.get('filter'),/from-pub-date:2023-11-08,until-pub-date:2026-11-08/);assert.equal(url.searchParams.get('rows'),'8');assert.ok(!url.search.includes('profile'));
});
test('Crossref parser handles sparse metadata, suspicious links and future works',()=>{
  const input={message:{items:[{DOI:'10.1234/valid',title:['Verified title'],published:{'date-parts':[[2025,5,6]]},author:[{given:'A',family:'Scholar'}],type:'book'},{DOI:'javascript:evil',title:['Bad']},{DOI:'10.1234/future',title:['Future'],published:{'date-parts':[[2027,1,1]]}}]}};
  const out=L.parse(input,'2026-11-08');assert.equal(out.length,1);assert.equal(out[0].type,'book');assert.equal(out[0].authors,'A Scholar');assert.equal(out[0].date,'2025-05-06');assert.equal(out[0].url,'https://doi.org/10.1234/valid');
});
test('Crossref rate limits surface a useful failure and never modify local records',async()=>{
  await assert.rejects(()=>L.lookup('Scholar','2026-11-08',async()=>({ok:false,status:429})),/限流/);
});
test('Crossref supports explicit scholarly types and excludes reviews or unknown types',()=>{
  const work=type=>({DOI:'10.1234/'+type,title:['A work: '+type],published:{'date-parts':[[2025,6,1]]},type});
  for(const [source,expected]of Object.entries({'journal-article':'article',book:'book',monograph:'book','edited-book':'book','book-chapter':'chapter','book-section':'chapter','proceedings-article':'conference',report:'report','posted-content':'preprint'})){
    const parsed=L.parse({message:{items:[work(source)]}},'2026-11-08');assert.equal(parsed.length,1,source);assert.equal(parsed[0].type,expected,source);
  }
  for(const type of ['peer-review','other','grant','component','journal-issue','dataset','unknown',undefined])assert.equal(L.parse({message:{items:[work(type)]}},'2026-11-08').length,0,String(type));
  const replies=L.parse({message:{items:[{...work('peer-review'),title:['Reply on RC1']},work('journal-article')]}},'2026-11-08');assert.equal(replies.length,1);assert.equal(replies[0].type,'article');
});
test('Crossref validates complete dates and bounds partial dates without inventing a day',()=>{
  const work=(dateParts,title='Title')=>({DOI:'10.1234/test',title:[title],published:{'date-parts':[dateParts]},type:'journal-article'});
  for(const parts of [[2025,2,29],[2026,11,31],[2025,13,1],[2025,0,1],[2025,1,0],[2025,6,1,9],['2025',6,1],[2025,13]])assert.equal(L.parse({message:{items:[work(parts)]}},'2026-11-08').length,0,JSON.stringify(parts));
  const parsed=L.parse({message:{items:[work([2023,11,7],'Too old'),work([2023,11,8],'Boundary'),work([2026,11,8],'Today'),work([2026,11,9],'Future'),work([2026,12],'Future month'),work([2026,10],'Known month'),work([2024],'Known year')]}},'2026-11-08');
  assert.deepEqual(parsed.map(p=>p.title),['Boundary','Today','Known month','Known year']);assert.equal(parsed[2].date,'');assert.equal(parsed[2].datePrecision,'month');assert.equal(parsed[3].datePrecision,'year');
  assert.equal(L.parse({message:{items:[work([2024,2,29])]}},'2026-11-08')[0].date,'2024-02-29');
});
test('Crossref rolling window clamps leap days and limits the result count to eight',()=>{
  assert.deepEqual(L.windowDates('2024-02-29'),{from:'2021-02-28',to:'2024-02-29'});
  const coreWindow=C.recentPublications({publications:[]},'2026-11-08');
  assert.deepEqual(L.windowDates('2026-11-08'),{from:coreWindow.from,to:coreWindow.to});
  assert.throws(()=>L.windowDates('2026-02-30'),/无效/);
  const items=Array.from({length:12},(_,n)=>({DOI:'10.1234/'+n,title:['Paper '+n],published:{'date-parts':[[2025,6,1]]},type:'report'}));
  assert.equal(L.parse({message:{items}},'2026-11-08').length,8);
});
test('all scripts referenced by index are present and packaged by deployment workflow',()=>{
  const html=fs.readFileSync('index.html','utf8'),workflow=fs.readFileSync('.github/workflows/pages.yml','utf8');for(const [,file]of html.matchAll(/<script defer src="([^"]+)"/g)){assert.ok(fs.existsSync(file),file);assert.ok(workflow.includes(file),file);}
});
test('dossier display does not turn unsupported imported funding or student claims into confirmed facts',()=>{
  globalThis.Compass=C;require('../ui-extended.js');
  const r=C.cleanRecord({...records[0],students:{undergrad:'yes',bachelorEntrants:'yes'},personalFunding:{status:'available'}});
  const html=CompassUI.dossierSections(r,C.cleanEntry({}));
  assert.ok(html.includes('个人可用资金未知'));
  assert.ok(!html.includes('有明确学生资助机会'));
  assert.ok(!html.includes('<strong>有明确记录</strong>'));
});
