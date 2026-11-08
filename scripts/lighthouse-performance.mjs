// Lighthouse uses a loopback fixture that closes when the suite ends.
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';

if(process.argv.length<5) throw new Error('Usage: node scripts/lighthouse-performance.mjs BEFORE AFTER OUTPUT');
const bases=process.argv.includes('--after-only')
 ? [['after',path.resolve(process.argv[3])]]
 : [['before',path.resolve(process.argv[2])],['after',path.resolve(process.argv[3])]];
const out=path.resolve(process.argv[4]);await fs.mkdir(out,{recursive:true});
// Optional offline vendor cache isolates CSS changes from Google response-time
// variation. Scripts still execute; collection replies are local test fixtures.
// Use normal network requests by leaving this environment variable unset.
const cache=process.env.PERFORMANCE_VENDOR_FIXTURES;
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.ico':'image/x-icon','.svg':'image/svg+xml','.txt':'text/plain','.xml':'application/xml'};
let root=bases[0][1];
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');const file=path.join(root,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
 try {
  let body;let contentType=mime[path.extname(file)]||'application/octet-stream';
  if(url.pathname.startsWith('/__test_vendor__/')){const fixture=JSON.parse(await fs.readFile(path.join(cache,path.basename(url.pathname).replace('.js','.json')),'utf8'));body=Buffer.from(fixture.body,'base64');contentType=fixture.contentType;}
  else body=await fs.readFile(file);const headers={'Content-Type':contentType,'Access-Control-Allow-Origin':'*','Cache-Control':'public, max-age=600'};
  if(/\.(html|css|js|svg|txt|xml)$/.test(file)&&req.headers['accept-encoding']?.includes('gzip')){body=gzipSync(body);headers['Content-Encoding']='gzip';}
  headers['Content-Length']=body.length;res.writeHead(200,headers);res.end(body);
 } catch {res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await puppeteer.launch({executablePath:process.env.PUPPETEER_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--disable-software-rasterizer','--use-gl=disabled']});
const paths=['/','/services/wet-belt-replacement/','/services/timing-chain-replacement/','/services/engine-rebuild-birmingham/'];
try {
 for(const [label,dir] of bases) {
  root=dir;
  for(const pathname of paths) for(let run=1;run<=3;run++) {
   const context=await browser.createBrowserContext();const page=await context.newPage();
   await page.setRequestInterception(true);
   page.on('request',async request=>{
    const url=new URL(request.url());
    if(!cache||url.origin===origin||!url.protocol.startsWith('http')) return request.continue();
    try {
     if(request.resourceType()==='script'){
      const key=createHash('sha256').update(request.url()).digest('hex');const fixture=path.join(cache,key+'.json');let response;
      try {response=JSON.parse(await fs.readFile(fixture,'utf8'));response.body=Buffer.from(response.body,'base64');}
      catch {throw new Error('Missing cached vendor script: '+request.url());}
      await request.continue({url:origin+'/__test_vendor__/'+key+'.js'});
     }else if(request.resourceType()==='image'){await request.respond({status:200,contentType:'image/gif',headers:{'access-control-allow-origin':'*'},body:Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7','base64')});}
     else {await request.respond({status:204,headers:{'access-control-allow-origin':'*','access-control-allow-methods':'GET, POST, OPTIONS','access-control-allow-headers':'*'}});}
    } catch(error) {console.error('Vendor fixture failed',url.hostname,url.pathname,error.message);await request.abort();}
   });
   const {lhr,report}=await lighthouse(origin+pathname,{logLevel:'error',output:['json','html'],onlyCategories:['performance','accessibility','best-practices','seo']},undefined,page);
   const name=label+'-'+(pathname==='/'?'home':pathname.split('/').filter(Boolean).at(-1))+'-'+run;
   await fs.writeFile(path.join(out,name+'.json'),report[0]);await fs.writeFile(path.join(out,name+'.html'),report[1]);
   console.log(JSON.stringify({label,pathname,run,scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,v.score*100])),lcp:lhr.audits['largest-contentful-paint'].numericValue,cls:lhr.audits['cumulative-layout-shift'].numericValue,tbt:lhr.audits['total-blocking-time'].numericValue,warnings:lhr.runWarnings}));
   await context.close();
  }
 }
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
