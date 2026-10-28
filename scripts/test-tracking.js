const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const source=fs.readFileSync(path.join(__dirname,"../script.js"),"utf8");
const head=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8").match(/<script>([\s\S]*?)<\/script>/)[1];
function fixture(stored=null,storageThrows=false,pageUrl="https://quickvs.com/services/performance-engine-rebuilds/?reg=private") {
  const listeners={},buttons={},scripts=[],events=[],cookies=[],storage=new Map();
  if(stored)storage.set("qsv-analytics-consent-v1",JSON.stringify(stored));
  const accept={dataset:{consent:"accept"},addEventListener(name,fn){this.click=fn},focus(){}};
  const reject={dataset:{consent:"reject"},addEventListener(name,fn){this.click=fn},focus(){}};
  const settings={addEventListener(name,fn){this.click=fn},focus(){this.focused=true}};
  const panel={hidden:true,querySelector(){return accept}};
  const year={textContent:""};
  const nav={classList:{open:false,toggle(){return this.open=!this.open},remove(){this.open=false}},addEventListener(name,fn){buttons.navClick=fn}};
  const toggle={attrs:{},setAttribute(name,value){this.attrs[name]=value},addEventListener(name,fn){buttons.toggle=fn}};
  const servicesMenu={open:false,contains(target){return target?.insideServicesMenu===true}};
  const document={
    referrer:"https://search.test/path?private=value",
    querySelector(selector){return {"[data-nav]":nav,"[data-nav-toggle]":toggle,"[data-services-menu]":servicesMenu,"[data-year]":year,"[data-consent-panel]":panel}[selector]||null},
    querySelectorAll(selector){return selector==="[data-consent]"?[accept,reject]:selector==="[data-cookie-settings]"?[settings]:[]},
    createElement(){return {}},head:{appendChild(node){scripts.push(node)}},
    addEventListener(name,fn){(listeners[name]||=[]).push(fn)}
  };
  Object.defineProperty(document,"cookie",{get(){return "_ga=old; _ga_GEJR9VMEYV=old; unrelated=keep"},set(value){cookies.push(value)}});
  const context={document,location:{href:pageUrl,hostname:"quickvs.com",pathname:new URL(pageUrl).pathname},URL,Date,encodeURIComponent,localStorage:{getItem(k){if(storageThrows)throw Error("disabled");return storage.get(k)||null},setItem(k,v){if(storageThrows)throw Error("disabled");storage.set(k,v)}}};
  context.window=context;vm.createContext(context);vm.runInContext(head,context);vm.runInContext(source,context);
  function click(href,where="hero",prevented=false){
    const anchor={dataset:{contactLocation:where},getAttribute(){return href}};
    const target={closest(selector){return selector==="a[href]"?anchor:null}};
    (listeners.click||[]).forEach(fn=>fn({target,defaultPrevented:prevented}));
  }
  function tracked(){return JSON.parse(JSON.stringify(context.dataLayer.filter(x=>x[0]==="event").map(x=>({name:x[1],params:x[2]}))));}
  return {context,panel,accept,reject,settings,scripts,cookies,click,tracked,buttons,nav,toggle,servicesMenu,listeners};
}
let f=fixture();
assert.equal(f.scripts.length,0,"No Google code before consent");
f.click("tel:+447522179040");assert.equal(f.tracked().length,0,"No events before consent");
assert.equal(f.panel.hidden,false);
f.accept.click();assert.equal(f.scripts.length,1);assert.equal(f.panel.hidden,true);
f.click("tel:+447522179040","mobile_bar");
f.click("https://wa.me/447522179040?text=private%20registration");
f.click("mailto:info@quickvs.com");
f.click("https://maps.google.com/maps?cid=2157141621358514254");
assert.deepEqual(f.tracked().map(x=>x.name),["phone_call_click","whatsapp_click","email_click","directions_click"]);
assert.ok(f.tracked().every(x=>x.params.send_to==="G-GEJR9VMEYV"));
assert.ok(!JSON.stringify(f.tracked()).includes("private"),"PII must not reach event parameters");
const config=f.context.dataLayer.find(x=>x[0]==="config");
assert.equal(config[2].page_location,"https://quickvs.com/services/performance-engine-rebuilds/");
assert.equal(config[2].page_referrer,"https://search.test/path");
for(const href of ["tel:+441234567890","https://wa.me.attacker.test/447522179040","https://wa.me/447000000000","mailto:other@test.invalid"])f.click(href);
f.click("tel:+447522179040","hero",true);
assert.equal(f.tracked().length,4,"Unrelated or cancelled contacts must not be measured");
f.settings.click();assert.equal(f.panel.hidden,false);
f.reject.click();f.click("tel:+447522179040");assert.equal(f.tracked().length,4,"Withdrawal stops tracking");
assert.ok(f.cookies.some(x=>x.startsWith("_ga=")));
assert.ok(!f.cookies.some(x=>x.startsWith("unrelated=")),"Only analytics cookies may be deleted");
f.accept.click();assert.equal(f.scripts.length,1,"One Google tag per page");
f.buttons.toggle();assert.equal(f.toggle.attrs["aria-expanded"],"true");
f.servicesMenu.open=true;
f.listeners.keydown.forEach(fn=>fn({key:"Escape"}));assert.equal(f.toggle.attrs["aria-expanded"],"false");
assert.equal(f.servicesMenu.open,false,"Escape closes Services dropdown");
f.servicesMenu.open=true;
f.listeners.click.forEach(fn=>fn({target:{insideServicesMenu:false,closest(){return null}},defaultPrevented:false}));
assert.equal(f.servicesMenu.open,false,"Clicking outside closes Services dropdown");
f=fixture({analytics:false,expiresAt:Date.now()+100000});assert.equal(f.scripts.length,0);assert.equal(f.panel.hidden,true);
f=fixture({analytics:true,expiresAt:Date.now()+100000});assert.equal(f.scripts.length,1);assert.equal(f.panel.hidden,true);
f=fixture({analytics:true,expiresAt:0});assert.equal(f.scripts.length,0);assert.equal(f.panel.hidden,false);
f=fixture(null,true);f.reject.click();assert.equal(f.scripts.length,0,"Blocked storage must not break rejection");
f=fixture(null,false,"https://quickvs.com/blog/severe-engine-block-damage/?utm_source=google&utm_medium=organic&utm_campaign=gbp_workshop&utm_content=block_assessment&reg=private");
f.accept.click();
let campaign=f.context.dataLayer.find(x=>x[0]==="config")[2];
assert.equal(campaign.campaign_source,"google");assert.equal(campaign.campaign_medium,"organic");
assert.equal(campaign.campaign_name,"gbp_workshop");assert.equal(campaign.campaign_content,"block_assessment");
assert.ok(!JSON.stringify(campaign).includes("private"),"Known campaign labels must not expose other query values");
f=fixture(null,false,"https://quickvs.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_workshop&utm_content=private");
f.accept.click();campaign=f.context.dataLayer.find(x=>x[0]==="config")[2];
assert.equal(campaign.campaign_content,undefined,"Unknown campaign text must not enter Analytics");
console.log("Tracking tests passed: consent, withdrawal, real ID, click channels, navigation, PII redaction and expired/blocked storage.");
