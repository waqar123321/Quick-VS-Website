const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const source=fs.readFileSync(path.join(__dirname,"../script.js"),"utf8");
const head=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8").match(/<script>([\s\S]*?)<\/script>/)[1];
function fixture(stored=null,storageThrows=false,pageUrl="https://quickvs.com/services/performance-engine-rebuilds/?reg=private",consentKey="qsv-analytics-consent-v2",referrer="https://search.test/path?private=value") {
  const listeners={},buttons={},scripts=[],events=[],cookies=[],storage=new Map();
  if(stored)storage.set(consentKey,JSON.stringify(stored));
  const accept={dataset:{consent:"accept"},addEventListener(name,fn){this.click=fn},focus(){}};
  const reject={dataset:{consent:"reject"},addEventListener(name,fn){this.click=fn},focus(){}};
  const settings={addEventListener(name,fn){this.click=fn},focus(){this.focused=true}};
  const panel={hidden:true,querySelector(){return accept}};
  const year={textContent:""};
  const nav={classList:{open:false,toggle(_name, open){return this.open=open}},addEventListener(name,fn){buttons.navClick=fn}};
  const toggle={attrs:{},focus(){this.focused=true},setAttribute(name,value){this.attrs[name]=value},addEventListener(name,fn){buttons.toggle=fn}};
  const servicesMenu={open:false,contains(target){return target?.insideServicesMenu===true}};
  const document={
    referrer,
    documentElement:{setAttribute(){},removeAttribute(){}},
    querySelector(selector){return {"[data-nav]":nav,"[data-nav-toggle]":toggle,"[data-services-menu]":servicesMenu,"[data-year]":year,"[data-consent-panel]":panel}[selector]||null},
    querySelectorAll(selector){return selector==="[data-consent]"?[accept,reject]:selector==="[data-cookie-settings]"?[settings]:[]},
    createElement(){return {}},head:{appendChild(node){scripts.push(node)}},
    addEventListener(name,fn){(listeners[name]||=[]).push(fn)}
  };
  Object.defineProperty(document,"cookie",{get(){return "_ga=old; _ga_GEJR9VMEYV=old; _gcl_aw=old; _gcl_au=old; unrelated=keep"},set(value){cookies.push(value)}});
  const context={document,location:{href:pageUrl,hostname:"quickvs.com",pathname:new URL(pageUrl).pathname},URL,URLSearchParams,Date,encodeURIComponent,localStorage:{getItem(k){if(storageThrows)throw Error("disabled");return storage.get(k)||null},setItem(k,v){if(storageThrows)throw Error("disabled");storage.set(k,v)}}};
  context.window=context;vm.createContext(context);vm.runInContext(head,context);
  for (const match of fs.readFileSync(path.join(__dirname,"../index.html"),"utf8").matchAll(/<script async src="([^"]+)"><\/script>/g)) scripts.push({src:match[1]});
  vm.runInContext(source,context);
  function click(href,where="hero",prevented=false){
    const anchor={dataset:{contactLocation:where},getAttribute(){return href}};
    const target={closest(selector){return selector==="a[href]"?anchor:null}};
    (listeners.click||[]).forEach(fn=>fn({target,defaultPrevented:prevented}));
  }
  function tracked(){return JSON.parse(JSON.stringify(context.dataLayer.filter(x=>x[0]==="event" && x[1]!=="conversion").map(x=>({name:x[1],params:x[2]}))));}
  return {context,panel,accept,reject,settings,scripts,cookies,click,tracked,buttons,nav,toggle,servicesMenu,listeners};
}
let f=fixture();
assert.equal(f.scripts.length,1,"Google loads before consent");
f.click("tel:+447522179040");assert.equal(f.tracked().length,1,"Events are queued before consent");
f=fixture();
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
f.listeners.click.forEach(fn=>fn({
  defaultPrevented:false,
  target:{closest(selector){
    if(selector===".quote-trust")return {};
    if(selector==="a[href]")return {dataset:{},getAttribute(){return "https://maps.google.com/maps?cid=2157141621358514254"}};
    return null;
  }}
}));
assert.equal(f.tracked().length,4,"Unrelated or cancelled contacts must not be measured");
f.settings.click();assert.equal(f.panel.hidden,false);
f.reject.click();f.click("tel:+447522179040");assert.equal(f.tracked().length,5,"Withdrawal keeps cookieless tracking");
assert.ok(f.cookies.some(x=>x.startsWith("_ga=")));
assert.ok(!f.cookies.some(x=>x.startsWith("unrelated=")),"Only measurement cookies may be deleted");
f.accept.click();assert.equal(f.scripts.length,1,"One Google tag per page");
f.buttons.toggle();assert.equal(f.toggle.attrs["aria-expanded"],"true");
f.servicesMenu.open=true;
f.listeners.keydown.forEach(fn=>fn({key:"Escape"}));assert.equal(f.toggle.attrs["aria-expanded"],"false");
assert.equal(f.servicesMenu.open,false,"Escape closes Services dropdown");
assert.equal(f.toggle.focused,true,"Closing the mobile menu returns focus");
f.servicesMenu.open=true;
f.listeners.click.forEach(fn=>fn({target:{insideServicesMenu:false,closest(){return null}},defaultPrevented:false}));
assert.equal(f.servicesMenu.open,false,"Clicking outside closes Services dropdown");
f=fixture({analytics:false,expiresAt:Date.now()+100000});assert.equal(f.scripts.length,1);assert.equal(f.panel.hidden,true);
f=fixture({analytics:true,expiresAt:Date.now()+100000});assert.equal(f.scripts.length,1);assert.equal(f.panel.hidden,true);
f=fixture({analytics:true,expiresAt:0});assert.equal(f.scripts.length,1);assert.equal(f.panel.hidden,false);
f=fixture(null,true);f.reject.click();assert.equal(f.scripts.length,1,"Blocked storage must not break rejection");
f=fixture(null,false,"https://quickvs.com/blog/severe-engine-block-damage/?utm_source=google&utm_medium=organic&utm_campaign=gbp_workshop&utm_content=block_assessment&reg=private");
f.accept.click();
let campaign=f.context.dataLayer.find(x=>x[0]==="config")[2];
assert.equal(campaign.campaign_source,"google");assert.equal(campaign.campaign_medium,"organic");
assert.equal(campaign.campaign_name,"gbp_workshop");assert.equal(campaign.campaign_content,"block_assessment");
assert.ok(!JSON.stringify(campaign).includes("private"),"Known campaign labels must not expose other query values");
f=fixture(null,false,"https://quickvs.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_workshop&utm_content=private");
f.accept.click();campaign=f.context.dataLayer.find(x=>x[0]==="config")[2];
assert.equal(campaign.campaign_content,undefined,"Unknown GBP content must not override campaign_content");
for(const pathname of ["/", "/services/wet-belt-replacement/", "/services/timing-chain-replacement/", "/services/engine-rebuild-birmingham/", "/services/vw-audi-engine-repairs-birmingham/", "/services/cambelt-replacement-birmingham/", "/contact/"]) {
  const html=fs.readFileSync(path.join(__dirname,"..",pathname,"index.html"),"utf8");
  assert.equal(html.match(/<script>([\s\S]*?)<\/script>/)[1],head,"New page must retain the shared consent-aware Google setup");
  assert.match(html, /<script defer src="\/script\.js\?v=[^"]+"><\/script>/, "Page must load the shared tracking script");
  const contacts=["tel:+447522179040","https://wa.me/447522179040?","mailto:info@quickvs.com","https://maps.google.com/maps?cid=2157141621358514254"].map(prefix=>{
    const href=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).find(h=>h.startsWith(prefix));
    assert.ok(href,pathname+": missing real "+prefix+" contact link");return href;
  });
  const page=fixture(null,false,"https://quickvs.com"+pathname+"?reg=private");
  contacts.forEach(href=>page.click(href));
  assert.equal(page.tracked().length,4,pathname+": cookieless tracking before consent");
  page.accept.click();contacts.forEach(href=>page.click(href));
  assert.deepEqual(page.tracked().slice(-4).map(e=>e.name),["phone_call_click","whatsapp_click","email_click","directions_click"]);
  assert.ok(page.tracked().every(e=>e.params.page_path===pathname),pathname+": event page attribution");
  assert.ok(!JSON.stringify(page.tracked()).includes("private"),pathname+": no enquiry information in analytics");
  page.reject.click();contacts.forEach(href=>page.click(href));
  assert.equal(page.tracked().length,12,pathname+": withdrawal keeps cookieless tracking");
}

f=fixture(null,false,"https://quickvs.com/services/wet-belt-replacement/?reg=AB12CDE");
const quoteSuccess = () => f.listeners["qsv:quote-success"].forEach(fn => fn({detail:"wet_belt"}));
quoteSuccess();
assert.equal(f.tracked().length,1,"A successful quote before consent is measured without cookies");
f.accept.click();
quoteSuccess();
assert.deepEqual(f.tracked().slice(-1),[{
  name:"generate_lead",
  params:{send_to:"G-GEJR9VMEYV",job_type:"wet_belt",page_path:"/services/wet-belt-replacement/"}
}],"A successful quote sends only category and page after consent");
f.reject.click();
quoteSuccess();
assert.equal(f.tracked().length,3,"Withdrawal keeps cookieless quote measurement");

const consentStates = {analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"};
f=fixture();
assert.deepEqual(JSON.parse(JSON.stringify(f.context.dataLayer[0][2])),{...consentStates,wait_for_update:500},"Default denies all four consent types");
f.accept.click();
assert.deepEqual(JSON.parse(JSON.stringify(f.context.dataLayer.filter(x=>x[0]==="consent").at(-1)[2])),
  {...consentStates,analytics_storage:"granted",ad_storage:"granted",ad_user_data:"granted"},"Accept grants measurement only");
f.reject.click();
assert.deepEqual(JSON.parse(JSON.stringify(f.context.dataLayer.filter(x=>x[0]==="consent").at(-1)[2])),consentStates,"Reject denies all consent types");
for(const name of ["_ga", "_ga_GEJR9VMEYV", "_gcl_aw", "_gcl_au"]) {
  assert.ok(f.cookies.some(x=>x.startsWith(name+"=; Max-Age=0;")),"Reject deletes "+name);
}
f=fixture({analytics:true,expiresAt:Date.now()+100000},false,undefined,"qsv-analytics-consent-v1");
assert.equal(f.panel.hidden,false,"Old analytics-only consent must show the banner again");
assert.equal(f.scripts.length,1,"Old consent uses denied-mode Google");
const attribution="gclid=TEST123&gbraid=braid%2Bvalue&wbraid=web%20braid&gad_source=1&gad_campaignid=123&utm_source=google&utm_medium=cpc&utm_campaign=Chain%20Repairs&utm_term=timing+chain&utm_content=call%2Fbutton&gclid=SECOND";
f=fixture(null,false,"https://quickvs.com/services/timing-chain-replacement/?"+attribution+"&reg=AB12CDE&text=private&message=secret#private",undefined,"https://search.test/path?"+attribution+"&reg=AB12CDE#secret");
f.accept.click();
const attributed=f.context.dataLayer.find(x=>x[0]==="config")[2];
assert.equal(attributed.page_location,"https://quickvs.com/services/timing-chain-replacement/?"+attribution,"Retain only attribution parameters, with exact encoding and repeated values");
assert.equal(attributed.page_referrer,"https://search.test/path?"+attribution,"Apply the same allowlist to referrers");
for(const text of ["AB12CDE","private","secret"]) assert.ok(!JSON.stringify(attributed).includes(text),"Exclude enquiry values and fragments");

console.log("Tracking tests passed: advanced consent, Ads destinations and conversions, consent, withdrawal, real ID, four click channels on all seven requested pages, attribution allowlist, ad consent and old consent migration, navigation, PII redaction and expired/blocked storage.");

// Every generated page must initialise consent and redaction before the loader.
function checkPages(dir) {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const file=path.join(dir,entry.name);
    if(entry.isDirectory()) checkPages(file);
    else if(entry.name.endsWith(".html")) {
      const html=fs.readFileSync(file,"utf8");
      if (html.includes('<meta http-equiv="refresh"')) continue; // Legacy redirect has no tracking; its destination does.
      const loader=html.indexOf('<script async src="https://www.googletagmanager.com/gtag/js?id=G-GEJR9VMEYV">');
      assert.ok(loader>html.indexOf('gtag("consent","default",') && html.indexOf('gtag("consent","default",')>=0,file+": default precedes loader");
      for(const setting of ['gtag("set","url_passthrough",true);','gtag("set","ads_data_redaction",true);']) assert.ok(html.indexOf(setting)>=0 && html.indexOf(setting)<loader);
      assert.equal((html.match(/googletagmanager.com\/gtag\/js/g)||[]).length,1);
    }
  }
}
checkPages(path.join(__dirname,".."));
f=fixture();
assert.ok(!Object.keys(f.context).some(key=>key.startsWith("ga-disable-")));
assert.equal(f.context.dataLayer.filter(x=>x[0]==="config" && x[1]==="AW-18511720683").length,1);
const callConfig=f.context.dataLayer.find(x=>x[0]==="config" && x[1]==="AW-18511720683/utxvCO-MtLQdEOvhiftE")[2];
assert.equal(callConfig.phone_conversion_number,"07522 179040");
assert.equal(callConfig.phone_conversion_callback,f.context.qsvSwapPhone);
for(const choose of [()=>{},()=>f.accept.click(),()=>f.reject.click()]) {
  choose(); f.click("https://wa.me/447522179040?text=private");
  const conversion=f.context.dataLayer.filter(x=>x[0]==="event" && x[1]==="conversion").at(-1);
  assert.deepEqual(JSON.parse(JSON.stringify(conversion[2])),{send_to:"AW-18511720683/EnYACPKMtLQdEOvhiftE",transport_type:"beacon"});
}
const makeLink=(href,text)=>({href,dataset:{},nodeType:1,childNodes:[{nodeType:3,textContent:text}],getAttribute(){return this.href},setAttribute(_,value){this.href=value}});
const phone=makeLink("tel:+447522179040","Call 07522 179040");
const generic=makeLink("tel:+447522179040","Call now");
const other=makeLink("tel:+441234567890","Other");
const whatsapp=makeLink("https://wa.me/447522179040","WhatsApp");
f.context.document.querySelectorAll=()=>[phone,generic,other];
callConfig.phone_conversion_callback("0800 123 4567","+448001234567");
assert.equal(phone.href,"tel:448001234567");assert.equal(phone.childNodes[0].textContent,"Call 0800 123 4567");
assert.equal(generic.href,phone.href);assert.equal(generic.childNodes[0].textContent,"Call now");
assert.equal(other.href,"tel:+441234567890");assert.equal(whatsapp.href,"https://wa.me/447522179040");
f.listeners.click.forEach(fn=>fn({target:{closest(selector){return selector==="a[href]"?phone:null}},defaultPrevented:false}));
assert.equal(f.tracked().at(-1).name,"phone_call_click","Forwarding links retain GA4 phone clicks");
const fallback=makeLink("tel:+447522179040","07522 179040");
f.context.document.querySelectorAll=()=>[fallback];
callConfig.phone_conversion_callback("0800 765 4321");assert.equal(fallback.href,"tel:08007654321");
const saved=fixture({analytics:true,expiresAt:Date.now()+100000});
assert.ok(saved.context.dataLayer.findIndex(x=>x[0]==="consent" && x[1]==="update")<saved.context.dataLayer.findIndex(x=>x[0]==="config"),"Restore saved consent before config");
console.log("All generated pages have consent before one loader; forwarding callback and WhatsApp conversions passed.");
