/* Optional, user-initiated Crossref lookup. No applicant profile is sent. */
(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CompassLiterature=api;})(globalThis,()=>{
  const TYPES={'journal-article':'article',book:'book',monograph:'book','edited-book':'book','book-chapter':'chapter','book-section':'chapter','proceedings-article':'conference',report:'report','posted-content':'preprint'};
  function fullDate(value){
    if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return '';
    const day=new Date(value+'T00:00:00Z');
    return Number.isFinite(+day)&&day.toISOString().slice(0,10)===value?value:'';
  }
  function windowDates(now){
    const to=fullDate(now||new Date().toISOString().slice(0,10));
    if(!to)throw new Error('书目检索日期无效。');
    const end=new Date(to+'T00:00:00Z'),start=new Date(end);
    start.setUTCFullYear(end.getUTCFullYear()-3);
    if(start.getUTCMonth()!==end.getUTCMonth())start.setUTCDate(0);
    return {from:start.toISOString().slice(0,10),to};
  }
  function queryUrl(name,now){const w=windowDates(now),q=new URLSearchParams({'query.author':name,filter:`from-pub-date:${w.from},until-pub-date:${w.to}`,rows:'8',select:'DOI,title,author,published,container-title,type,URL'});return 'https://api.crossref.org/works?'+q;}
  function publicationDate(value){
    const parts=value?.['date-parts']?.[0];
    if(!Array.isArray(parts)||parts.length<1||parts.length>3||!parts.every(Number.isInteger))return null;
    const [year,month,day]=parts;
    if(year<1800||year>2200)return null;
    if(parts.length>1&&(month<1||month>12))return null;
    const prefix=String(year).padStart(4,'0'),monthPrefix=prefix+'-'+String(month).padStart(2,'0');
    if(parts.length===3){const date=fullDate(monthPrefix+'-'+String(day).padStart(2,'0'));return date?{date,year,from:date,to:date,datePrecision:'day'}:null;}
    if(parts.length===2){const lastDay=new Date(Date.UTC(year,month,0)).getUTCDate();return {date:'',year,from:monthPrefix+'-01',to:monthPrefix+'-'+lastDay,datePrecision:'month'};}
    return {date:'',year,from:prefix+'-01-01',to:prefix+'-12-31',datePrecision:'year'};
  }
  function parse(payload,now){
    const items=payload?.message?.items;if(!Array.isArray(items))throw new Error('公开数据库没有返回有效书目。');
    const w=windowDates(now),out=[];
    for(const x of items){
      if(!x||!Object.hasOwn(TYPES,x.type))continue;
      const published=publicationDate(x.published);
      if(!published||published.to<w.from||published.from>w.to)continue;
      const rawDoi=typeof x.DOI==='string'?x.DOI.trim():'';
      const doi=/^10\.\d{4,9}\/[^\s<>]+$/i.test(rawDoi)?'https://doi.org/'+encodeURIComponent(rawDoi).replace(/%2F/gi,'/'):'';
      const title=Array.isArray(x.title)&&typeof x.title[0]==='string'?x.title[0].slice(0,1000).trim():'';
      if(!title||!doi)continue;
      out.push({title,date:published.date,year:published.year,datePrecision:published.datePrecision,type:TYPES[x.type],venue:Array.isArray(x['container-title'])?String(x['container-title'][0]||'').slice(0,500):'',url:doi,sourceUrl:doi,checked:w.to,authors:Array.isArray(x.author)?x.author.filter(a=>a&&typeof a==='object').map(a=>[a.given,a.family].filter(v=>typeof v==='string').join(' ')).filter(Boolean).join(', ').slice(0,2000)||'作者元数据缺失':'作者元数据缺失'});
      if(out.length===8)break;
    }
    return out;
  }
  async function lookup(name,now,fetchImpl=globalThis.fetch){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);try{const response=await fetchImpl(queryUrl(name,now),{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});if(!response.ok)throw new Error(response.status===429?'公开数据库暂时限流，请稍后再试。':'数据库暂不可用，请使用下方检索入口。');return parse(await response.json(),now);}finally{clearTimeout(timer);}}
  return {windowDates,queryUrl,parse,lookup};
});
