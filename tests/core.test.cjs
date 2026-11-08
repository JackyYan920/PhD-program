const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../core.js');
require('../data.js');
const seeds=globalThis.COMPASS_SEEDS;
const profile=C.emptyState().profile;
test('six distinct starter candidates have safe official evidence links',()=>{
  assert.equal(seeds.length,6);assert.equal(new Set(seeds.map(r=>r.id)).size,6);
  for(const r of seeds){assert.ok(C.cleanRecord(r));assert.ok(r.sources.length);for(const s of r.sources){assert.equal(C.safeUrl(s.url),s.url);assert.match(new URL(s.url).hostname,/(\.edu|\.edu\.au)$/);}}
});
test('strict full funding only includes published program packages, not scholarship competitions',()=>{
  const results=C.filter(seeds,{funding:'package'},{},profile);
  assert.deepEqual(results.map(r=>r.id),['abraham-newman']);
});
test('undergraduate route includes conditional research training and excludes rare exceptions and unknowns',()=>{
  const results=C.filter(seeds,{path:'bachelor'},{},profile);
  assert.equal(results.length,3);assert.ok(results.every(r=>r.eligibility==='conditional'));
  assert.ok(!results.some(r=>r.id==='jessica-chen-weiss'));
});
test('MPhil, geography, and topic filters combine with AND; topics combine with OR',()=>{
  const results=C.filter(seeds,{path:'mphil',country:'AU',topics:['minerals','geoeconomics']},{},profile);
  assert.equal(results.length,3);
  assert.equal(C.filter(seeds,{path:'mphil',country:'US'},{},profile).length,0);
});
test('search supports English keyword aliases, Chinese schools, and multiple AND terms',()=>{
  assert.equal(C.filter(seeds,{q:'Georgetown china'},{},profile)[0].id,'abraham-newman');
  assert.equal(C.filter(seeds,{q:'国立 稀土'},{},profile).length,1);
  assert.equal(C.filter(seeds,{q:'全角不存在'},{},profile).length,0);
});
test('known paused programs are not mislabeled as available',()=>{
  const weiss=seeds.find(r=>r.id==='jessica-chen-weiss');assert.equal(weiss.admission,'paused');assert.equal(weiss.eligibility,'exception');
  assert.ok(!C.filter(seeds,{hidePaused:true},{},profile).includes(weiss));
});
test('match is transparent equal-weight overlap, with safe zero-preference behavior',()=>{
  assert.deepEqual(C.match(seeds[0],['geoeconomics','minerals','geoeconomics']),{matched:['geoeconomics'],total:2});
  assert.deepEqual(C.match(seeds[0],[]),{matched:[],total:0});
});
test('personal status updates require valid dated evidence, and future evidence is ignored',()=>{
  const r=seeds[0];assert.equal(C.effective(r,{evidence:[{kind:'招生',status:'open'}]}).admission,'unknown');
  const e=C.cleanEntry({evidence:[{kind:'招生',status:'open',url:'https://anu.edu.au/',date:'2026-11-08',note:'用户核验的目标年度说明'}]});
  assert.equal(C.effective(r,e).admission,'open');assert.equal(C.effective(r,e).admissionNote,'用户核验的目标年度说明');
  assert.equal(C.effective(r,{evidence:[{...e.evidence[0],date:'2099-01-01'}]}).admission,'unknown');
  assert.equal(r.admission,'unknown');
});
test('newer evidence wins even if older evidence was imported later',()=>{
  const e={evidence:[{kind:'资金',status:'competitive',url:'https://anu.edu.au/',date:'2026-11-08',note:'new'},{kind:'资金',status:'package',url:'https://anu.edu.au/',date:'2026-01-01',note:'old'}]};
  assert.equal(C.effective(seeds[0],e).funding,'competitive');
});
test('JSON migration round-trips drafts, dates and notes; merges preserve existing unique records',()=>{
  const a=C.emptyState();a.entries['darren-lim']=C.cleanEntry({saved:true,notes:'现有',draft:'Dear…',followup:'2027-01-15'});a.entries['amy-king']=C.cleanEntry({saved:true,notes:'保留'});
  const b=C.emptyState();b.entries['darren-lim']=C.cleanEntry({saved:true,notes:'更新'});
  const merged=C.mergeState(a,JSON.parse(JSON.stringify(b)),seeds.map(r=>r.id));
  assert.equal(merged.entries['darren-lim'].notes,'更新');assert.equal(merged.entries['amy-king'].notes,'保留');
  const roundtrip=C.parseState(JSON.parse(JSON.stringify(a)));assert.equal(roundtrip.entries['darren-lim'].draft,'Dear…');assert.equal(roundtrip.entries['darren-lim'].followup,'2027-01-15');
});
test('untrusted imports reject unknown formats and prototype pollution',()=>{
  assert.throws(()=>C.parseState({version:99}));
  const raw=JSON.parse('{"version":1,"entries":{"__proto__":{"saved":true}},"profile":{"topics":["constructor","minerals"]}}');
  const clean=C.parseState(raw);assert.equal(Object.getPrototypeOf(clean.entries),null);assert.deepEqual(clean.profile.topics,['minerals']);assert.equal({}.saved,undefined);
});
test('imported candidates cannot shadow seed records; duplicate custom IDs are merged',()=>{
  const a=C.emptyState(),b=C.emptyState();b.custom=[{...seeds[0],name:'Spoofed'}];
  assert.equal(C.mergeState(a,b,seeds.map(r=>r.id)).custom.length,0);
});
test('unsafe links are discarded and HTML is escaped',()=>{
  for(const url of ['javascript:alert(1)','data:text/html,test','file:///tmp/x','https://user:secret@example.com/'])assert.equal(C.safeUrl(url),'');
  assert.equal(C.escape('<img onerror="x">'), '&lt;img onerror=&quot;x&quot;&gt;');
  const clean=C.cleanEntry({evidence:[{kind:'资金',url:'javascript:alert(1)',date:'2026-11-08',note:'x'}]});assert.equal(clean.evidence.length,0);
});
test('CSV export neutralizes spreadsheet formulas and escapes delimiters',()=>{
  assert.equal(C.csv('=HYPERLINK("evil")'),'"\'=HYPERLINK(""evil"")"');
  assert.equal(C.csv('  +cmd'),'"\'  +cmd"');assert.equal(C.csv('A,"B"'),'"A,""B"""');
});
test('invalid dates are rejected, stale evidence is marked, and saved filtering respects empty lists',()=>{
  assert.equal(C.date('2026-02-30'),'');assert.equal(C.date('2028-02-29'),'2028-02-29');assert.equal(C.stale('2026-01-01','2026-11-08'),true);
  assert.equal(C.filter(seeds,{saved:true},{},profile).length,0);
  assert.equal(C.filter(seeds,{saved:true},{'darren-lim':{saved:true}},profile).length,1);
});

test('all humanities and social science profiles are supported without an IR default',()=>{
  for (const discipline of ['历史学','哲学','语言学','经济学','教育学','宗教学','艺术史','其他人文社科']) assert.equal(C.DISCIPLINES[discipline],discipline);
  assert.deepEqual(C.emptyState().profile.topics,[]);
  const record=C.cleanRecord({...seeds[0],id:'history-scholar',discipline:'历史学',country:'UK',keywords:['oral history'],methods:['archives','qual'],topics:['history']});
  assert.equal(record.discipline,'历史学');assert.equal(record.country,'UK');
  assert.equal(C.filter([record],{q:'oral history',country:'UK',discipline:'历史学'},{},C.emptyState().profile).length,1);
});

test('v1 backups retain original profile fields and new application preparation fields',()=>{
  const old=C.parseState({version:1,profile:{name:'Name',topics:['minerals'],background:'Undergraduate',question:'A question'},entries:{},custom:[]});
  assert.equal(old.profile.question,'A question');assert.deepEqual(old.profile.topics,['minerals']);
  const expanded={...old,profile:{...old.profile,major:'历史',discipline:'历史学',degreeLevel:'bachelor',grades:'87/100',publicationsText:'Working paper',publicationStatus:'draft',researchText:'Oral history',keywords:'memory, archives',methods:['archives'],connection:'reply',connectionText:'One academic reply',recommendation:'identified',recommendationText:'Thesis advisor',languageText:'IELTS not yet taken'}};
  const migrated=C.parseState(JSON.parse(JSON.stringify(expanded)));
  for(const key of ['major','discipline','degreeLevel','grades','publicationsText','publicationStatus','researchText','keywords','methods','connection','connectionText','recommendation','recommendationText','languageText'])assert.deepEqual(migrated.profile[key],expanded.profile[key]);
});

test('extended dossiers sanitize contacts and retain publicly sourced records through export/import',()=>{
  const record=C.cleanRecord({...seeds[0],contact:{email:'person@university.edu',url:'https://university.edu/profile',office:'Public office',checked:'2026-11-08'},students:{status:'listed',undergrad:'yes',bachelorEntrants:'unknown',url:'https://university.edu/students',checked:'2026-11-08',records:[{name:'Public Student',degree:'PhD',startYear:2024,relation:'Primary supervisor',url:'https://university.edu/student',checked:'2026-11-08'}]},personalFunding:{status:'grant',url:'https://university.edu/project',checked:'2026-11-08',note:'Grant does not promise student funding'},publications:[{title:'Public paper',date:'2025-05-10',type:'article',venue:'Journal',url:'https://doi.org/10.1000/example',sourceUrl:'https://university.edu/pubs',checked:'2026-11-08'}],pubCoverage:{status:'selected',url:'https://university.edu/pubs',checked:'2026-11-08',note:'Selected only'}});
  assert.equal(record.contact.email,'person@university.edu');assert.equal(record.students.records[0].startYear,2024);assert.equal(record.publications[0].year,2025);
  const state=C.emptyState();state.custom=[{...record,id:'custom-history'}];const restored=C.parseState(JSON.parse(JSON.stringify(state)));
  assert.equal(restored.custom[0].publications[0].sourceUrl,'https://university.edu/pubs');assert.equal(restored.custom[0].personalFunding.status,'grant');
  assert.equal(C.email('person@university.edu\r\nBcc: other@university.edu'),'');assert.equal(C.email('mailto:person@university.edu'),'');
  assert.throws(()=>C.cleanRecord({...record,id:'__proto__'}));assert.throws(()=>C.cleanRecord({...record,id:'constructor'}));
});

test('partial personal dossiers overlay only selected fields and preserve seeded evidence',()=>{
  const original=C.cleanRecord({...seeds[0],contact:{email:'original@anu.edu.au',url:'https://anu.edu.au/',checked:'2026-11-08'},publications:[{title:'Original paper',year:2025}]});
  const entry=C.cleanEntry({saved:true,dossier:{contact:{email:'updated@anu.edu.au',url:'https://anu.edu.au/contact',checked:'2026-11-08'},unexpected:'discarded'}});
  const result=C.effective(original,entry);assert.equal(result.contact.email,'updated@anu.edu.au');assert.equal(original.contact.email,'original@anu.edu.au');assert.equal(result.publications[0].title,'Original paper');assert.equal(entry.dossier.unexpected,undefined);
  const state=C.emptyState();state.entries[original.id]=entry;assert.equal(C.parseState(JSON.parse(JSON.stringify(state))).entries[original.id].dossier.contact.email,'updated@anu.edu.au');
});

test('personal project grants and institutional packages never satisfy confirmed personal funding',()=>{
  const base=C.cleanRecord({...seeds[0],personalFunding:{status:'grant',url:'https://anu.edu.au/project',checked:C.today()}});
  const available={...base,id:'available',personalFunding:{status:'available',url:'https://anu.edu.au/position',checked:C.today()}};
  const unverified={...available,id:'unverified',personalFunding:{status:'available',url:'',checked:C.today()}};
  const future={...available,id:'future',personalFunding:{status:'available',url:'https://anu.edu.au/position',checked:'2099-01-01'}};
  assert.deepEqual(C.filter([base,available,unverified,future],{personalFunding:true},{},C.emptyState().profile).map(r=>r.id),['available']);
  const report=C.assessment(base,{degreeLevel:'bachelor'});assert.equal(report.dimensions.find(d=>d.key==='personalFunding').status,'caution');
});

test('undergraduate supervision and bachelor-to-PhD evidence are independent and source-gated',()=>{
  const base=C.cleanRecord({...seeds[0],students:{status:'listed',undergrad:'yes',bachelorEntrants:'unknown',url:'https://anu.edu.au/students',checked:C.today()}});
  const direct={...base,id:'direct',students:{...base.students,undergrad:'unknown',bachelorEntrants:'yes'}};
  const noSource={...base,id:'unconfirmed',students:{...base.students,url:''}};
  assert.deepEqual(C.filter([base,direct,noSource],{bachelorEvidence:'undergrad'},{},profile).map(r=>r.id),[base.id]);
  assert.deepEqual(C.filter([base,direct,noSource],{bachelorEvidence:'bachelorEntrants'},{},profile).map(r=>r.id),['direct']);
});

test('recent publications use rolling dates, exclude future works, and keep unknown boundary dates separate',()=>{
  const r={publications:[{title:'Within',date:'2024-01-01',year:2024},{title:'Exact boundary',date:'2023-11-08',year:2023},{title:'Too old',date:'2023-11-07',year:2023},{title:'Future',date:'2026-11-09',year:2026},{title:'Partial start year',year:2023},{title:'Partial current year',year:2026},{title:'Whole year in range',year:2025}]};
  const result=C.recentPublications(r,'2026-11-08');
  assert.equal(result.from,'2023-11-08');assert.equal(result.to,'2026-11-08');assert.deepEqual(result.items.map(x=>x.title),['Whole year in range','Within','Exact boundary']);assert.equal(result.boundary.length,2);
  assert.equal(C.recentPublications({publications:[]},'2024-02-29').from,'2021-02-28');
});

test('connections and recommendation readiness cannot change research fit or create acceptance probabilities',()=>{
  const p={topics:['minerals'],major:'History',discipline:'历史学',degreeLevel:'bachelor',methods:['archives'],connection:'none',recommendation:'unknown',publicationStatus:'none'};
  const a=C.assessment(C.cleanRecord(seeds[0]),p),b=C.assessment(C.cleanRecord(seeds[0]),{...p,connection:'interest',recommendation:'confirmed'});
  assert.deepEqual(a.dimensions.find(d=>d.key==='research'),b.dimensions.find(d=>d.key==='research'));
  assert.equal(a.dimensions.find(d=>d.key==='eligibility').status,'caution');
  assert.equal(b.dimensions.find(d=>d.key==='recommendation').status,'ready');
  assert.ok(!Object.hasOwn(a,'probability'));assert.ok(!Object.hasOwn(a,'score'));
  assert.equal(a.counts.total,a.dimensions.length);
  assert.match(a.dimensions.find(d=>d.key==='publications').detail,/不能据此判定不合格/);
});

test('honours or masters study does not automatically prove admission eligibility',()=>{
  for(const degreeLevel of ['honours','master'])assert.equal(C.assessment(C.cleanRecord(seeds[0]),{degreeLevel}).dimensions.find(d=>d.key==='eligibility').status,'unknown');
  const unknown=C.assessment(C.cleanRecord({...seeds[0],eligibility:'unknown'}),{degreeLevel:'bachelor'});assert.equal(unknown.dimensions.find(d=>d.key==='eligibility').status,'unknown');
});

test('personal funding dropdown separates available funding, grants and unknown metadata',()=>{
  const base=C.cleanRecord(seeds[0]),source={url:'https://anu.edu.au/funding',checked:C.today()};
  const records=[
    {...base,id:'available',personalFunding:{...source,status:'available'}},
    {...base,id:'grant',personalFunding:{...source,status:'grant'}},
    {...base,id:'none',personalFunding:{...source,status:'none'}},
    {...base,id:'unknown',personalFunding:{...source,status:'unknown'}},
    {...base,id:'missing',personalFunding:undefined},
    {...base,id:'unsourced',personalFunding:{status:'available'}},
    {...base,id:'future',personalFunding:{...source,status:'grant',checked:'2099-01-01'}}
  ];
  const select=personalFunding=>C.filter(records,{personalFunding},{},C.emptyState().profile).map(r=>r.id).sort();
  assert.deepEqual(select('available'),['available']);assert.deepEqual(select(true),['available']);assert.deepEqual(select('grant'),['grant']);
  assert.deepEqual(select('unknown'),['future','missing','unknown','unsourced']);assert.equal(select('').length,7);assert.equal(select(false).length,7);
});

test('student claims need a dated source distinct from anonymous or undated individual records',()=>{
  const base=C.cleanRecord({...seeds[0],students:{status:'listed',undergrad:'yes',bachelorEntrants:'yes',url:'https://anu.edu.au/students',checked:C.today(),records:[{name:'Public Student',degree:'PhD',startYear:2025,url:'https://anu.edu.au/student',checked:C.today()}]}});
  assert.equal(C.filter([base],{bachelorEvidence:'undergrad'},{},profile).length,1);
  assert.equal(C.filter([{...base,students:{...base.students,checked:''}}],{bachelorEvidence:'undergrad'},{},profile).length,0);
  assert.equal(C.filter([{...base,students:{...base.students,checked:'2099-01-01'}}],{bachelorEvidence:'bachelorEntrants'},{},profile).length,0);
  assert.equal(C.filter([{...base,students:{...base.students,url:'javascript:alert(1)'}}],{bachelorEvidence:'bachelorEntrants'},{},profile).length,0);
});

test('exact current-year dates enter recent publications while year-only citations stay uncertain',()=>{
  const paper=title=>({title,year:2026,url:'https://doi.org/10.1000/example'});
  const result=C.recentPublications({publications:[{...paper('Published'),date:'2026-06-01'},paper('Month unknown'),{...paper('Forthcoming'),date:'2026-12-01'}]},'2026-11-08');
  assert.deepEqual(result.items.map(p=>p.title),['Published']);assert.deepEqual(result.boundary.map(p=>p.title),['Month unknown']);
});

test('individual replies and interest signals apply only to the named candidate',()=>{
  const r=C.cleanRecord(seeds[0]),base={connection:'reply',connectionText:'A professor replied'};
  const dimension=p=>C.assessment(r,p).dimensions.find(d=>d.key==='connection');
  assert.equal(dimension(base).status,'unknown');
  assert.equal(dimension({...base,connectionTarget:'Another Professor'}).status,'unknown');
  assert.equal(dimension({...base,connectionTarget:' DARREN   LIM '}).status,'ready');
  assert.equal(dimension({...base,connection:'interest',connectionTarget:r.id}).status,'ready');
  assert.equal(dimension({...base,connection:'interest',connectionTarget:'another-professor'}).status,'unknown');
  const state=C.emptyState();state.profile=C.cleanProfile({...base,connectionTarget:r.name});
  assert.equal(C.parseState(JSON.parse(JSON.stringify(state))).profile.connectionTarget,r.name);
  assert.equal(dimension({connection:'academic'}).status,'ready');
  assert.match(dimension(base).detail,/不能将其他联系/);
});
