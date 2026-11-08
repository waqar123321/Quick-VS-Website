// Reproducible offline A/B guard: same browser, same origin, original files.
// This deliberately does not stand in for a live Google-tag network test.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const [beforeArg, afterArg, outputArg] = process.argv.slice(2);
if (!beforeArg || !afterArg || !outputArg) throw new Error('Usage: node scripts/check-performance.mjs BEFORE AFTER OUTPUT');
const before = path.resolve(beforeArg), after = path.resolve(afterArg), output = path.resolve(outputArg);
await fs.mkdir(output, {recursive:true});
const origin='https://quickvs.test';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.ico':'image/x-icon'};
const browser=await puppeteer.launch({executablePath:process.env.PUPPETEER_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--disable-software-rasterizer','--use-gl=disabled']});
async function filesAt(dir, base=dir) {
 const files=[];
 for(const e of await fs.readdir(dir,{withFileTypes:true})) {
  if(e.name.startsWith('.') || ['node_modules','_internal','dist'].includes(e.name)) continue;
  const f=path.join(dir,e.name);
  if(e.isDirectory()) files.push(...await filesAt(f,base));
  else if(e.name.endsWith('.html')) files.push(path.relative(base,f));
 }
 return files.sort();
}
function stripAllowedHeadChanges(html) {
 return html.replace(/<head>[\s\S]*?<\/head>/, head=>head
  .replace(/<style data-critical-css>[\s\S]*?<\/style>\n?/g,'')
  .replace(/<noscript>(<link rel="stylesheet"[^>]*>)<\/noscript>/g,'')
  .replace(/<link rel="preload" as="style" href="([^"]+)" onload="this.onload=null;this.rel='stylesheet'">\n/g,'<link rel="stylesheet" href="$1">')
  .replace(/<link rel="preload" as="image"[^>]*>\n?/g,'')
  .replace(/\n{2,}/g,'\n'));
}
function schemas(html) {return [...html.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)].map(m=>m[0]);}
async function makePage(root,viewport,holdCss=false,js=true) {
 const context=await browser.createBrowserContext();
 const page=await context.newPage();
 await page.setViewport(viewport);
 await page.setJavaScriptEnabled(js);
 const held=[], errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.setRequestInterception(true);
 const respond=async request=>{
  const url=new URL(request.url());
  if(url.origin!==origin) return request.abort();
  const file=path.join(root,url.pathname,url.pathname.endsWith('/')?'index.html':'');
  try {let body=await fs.readFile(file);if(url.pathname==='/services/timing-belt-replacement/') body=Buffer.from(body.toString().replace(/<meta http-equiv="refresh"[^>]*>/g,''));await request.respond({status:200,contentType:types[path.extname(file)]||'text/plain',body});}
  catch {await request.respond({status:404,body:'Not found'});}
 };
 page.on('request',r=>{
  if(holdCss && new URL(r.url()).pathname.endsWith('.css')) held.push(r);
  else respond(r).catch(e=>errors.push(e.message));
 });
 return {page,context,errors,release:async()=>{holdCss=false;await Promise.all(held.map(respond));}};
}
async function settled(page) {
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
}
const viewports=[{width:375,height:812},{width:1350,height:940}];
const inScope=['index.html','services/wet-belt-replacement/index.html','services/timing-chain-replacement/index.html','services/engine-rebuild-birmingham/index.html'];
const summary={pages:0,rawHtmlIdenticalExceptAllowed:true,jsonLdBlocks:0,bodyInnerTextComparisons:0,viewports,visual:[],errors:[]};
try {
 const files=await filesAt(before);
 assert.deepEqual(await filesAt(after),files,'Delivered HTML paths');
 for(const file of files) {
  const old=await fs.readFile(path.join(before,file),'utf8'), next=await fs.readFile(path.join(after,file),'utf8');
  assert.equal(stripAllowedHeadChanges(next),stripAllowedHeadChanges(old),file+': only permitted head changes');
  assert.deepEqual(schemas(next),schemas(old),file+': raw JSON-LD bytes');
  summary.jsonLdBlocks+=schemas(old).length;
  const url=origin+'/'+(file==='index.html'?'':file.replace(/index\.html$/,''));
  for(const viewport of viewports) {
   let oldText;
   for(const [root,kind] of [[before,'before'],[after,'after']]) {
    const p=await makePage(root,viewport);
    await p.page.goto(url,{waitUntil:'load'});
    await settled(p.page);
    const text=await p.page.evaluate(()=>document.body.innerText);
    if(kind==='before') oldText=text;
    else {assert.equal(text,oldText,file+': body.innerText at '+viewport.width);summary.bodyInnerTextComparisons++;}
    assert.deepEqual(p.errors,[],file+': script errors');
    if(inScope.includes(file)) {
     const slug=file==='index.html'?'home':file.split('/')[1];
     await p.page.screenshot({path:path.join(output,`${slug}-${viewport.width}-${kind}.png`)});
    }
    await p.context.close();
   }
  }
  summary.pages++; console.log('Compared '+file);
 }
 for(const file of ['sitemap.xml','robots.txt','script.js','quote-form.js','styles.css','assets/wet-belt.css','content/page-dates.json']) {
  assert.deepEqual(await fs.readFile(path.join(after,file)),await fs.readFile(path.join(before,file)),file+': unchanged bytes');
 }
 for(const file of inScope) {
  const url=origin+'/'+(file==='index.html'?'':file.replace(/index\.html$/,''));
  for(const viewport of viewports) {
   const p=await makePage(after,viewport,true);
   await p.page.goto(url,{waitUntil:'domcontentloaded'});
   await settled(p.page);
   const slug=file==='index.html'?'home':file.split('/')[1];
   await p.page.screenshot({path:path.join(output,`${slug}-${viewport.width}-critical-only.png`)});
   const geometry=()=>[...document.querySelectorAll('.site-header,main,main h1,.contact-actions,.consent-panel,.mobile-call-bar')].filter(el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}).map(el=>{const r=el.getBoundingClientRect().toJSON();if(el.tagName==='MAIN'){delete r.height;delete r.bottom;}return {selector:el.className,rect:JSON.stringify(r),display:getComputedStyle(el).display};});
   const early=await p.page.evaluate(geometry);
   await p.release();
   await p.page.waitForFunction(()=>[...document.querySelectorAll('link[as="style"]')].every(el=>el.rel==='stylesheet'));
   await settled(p.page);
   assert.deepEqual(await p.page.evaluate(geometry),early,file+': first-screen geometry must not shift on CSS arrival');
   assert.deepEqual(p.errors,[],file+': delayed CSS script errors');
   await p.context.close();
   // With JS disabled the noscript fallback must load the original full CSS.
   const noJs=await makePage(after,viewport,false,false);
   await noJs.page.goto(url,{waitUntil:'load'});
   await noJs.page.screenshot({path:path.join(output,`${slug}-${viewport.width}-noscript.png`)});
   await noJs.context.close();
   summary.visual.push({file,width:viewport.width,delayedCssGeometry:'identical',noscript:'rendered'});
  }
 }
 await fs.writeFile(path.join(output,'content-and-visual-summary.json'),JSON.stringify(summary,null,2)+'\n');
 console.log(JSON.stringify(summary,null,2));
} finally {await browser.close();}
