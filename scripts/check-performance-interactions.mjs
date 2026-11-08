import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
if(process.argv.length<5) throw new Error('Usage: node scripts/check-performance-interactions.mjs BEFORE AFTER OUTPUT');
const roots=[['before',path.resolve(process.argv[2])],['after',path.resolve(process.argv[3])]];
const output=path.resolve(process.argv[4]);await fs.mkdir(output,{recursive:true});
const browser=await puppeteer.launch({executablePath:process.env.PUPPETEER_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--disable-software-rasterizer','--use-gl=disabled']});
const paths=['/','/services/wet-belt-replacement/','/services/timing-chain-replacement/','/services/engine-rebuild-birmingham/'];
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png'};
const states={}, screenshots={};
try {
 for(const pathname of paths) for(const width of [375,1350]) for(const [kind,root] of roots) {
  const context=await browser.createBrowserContext();const page=await context.newPage();await page.setViewport({width,height:width===375?812:940});
  let hold=kind==='after';const held=[];
  const respond=async r=>{
   const u=new URL(r.url());if(u.origin!=='https://quickvs.test')return r.abort();
   const f=path.join(root,u.pathname,u.pathname.endsWith('/')?'index.html':'');
   try {await r.respond({status:200,contentType:mime[path.extname(f)]||'text/plain',body:await fs.readFile(f)});}catch{await r.respond({status:404,body:'Missing'});}
  };
  await page.setRequestInterception(true);page.on('request',r=>{if(hold&&r.url().includes('.css'))held.push(r);else respond(r);});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('https://quickvs.test'+pathname,{waitUntil:kind==='after'?'domcontentloaded':'load'});
  const slug=pathname==='/'?'home':pathname.split('/').filter(Boolean).at(-1);
  const prefix=slug+'-'+width;
  const snap=async state=>{
   await page.waitForFunction(()=>[...document.images].filter(img=>{const r=img.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;}).every(img=>img.complete&&img.naturalWidth>0));
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].filter(img=>{const r=img.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;}).map(img=>img.decode().catch(()=>{})));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
   const screenshot=await page.screenshot({path:path.join(output,`${prefix}-${state}-${kind}.png`)});
   const screenshotKey=prefix+'-'+state;
   if(kind==='before') screenshots[screenshotKey]=screenshot;
   else assert.deepEqual(screenshot,screenshots[screenshotKey],screenshotKey+': screenshot bytes');
   const data=await page.evaluate(()=>({panelHidden:document.querySelector('[data-consent-panel]').hidden,dockHidden:document.querySelector('.mobile-call-bar').hidden,phone:[...document.querySelectorAll('a[href^="tel:"]')].map(a=>a.getAttribute('href')),whatsapp:[...document.querySelectorAll('a[href^="https://wa.me/"]')].map(a=>a.getAttribute('href')),navOpen:document.querySelector('[data-nav]').classList.contains('is-open')}));
   const key=prefix+'-'+state;
   if(kind==='before') states[key]=data;else assert.deepEqual(data,states[key],key);
  };
  if(width===375){
   await page.click('[data-nav-toggle]');await snap('menu');await page.keyboard.press('Escape');
  }else{
   await page.click('.services-nav-item > summary');await snap('menu');await page.click('.services-nav-item > summary');
  }
  await page.click('[data-consent="reject"]');await snap('rejected');
  if(hold){hold=false;await Promise.all(held.map(respond));await page.waitForFunction(()=>[...document.querySelectorAll('link[as="style"]')].every(l=>l.rel==='stylesheet'));}
  await page.evaluate(()=>scrollTo({top:2500,behavior:'instant'}));
  await page.waitForFunction(()=>!document.querySelector('.mobile-call-bar').hidden||innerWidth>760);
  await snap('scrolled');
  await page.click('[data-cookie-settings]');await snap('cookie-settings');await page.click('[data-consent="accept"]');
  assert.deepEqual(errors,[],prefix+': console script errors');
  await context.close();console.log(prefix+' '+kind+' passed');
 }
}finally{await browser.close();}
