const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'artifacts/directory-html/manifest.json'),'utf8'));
const decode=s=>s.replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"').replace(/&#039;|&apos;/g,"'").replace(/&rsquo;/g,'’').replace(/&ndash;/g,'–');
const text=s=>decode((s||'').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const checked='2026-11-08',records=[],sources=[];
const excluded=/emerit|retired|adjunct|visiting|practice|affiliate|honorary|postdoc|research fellow|teaching associate|graduate student|doctoral student|phd student/i;
function add(record){if(record.name&&record.profileUrl&&record.role&&!excluded.test(record.role))records.push(record);}
for(const url of ['https://www.sociology.cam.ac.uk/people/academic-staff','https://www.sociology.cam.ac.uk/people/academic-staff?page=1','https://www.sociology.cam.ac.uk/people/academic-staff?page=2']){
 const m=manifest[url];if(m?.status!==200)throw new Error('Expected successful official Cambridge page: '+url);
 const html=fs.readFileSync(path.join(root,'artifacts/directory-html',m.file),'utf8');
 let parsed=0;
 for(const match of html.matchAll(/<a\b([^>]*data-testid="card-person"[^>]*)>([\s\S]*?)<\/a>/g)){
  const href=match[1].match(/href="([^"]+)"/)?.[1],body=match[2],name=text(body.match(/<p\b[^>]*data-testid="card-name"[^>]*>([\s\S]*?)<\/p>/)?.[1]).replace(/^(Professor|Prof\.?|Dr\.?)\s+/i,'');
  const role=text(body.match(/<ul\b[^>]*data-testid="card-roles"[^>]*>([\s\S]*?)<\/ul>/)?.[1]);
  if(!href||!name||!role)continue;
  if(/professor|lecturer|associate|assistant/i.test(role)){add({name,profileUrl:new URL(decode(href),url).href,university:'University of Cambridge',universityZh:'剑桥大学',country:'UK',discipline:'社会学',department:'Department of Sociology',directoryUrl:url,checked,role,keywords:[]});parsed++;}
 }
 sources.push({...m,method:'Extract academic-staff card-person anchors, card-name and card-roles; reject explicitly excluded roles.',parsedCandidates:parsed});
}
{
 const url='https://sociology.ubc.ca/people/',m=manifest[url],html=fs.readFileSync(path.join(root,'artifacts/directory-html',m.file),'utf8');
 let parsed=0;
 for(const chunk of html.split(/(?=<div data-last-name=)/)){
  const classes=chunk.match(/^<div data-last-name="[^"]*" class="([^"]+)"/)?.[1]||'';
  if(!/\bfaculty\b/.test(classes)||!/\bcore-faculty\b/.test(classes))continue;
  const name=text(chunk.match(/<p[^>]*class="alt-name"[^>]*>([\s\S]*?)<\/p>/)?.[1]),role=text(chunk.match(/<p[^>]*class="title"[^>]*>([\s\S]*?)<\/p>/)?.[1]);
  const href=chunk.match(/<a[^>]*href="(https:\/\/sociology\.ubc\.ca\/profile\/[^"\s]+)"/)?.[1];
  const keywords=[...chunk.matchAll(/<a[^>]*class="research-area-link"[^>]*>([\s\S]*?)<\/a>/g)].map(x=>text(x[1]));
  const email=decode(chunk.match(/href="mailto:([^"?]+)"/)?.[1]||'');
  const leaves=[...new Set([...chunk.matchAll(/<div class="on-leave-wrapper">([\s\S]*?)<\/div><\/div>/g)].map(x=>text(x[1])))];
  if(name&&href&&/professor|lecturer/i.test(role)){add({name,profileUrl:decode(href),university:'University of British Columbia',universityZh:'不列颠哥伦比亚大学',country:'CA',discipline:'社会学',department:'Department of Sociology',directoryUrl:url,checked,role,keywords:[...new Set(keywords)],...(email?{email}:{}),...(leaves.length?{availabilityNote:'Official directory states: '+leaves.join('; ')}:{})});parsed++;}
 }
 sources.push({...m,method:'Extract only element-item faculty core-faculty cards; use official profile anchor, alt-name and title; reject excluded roles.',parsedCandidates:parsed});
}
const unique=[...new Map(records.map(r=>[r.profileUrl,r])).values()];
const output={checked,scope:'Directory identity verification only; no inference about admissions, doctoral supervision eligibility or personal funding.',sources,records:unique};
fs.mkdirSync(path.join(root,'artifacts/directory-batches'),{recursive:true});
fs.writeFileSync(path.join(root,'artifacts/directory-batches/uk-au.json'),JSON.stringify(output,null,2));
console.log(JSON.stringify({total:unique.length,byUniversity:Object.fromEntries([...new Set(unique.map(x=>x.university))].map(u=>[u,unique.filter(r=>r.university===u).length])),sample:unique.slice(0,4)},null,2));
