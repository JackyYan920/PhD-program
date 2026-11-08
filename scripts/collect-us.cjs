const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'artifacts','directory-html');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));
const text=s=>String(s||'').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&#0?39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&ndash;|&#8211;/g,'–').replace(/&mdash;|&#8212;/g,'—').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([a-f0-9]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/\s+/g,' ').trim();
const specs=[
 ['https://philosophy.yale.edu/people/faculty','哲学','Department of Philosophy','philosophy'],
 ['https://history.yale.edu/people/faculty','历史学','Department of History','history'],
 ['https://english.yale.edu/people/faculty','文学','Department of English','english'],
 ['https://economics.yale.edu/people/faculty','经济学','Economic Growth Center / Economics','economics']
];
for(let page=1;page<=4;page++)specs.push(['https://history.yale.edu/people/faculty?page='+page,'历史学','Department of History','history']);
const records=[],reports=[];
function accept(spec,meta,name,href,role,keywords=[],email=''){
 if(!/professor/i.test(role)||/emerit|retired|visiting|adjunct|professor (?:in|of) (?:the )?practice|lecturer|postdoc/i.test(role))return false;
 name=text(name);if(!name||name.split(' ').length<2||!href)return false;
 const profileUrl=new URL(href,meta.finalUrl||spec[0]).href;
 if(!new URL(profileUrl).hostname.endsWith('yale.edu'))return false;
 if(records.some(r=>r.profileUrl===profileUrl))return false;
 records.push({name,profileUrl,university:'Yale University',universityZh:'耶鲁大学',country:'US',discipline:spec[1],department:spec[2],directoryUrl:spec[0],checked:'2026-11-08',role:text(role),keywords:keywords.map(text).filter(Boolean).slice(0,15),email:text(email)});return true;
}
for(const spec of specs){
 const meta=manifest[spec[0]];if(meta?.status!==200)throw Error('Missing downloaded directory '+spec[0]);
 const html=fs.readFileSync(path.join(dir,meta.file),'utf8');let accepted=0,examined=0;
 if(spec[3]==='history'||spec[3]==='english'){
  for(const row of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)){
   const cells=[...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map(m=>m[1]);
   const nameCell=cells.find(c=>/class="username"/.test(c));if(!nameCell)continue;examined++;
   const link=nameCell.match(/<a\b[^>]*href="([^"]+)"[^>]*class="username"[^>]*>([\s\S]*?)<\/a>/);
   if(!link)continue;
   const role=spec[3]==='history'?text(nameCell.replace(link[0],'')):text(cells.find(c=>/Professor|Lecturer|Fellow|Residence/i.test(text(c))&&!c.includes('class="username"'))||'');
   const fields=spec[3]==='history'?text(cells.at(-1)).split(/;\s*/):[];
   if(accept(spec,meta,link[2],link[1],role,fields))accepted++;
  }
 } else if(spec[3]==='philosophy'){
  for(const row of html.matchAll(/<li\b[^>]*class="directory-listing-card"[^>]*>([\s\S]*?)<\/li>/g)){
   const heading=row[1].match(/<a\b[^>]*class="directory-listing-card__heading-link"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
   if(!heading)continue;examined++;
   const role=text(row[1].match(/class="directory-listing-card__subheading"[^>]*>([\s\S]*?)<\/div>/)?.[1]);
   const email=row[1].match(/href="mailto:([^"?]+)[^"]*"/)?.[1]||'';
   if(accept(spec,meta,heading[2],heading[1],role,[],email))accepted++;
  }
 } else {
  for(const row of html.matchAll(/<article\b[^>]*id="node-person-[^"]+"[^>]*>([\s\S]*?)<\/article>/g)){
   const heading=row[1].match(/class="node-teaser__heading"[^>]*>[\s\S]*?<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);if(!heading)continue;examined++;
   const role=text(row[1].match(/class="node-teaser__professional-title"[^>]*>([\s\S]*?)<\/div>/)?.[1]);
   if(accept(spec,meta,heading[2],heading[1],role))accepted++;
  }
 }
 reports.push({url:spec[0],finalUrl:meta.finalUrl,discipline:spec[1],department:spec[2],examined,accepted,sha256:meta.sha256,retrievedAt:meta.retrievedAt,note:spec[3]==='history'?'分页名录的当前下载页；非完整历史系名单。':'仅筛选名录中明确为常规教授职级的条目；不证明当前招生、主导师资格或资金。'});
}
const output={records,sources:reports};
fs.writeFileSync(path.join(root,'artifacts','directory-batches','us.json'),JSON.stringify(output,null,2));
console.log(JSON.stringify({count:records.length,sources:reports},null,2));
