const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('../core.js'),fs=require('node:fs');
require('../data-directory.js');
const records=COMPASS_DIRECTORY.map(C.cleanRecord),proof=JSON.parse(fs.readFileSync('directory-provenance.json','utf8'));
test('expanded public catalogue contains substantial, uniquely sourced university identities',()=>{
 assert.ok(records.length>=150,'The directory expansion must add at least 150 real identities');
 assert.equal(new Set(records.map(r=>r.id)).size,records.length);
 assert.equal(proof.records.length,records.length);
 const evidence=new Map(proof.records.map(x=>[x.id,x]));
 for(const r of records){const p=evidence.get(r.id);assert.equal(r.dataTier,'directory');assert.ok(C.safeUrl(r.profileUrl));assert.equal(p.profileUrl,r.profileUrl);assert.equal(p.source,r.directoryUrl);assert.equal(p.linkFound,true);assert.match(p.sourceSha256,/^[a-f0-9]{64}$/);assert.ok(C.date(r.checked));assert.ok(!/emerit|retired|visiting|adjunct|phd candidate/i.test(r.role));}
});
test('a directory identity never implies an available studentship, an eligible degree path or a completed bibliography',()=>{
 for(const r of records){assert.equal(r.admission,'unknown');assert.equal(r.funding,'unknown');assert.equal(r.personalFunding.status,'unknown');assert.deepEqual(r.paths,[]);assert.deepEqual(r.publications,[]);assert.equal(r.students.bachelorEntrants,'unknown');}
 assert.equal(C.filter(records,{path:'phd'},{},C.emptyState().profile).length,0);
 assert.equal(C.filter(records,{path:'unknown'},{},C.emptyState().profile).length,records.length);
 assert.equal(C.filter(records,{dataTier:'researched'},{},C.emptyState().profile).length,0);
});
test('university filtering and pagination operate on the entire result set without losing records',()=>{
 const university=records[0].university,filtered=C.filter(records,{university},{},C.emptyState().profile);
 assert.ok(filtered.every(r=>r.university===university));
 const pages=Math.ceil(filtered.length/24),seen=[];
 for(let n=1;n<=pages;n++){const p=C.paginate(filtered,n);seen.push(...p.items.map(r=>r.id));assert.equal(p.total,filtered.length);assert.ok(p.items.length<=24);}
 assert.deepEqual(seen,filtered.map(r=>r.id));assert.equal(C.paginate(filtered,999).page,pages);assert.equal(C.paginate(filtered,-8).page,1);assert.equal(C.paginate([],1).start,0);
});
test('generic department tags do not become a positive research-fit claim',()=>{
 const r=records.find(r=>r.topics.length)||records[0];
 const p=C.cleanProfile({topics:r.topics,keywords:r.keywords.join(','),discipline:r.discipline});
 const dimension=C.assessment(r,p).dimensions.find(d=>d.key==='research');
 assert.notEqual(dimension.status,'match');assert.match(dimension.detail,/名录/);
});
