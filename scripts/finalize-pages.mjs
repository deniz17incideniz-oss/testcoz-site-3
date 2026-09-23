import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const excluded = new Set(['giris.html','kayit.html','panel.html','test.html','kisisel-test.html','sinif.html','konu.html','dogal-sayilar-zor.html','matematik-test.html','404.html','tests/4-matematik-zaman-olcme-test-1-zor.html']);
const isExcluded = key => excluded.has(key) || key === 'ders/4-sinif-hayat-bilgisi.html' || key.startsWith('tests/4-sinif-hayat-bilgisi-');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(['node_modules','.git','automation','outputs','work'].includes(e.name)?[]:walk(path.join(dir,e.name))):e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);
for(const file of walk('.')) {
 const key=file.replaceAll('\\','/');const source=fs.readFileSync(file,'utf8');const $=load(source.trim());
 if(isExcluded(key)) {
  $('meta[name="robots"]').remove();$('head').append('<meta name="robots" content="noindex, follow">');
  $('script[src*="adsbygoogle.js"]').remove();
 }
 if($('main').length) {
  const id=$('main').first().attr('id')||'main-content';$('main').first().attr('id',id);
  if(!$('.skip-link').length)$('body').prepend(`<a class="skip-link" href="#${id}">İçeriğe geç</a>`);
 }
 if($('.site-footer').length&&!$('.footer-note').length)$('.site-footer .container').first().append('<p class="footer-note">1–4. sınıf öğrencileri için seviyeli ve açıklamalı ilkokul testleri. testcoz.pro, Millî Eğitim Bakanlığı’nın resmî sitesi değildir.</p>');
 $('.main-nav, .mobile-nav').each((_,e)=>{if(!$(e).find('a[href$="giris.html"]').length)$(e).append('<a class="nav-account" href="/giris.html">Giriş Yap</a>');});
 $('.logo[aria-label]').removeAttr('aria-label');
 $('.footer-col h4').each((_,e)=>$(e).replaceWith(`<h2>${$(e).html()}</h2>`));
 $('script[src]').each((_,e)=>{if(/(?:^|\/)js\/main\.js(?:\?|$)/.test($(e).attr('src')))$(e).attr('defer','');});
 $('.mobile-menu-btn').attr('aria-controls','mobileMenu');$('.breadcrumb').attr('aria-label','Sayfa yolu');
 const crumbs=[];$('.breadcrumb').first().find('a').each((_,e)=>crumbs.push({name:$(e).text().trim(),item:new URL($(e).attr('href'),'https://testcoz.pro/'+key).href}));
 const canonical=$('link[rel="canonical"]').attr('href');
 const current=$('.breadcrumb').first().find('span').last().text().trim();
 if(crumbs.length&&canonical&&current)crumbs.push({name:current,item:canonical});
 $('script[data-site-schema]').remove();
 if(crumbs.length>1&&!isExcluded(key))$('head').append(`<script type="application/ld+json" data-site-schema="breadcrumb">${JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((x,i)=>({'@type':'ListItem',position:i+1,...x}))}).replaceAll('<','\\u003c')}</script>`);
 if(key.startsWith('rehber/')&&key!=='rehber/index.html'&&canonical&&!isExcluded(key))$('head').append(`<script type="application/ld+json" data-site-schema="article">${JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:$('h1').text(),url:canonical,inLanguage:'tr',publisher:{'@type':'Organization',name:'testcoz.pro',url:'https://testcoz.pro/'}}).replaceAll('<','\\u003c')}</script>`);
 // System fonts avoid external font requests and a blocking stylesheet.
 $('link[href*="fonts.googleapis.com"],link[href*="fonts.gstatic.com"]').remove();
 fs.writeFileSync(file,$.html().replace(/[ \t]+$/gm,'').trimEnd()+'\n');
}
console.log('Shared accessibility, breadcrumbs and indexing rules applied.');
