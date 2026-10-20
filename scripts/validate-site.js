const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const origin = "https://quickvs.com";
function assertNoReviewMarkup(value, pathname) {
  if (!value || typeof value !== "object") return;
  const types = [].concat(value["@type"] || []);
  assert.ok(!types.some(type => /^(?:https?:\/\/schema\.org\/)?(?:Review|Rating|AggregateRating)$/.test(type)), pathname+": ineligible self-serving review schema");
  for (const [key, child] of Object.entries(value)) {
    assert.ok(!["review", "reviews", "reviewRating", "aggregateRating"].includes(key), pathname+": ineligible review property "+key);
    assertNoReviewMarkup(child, pathname);
  }
}
function esc(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    if (entry.name.startsWith(".") || ["node_modules","_internal"].includes(entry.name)) return [];
    const full=path.join(dir,entry.name);
    return entry.isDirectory()?walk(full):[full];
  });
}
const htmlFiles=walk(root).filter(file=>file.endsWith(".html"));
const pages=htmlFiles.map(file=>{
  const rel=path.relative(root,file).replaceAll("\\","/");
  const pathname=rel==="404.html"?"/404.html":"/"+rel.replace(/index\.html$/,"");
  return {file,pathname,text:fs.readFileSync(file,"utf8")};
});
const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
const entries=[...sitemap.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)].map(m=>({url:m[1],date:m[2]}));
const indexable=pages.filter(p=>p.pathname!=="/404.html");
assert.equal(entries.length,indexable.length,"Sitemap must include every indexable page exactly once");
assert.equal(new Set(entries.map(e=>e.url)).size,entries.length,"Duplicate sitemap URL");
const titles=new Set(),descriptions=new Set();
const photos=JSON.parse(fs.readFileSync(path.join(root,'content/workshop-photos.json'),'utf8'));
for(const page of pages) {
  const {text,pathname}=page;
  assert.equal((text.match(/<h1\b/g)||[]).length,1,pathname+": expected one H1");
  assert.equal(text.match(/rel="canonical" href="([^"]+)"/)?.[1],origin+pathname,pathname+": canonical mismatch");
  assert.equal(text.match(/property="og:url" content="([^"]+)"/)?.[1],origin+pathname,pathname+": og:url mismatch");
  if(pathname!=="/404.html") assert.ok(pathname===pathname.toLowerCase()&&pathname.endsWith("/"),"Noncanonical path "+pathname);
  const title=text.match(/<title>([^<]+)<\/title>/)?.[1];
  const description=text.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(title&&description,pathname+": missing metadata");
  assert.ok(!titles.has(title),pathname+": duplicate title");titles.add(title);
  assert.ok(!descriptions.has(description),pathname+": duplicate description");descriptions.add(description);
  assert.ok(text.includes("G-GEJR9VMEYV"),pathname+": missing real GA4 ID");
  assert.ok(!/(?:G|GTM|AW)-X{3,}|YOUR_[A-Z_]+|TODO|example\.com/i.test(text),pathname+": invalid public configuration");
  assert.ok(!/quickvs\.co\.uk|https?:\/\/www\.quickvs\.com|http:\/\/quickvs\.com/i.test(text),pathname+": legacy domain");
  assert.ok(!/jotform|<form\b/i.test(text),pathname+": retired enquiry form");
  assert.ok(!/bookmygarage|<iframe/i.test(text),pathname+": retired booking embed");
  assert.ok(!/credit\s*cards?/i.test(text),pathname+": unsupported payment claim");
  assert.ok(text.includes("info@quickvs.com"),pathname+": missing email");
  assert.ok(text.includes('href="tel:+447522179040"'),pathname+": missing telephone");
  assert.ok(text.includes('href="https://wa.me/447522179040?'),pathname+": missing WhatsApp");
  const telLinks=[...text.matchAll(/href="tel:([^"]+)"/g)].map(m=>m[1]);
  assert.ok(telLinks.every(t=>t==="+447522179040"),pathname+": unexpected phone number");
  assert.ok([...text.matchAll(/href="mailto:([^"?]+)[^"]*"/g)].every(m=>m[1]==="info@quickvs.com"),pathname+": unexpected email");
  assert.ok(text.includes('data-consent-panel hidden'),pathname+": missing optional cookie control");
  if(pathname==="/404.html") assert.ok(text.includes("noindex, follow"),"404 must not be indexed");
  else {
    assert.ok(!/\bnoindex\b/i.test(text),pathname+": accidental noindex");
    assert.ok(entries.some(e=>e.url===origin+pathname),pathname+": absent from sitemap");
  }
  for(const match of text.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)) {
    const schema=JSON.parse(match[1]);
    assertNoReviewMarkup(schema, pathname);
    if(schema["@type"]==="AutoRepair") {
      assert.equal(schema.name,"Quick Solution Vehicles LTD");
      assert.equal(schema.telephone,"+447522179040");
      assert.equal(schema.email,"info@quickvs.com");
      assert.equal(schema.url,origin+"/");
      assert.equal(schema.geo.latitude,52.4686661);assert.equal(schema.geo.longitude,-1.877204);
      assert.equal(schema.hasMap,"https://maps.google.com/maps?cid=2157141621358514254");
      assert.deepEqual(schema.paymentAccepted,["Debit Card","Contactless / Mobile NFC","Bank Transfer"]);
    }
  }
  for(const match of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u=new URL(match[1],origin+pathname);
    if(u.origin!==origin)continue;
    const target=path.join(root,u.pathname.slice(1),u.pathname.endsWith("/")?"index.html":"");
    assert.ok(fs.existsSync(target),pathname+": broken internal resource "+match[1]);
    if(u.hash&&/\.html$/.test(target)) {
      const targetText=fs.readFileSync(target,"utf8");
      assert.ok(targetText.includes('id="'+decodeURIComponent(u.hash.slice(1))+'"'),pathname+": missing anchor "+match[1]);
    }
  }
  for(const match of text.matchAll(/srcset="([^"]+)"/g)) {
    for(const candidate of match[1].split(',')) {
      const [resource,width]=candidate.trim().split(/\s+/);
      assert.match(width,/^\d+w$/,'Responsive image requires a width descriptor');
      assert.ok(fs.existsSync(path.join(root,resource)),pathname+': missing srcset image '+resource);
    }
  }
  for(const match of text.matchAll(/<img\b[^>]*>/g)) {
    assert.match(match[0],/\bwidth="\d+"/,pathname+': image width must reserve space');
    assert.match(match[0],/\bheight="\d+"/,pathname+': image height must reserve space');
    assert.match(match[0],/\balt="[^"]+"/,pathname+': meaningful image alt required');
    assert.ok(!/IMG_\d+|\.zip/i.test(match[0]),'Never publish an unprocessed original');
  }
}
for(const entry of entries) {
  assert.match(entry.date,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(entry.date<=new Date().toISOString().slice(0,10),"Future lastmod");
  assert.ok(indexable.some(p=>origin+p.pathname===entry.url),"Sitemap contains unknown URL "+entry.url);
}
const home=pages.find(p=>p.pathname==="/").text;
const hub=pages.find(p=>p.pathname==="/services/").text;
const services=pages.filter(p=>p.pathname.startsWith("/services/")&&p.pathname!=="/services/");
for(const service of services) {
  const link='href="'+service.pathname+'"';
  assert.ok(home.includes(link),"Service missing from homepage: "+service.pathname);
  assert.ok(hub.includes(link),"Service missing from hub: "+service.pathname);
  for(const page of pages) assert.ok(page.text.match(/<footer\b[\s\S]*?<\/footer>/)?.[0].includes(link),"Service absent from footer: "+service.pathname);
  const main=service.text.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1].replace(/<[^>]*>/g," ").replace(/&[a-z#0-9]+;/gi," ");
  assert.ok(main.trim().split(/\s+/).length>=400,"Service needs more useful detail: "+service.pathname);
}
assert.equal(services.length,19);
const reviews=JSON.parse(fs.readFileSync(path.join(root,"content/reviews.json"),"utf8")).reviews;
assert.equal(reviews.length,5);
for(const page of pages.filter(p=>p.pathname==="/"||p.pathname==="/testimonials/"||(p.pathname.startsWith("/services/")&&/rebuild/.test(p.pathname)))) {
  const cards=[...page.text.matchAll(/<figure class="review-card">([\s\S]*?)<\/figure>/g)].map(m=>m[1]);
  assert.equal(cards.length,reviews.length,"Missing visible reviews on "+page.pathname);
  for (const review of reviews) {
    assert.ok(cards.some(card=>card.includes('<strong>'+esc(review.author)+'</strong>')&&card.includes('<blockquote><p>'+esc(review.text)+'</p></blockquote>')),"Visible review changed on "+page.pathname+": "+review.author);
  }
}
const guides=require("../content/guides");
const advice=pages.find(p=>p.pathname==="/blog/").text;
for(const guide of guides) {
  const pathname="/blog/"+guide.slug+"/",page=pages.find(p=>p.pathname===pathname),link='href="'+pathname+'"';
  assert.ok(page,"Missing guide "+pathname);
  assert.ok(home.includes(link)&&advice.includes(link),"Guide missing from discovery hubs "+pathname);
  const article=[...page.text.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s["@type"]==="Article");
  assert.equal(article.headline,guide.title);assert.equal(article.mainEntityOfPage,origin+pathname);
  assert.equal(article.author.name,"Quick Solution Vehicles LTD");assert.equal(article.datePublished,guide.published);
  assert.equal(article.dateModified,guide.updated);
  assert.equal(article.image.length,3,'Provide relevant Article images in three aspect ratios');
  assert.ok(page.text.includes(photos[guide.photo].fallback),'Article image must represent visible page content');
  for(const image of article.image) {
    assert.ok(image.startsWith(origin+'/assets/workshop/'),'Article image must use a local reviewed derivative');
    assert.ok(fs.existsSync(path.join(root,image.slice(origin.length))),'Article image must exist');
  }
  assert.ok(page.text.includes('property="og:type" content="article"'));
  assert.ok(page.text.includes('datetime="'+guide.published+'"'),"Missing visible publication date");
  for(const p of pages)assert.ok(p.text.match(/<footer\b[\s\S]*?<\/footer>/)?.[0].includes(link),"Guide absent from footer "+pathname);
}
assert.equal(fs.readFileSync(path.join(root,"robots.txt"),"utf8"),"User-agent: *\nAllow: /\n\nSitemap: https://quickvs.com/sitemap.xml\n");
assert.ok(fs.existsSync(path.join(root,".nojekyll")));
assert.equal(Object.keys(photos).length,9,'All supplied photos classified');
for(const photo of Object.values(photos)) {
  assert.ok(pages.some(p=>p.text.includes(photo.fallback)),'Photo has no visible placement: '+photo.source);
  assert.ok(photo.variants.every(v=>v.bytes<photo.sourceBytes),'Responsive image should reduce bytes');
}
assert.ok(photos['5842'].redactions.length>=1,'X5 privacy review must be recorded');
assert.ok(!walk(path.join(root,'assets')).some(f=>/IMG_\d+|\.zip$/i.test(f)),'Private originals must stay outside public assets');
console.log("Validated "+pages.length+" HTML files, "+entries.length+" sitemap URLs, 19 service pages, metadata, schema, contact details and internal resources.");
