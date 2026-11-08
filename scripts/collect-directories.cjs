/* Download only explicitly listed public university directory pages for review. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),batchDir=path.join(root,'artifacts','directory-batches'),out=path.join(root,'artifacts','directory-html');
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(batchDir,{recursive:true});
function official(value){const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||!(/\.(edu|edu\.au|ac\.uk|ac\.nz|edu\.sg|edu\.hk|edu\.cn)$/.test(u.hostname)||/\.(utoronto|ubc|mcgill|uvic|dal|uottawa|uwaterloo|yorku|ualberta)\.ca$/.test(u.hostname)))throw Error('Only listed public university HTTPS domains are allowed: '+value);return u.href;}
const requestFiles=process.argv[2]?[path.resolve(root,process.argv[2])]:fs.readdirSync(batchDir).filter(f=>/^requests-.*\.json$/.test(f)).map(f=>path.join(batchDir,f));
const urls=[...new Set(requestFiles.flatMap(f=>JSON.parse(fs.readFileSync(f,'utf8')).map(x=>official(typeof x==='string'?x:x.url))))];
const manifestPath=path.join(out,'manifest.json');let manifest=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{};
const metaFile=url=>path.join(out,crypto.createHash('sha256').update(url).digest('hex').slice(0,20)+'.meta.json');
for(const [url,value]of Object.entries(manifest))if(!fs.existsSync(metaFile(url)))fs.writeFileSync(metaFile(url),JSON.stringify(value));
function publishManifest(){for(const file of fs.readdirSync(out).filter(x=>x.endsWith('.meta.json'))){try{const value=JSON.parse(fs.readFileSync(path.join(out,file),'utf8'));manifest[value.url]=value;}catch{}}fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2));}
async function fetchOne(url){
 if(manifest[url]?.status===200&&fs.existsSync(path.join(out,manifest[url].file))){console.log('CACHED '+url);return;}
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
 try{const response=await fetch(url,{signal:controller.signal,headers:{'User-Agent':'PhD Compass public faculty directory review'}});official(response.url);const body=await response.text();if(body.length>10000000)throw Error('Response exceeds review limit');
 const file=crypto.createHash('sha256').update(url).digest('hex').slice(0,20)+'.html';fs.writeFileSync(path.join(out,file),body);
 manifest[url]={url,finalUrl:response.url,status:response.status,file,bytes:Buffer.byteLength(body),sha256:crypto.createHash('sha256').update(body).digest('hex'),retrievedAt:new Date().toISOString()};console.log(response.status+' '+url+' -> '+file);
 }catch(error){manifest[url]={url,status:0,error:error.message,retrievedAt:new Date().toISOString()};console.log('ERROR '+url+' '+error.message);}
 finally{clearTimeout(timer);fs.writeFileSync(metaFile(url),JSON.stringify(manifest[url]));publishManifest();}
}
(async()=>{for(let i=0;i<urls.length;i+=3)await Promise.all(urls.slice(i,i+3).map(fetchOne));console.log('Directory responses recorded: '+Object.keys(manifest).length);})();
