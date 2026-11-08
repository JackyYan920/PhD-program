const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'artifacts','directory-html');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&#0?39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([a-f0-9]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const sources=[
 ['https://politicalscience.stanford.edu/people/faculty','政治学','Department of Political Science'],
 ['https://sociology.stanford.edu/people/faculty','社会学','Department of Sociology'],
 ['https://anthropology.stanford.edu/people/faculty','人类学','Department of Anthropology']
];
const records=[],reports=[];
for(const [url,discipline,department]of sources){
 const meta=manifest[url];if(meta?.status!==200)throw Error('Missing official source '+url);
 const html=fs.readFileSync(path.join(dir,meta.file),'utf8');
 const headings=[...html.matchAll(/<h[23][^>]*>\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h[23]>/g)].filter(m=>m[1].startsWith('/people/')&&!m[1].includes('/faculty'));
 let accepted=0;
 for(let i=0;i<headings.length;i++){
  const m=headings[i],segment=html.slice(m.index,headings[i+1]?.index||html.length);
  const role=decode(segment.match(/views-field-(?:field-hs-person-title|custm-faculty-type)[\s\S]*?class="field-content[^"]*">([\s\S]*?)<\/(?:div|em)>/)?.[1]||'');
  if(!/professor/i.test(role)||/emerit|retired|visiting|adjunct|professor of (?:the )?practice|lecturer/i.test(role))continue;
  const name=decode(m[2]);if(!name||name.split(' ').length<2)continue;
  const areas=decode(segment.match(/views-field-field-custm-area-s-of-specialization[\s\S]*?class="field-content[^"]*">([\s\S]*?)<\/div>/)?.[1]||'');
  const keywords=areas?areas.split(/;\s*/).filter(Boolean):[...segment.matchAll(/href="\/research\/[^"#]+"[^>]*>([^<]+)<\/a>/g)].map(x=>decode(x[1]));
  const email=segment.match(/href="mailto:([^"?]+)[^"]*"/)?.[1]||'';
  records.push({name,profileUrl:new URL(m[1],url).href,university:'Stanford University',universityZh:'斯坦福大学',country:'US',discipline,department,directoryUrl:url,checked:'2026-11-08',role,email,keywords:[...new Set(keywords)].slice(0,12)});accepted++;
 }
 reports.push({url,discipline,accepted,sha256:meta.sha256});
}
fs.writeFileSync(path.join(root,'artifacts','directory-batches','stanford.json'),JSON.stringify({records,sources:reports},null,2));
console.log(JSON.stringify({count:records.length,withEmail:records.filter(r=>r.email).length,sources:reports}));
