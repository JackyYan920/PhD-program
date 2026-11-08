const {spawnSync}=require('node:child_process');
const fs=require('node:fs');
for(const file of ['app.js','core.js','catalogue.js','data.js','data-broad.js','data-more-a.js','data-more-b.js','data-more-c.js','enrichment-original.js','literature.js','ui-extended.js']){
  const r=spawnSync(process.execPath,['--check',file],{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);
}
const tests=fs.readdirSync('tests').filter(f=>f.endsWith('.test.cjs')).map(f=>'tests/'+f);
process.exit(spawnSync(process.execPath,['--test',...tests],{stdio:'inherit'}).status||0);
