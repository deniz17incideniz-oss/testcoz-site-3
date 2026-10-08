import fs from "node:fs";
const geography=JSON.parse(fs.readFileSync(new URL("../data/imports/turkey-neighbours.json",import.meta.url),"utf8"));
// Source-specific educational diagrams. Text and counts are supplied explicitly.
export function renderFinalVisual(data, esc) {
 const text=(x,y,s,size=19)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial" font-size="${size}" fill="#1e293b">${esc(s)}</text>`;
 const path=(d,fill='#2563eb',stroke='none',w=3)=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
 const circle=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
 const box=(x,y,w,h,c='#dbeafe')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c}" stroke="#475569" stroke-width="2"/>`;
 const apple=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${path('M0 -13 C-30 -32 -34 15 -12 27 Q0 33 12 27 C34 15 30 -32 0 -13','#dc2626')}${path('M0 -14 L3 -27','none','#78350f',4)}${path('M3 -23 Q24 -38 22 -19 Q10 -14 3 -23','#16a34a')}</g>`;
 const bird=(x,y,c='#2563eb')=>circle(x,y,22,c)+path(`M${x-12} ${y}q-42 -48 -42 2q24 8 42 8`,c)+path(`M${x+18} ${y-8}l20 8l-20 8`,'#f59e0b')+circle(x+8,y-7,3,'#111827');
 const cat=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${path('M-30 0 L-28 -42 L-8 -24 L12 -24 L30 -42 L33 0 Q30 28 0 28 Q-32 25 -30 0','#d97706')}${circle(-12,-2,3,'#111827')}${circle(14,-2,3,'#111827')}${path('M-4 10L4 10L0 15Z','#7c2d12')}${path('M-20 12h-25m25 7h-25m65-7h25m-25 7h25','none','#92400e',2)}</g>`;
 const tree=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${box(-12,0,24,100,'#92400e')}${circle(0,-25,58,'#16a34a')}${circle(-30,0,40,'#22c55e')}${circle(30,0,40,'#22c55e')}</g>`;
 const person=(x,y,{sad=false,old=false,arms=false}={})=>circle(x,y,22,'#fed7aa')+path(`M${x-22} ${y-6}q0 -34 43 0`,old?'#cbd5e1':'#713f12')+circle(x-7,y,2,'#111827')+circle(x+7,y,2,'#111827')+path(`M${x-8} ${y+12}q8 ${sad?-10:9} 16 0`,'none','#9a3412',2)+box(x-23,y+25,46,58,'#2563eb')+path(`M${x-13} ${y+83}l-10 45m35-45l14 45M${x-22} ${y+36}l-33 ${arms?-22:30}m78-30l35 ${arms?-25:28}`,'none','#334155',9)+(old?path(`M${x+56} ${y+63}v67`,'none','#713f12',6):'');
 const mapPath=g=>(g.type==='Polygon'?[g.coordinates]:g.coordinates).map(poly=>poly.map(r=>r.map(([lon,lat],i)=>(i?'L':'M')+(60+(lon-24)*27).toFixed(1)+' '+(100+(43-lat)*25).toFixed(1)).join('')+'Z').join('')).join('');
 const turkey=geography.find(g=>g.name==='Turkey');
 const mapBase=()=>'<defs><clipPath id="mapClip"><rect x="55" y="95" width="610" height="225"/></clipPath></defs><g clip-path="url(#mapClip)">'+geography.map(g=>path(mapPath(g.geometry),g.name==='Turkey'?'#d9f99d':'#f1f5f9','#94a3b8',1)).join('')+'</g>';
 let art='',height=360;
 switch(data.kind){
 case 'snow': art=box(55,230,610,95,'#e0f2fe')+person(360,135,{arms:true})+box(338,103,44,14,'#ef4444')+box(337,153,50,10,'#ef4444')+circle(416,145,13,'#e2e8f0');for(let i=0;i<15;i++)art+=circle(70+i*41,95+(i%3)*50,4,'#93c5fd');break;
 case 'cage': art=box(110,100,260,210,'#f8fafc')+bird(235,220)+cat(520,250);for(let x=130;x<370;x+=35)art+=path(`M${x} 110V300`,'none','#64748b',3);break;
 case 'appleTree':art=tree(350,170,1.2);[[300,120],[350,105],[400,125],[290,170],[335,155],[375,175],[410,170],[240,305],[310,305],[390,305],[460,305]].forEach(([x,y])=>art+=apple(x,y,.45));break;
 case 'strawberries':art=`<ellipse cx="265" cy="220" rx="180" ry="95" fill="#e0f2fe" stroke="#475569"/>`;for(let i=0;i<8;i++){const x=i<5?160+(i%3)*90:510+(i-5)*55,y=i<5?190+Math.floor(i/3)*65:195;art+=path(`M${x-15} ${y-12}Q${x} ${y-24} ${x+15} ${y-12}Q${x+12} ${y+12} ${x} ${y+23}Q${x-12} ${y+12} ${x-15} ${y-12}`,'#dc2626')+path(`M${x-12} ${y-15}l12 8l12-8l-12-8Z`,'#16a34a');}art+=text(560,280,'Eklenecek');break;
 case 'cookies':art=`<ellipse cx="340" cy="210" rx="260" ry="100" fill="#e0f2fe"/>`;for(let i=0;i<11;i++){let x=140+(i%6)*78,y=175+Math.floor(i/6)*72;art+=circle(x,y,25,'#d6a565')+circle(x-8,y-4,3,'#78350f')+circle(x+8,y+7,3,'#78350f');if(i>=7)art+=path(`M${x-25} ${y-25}l50 50m0-50l-50 50`,'none','#64748b',3);}break;
 case 'digital':art=box(180,110,360,170,'#0f172a')+`<text x="360" y="220" text-anchor="middle" font-family="monospace" font-size="68" fill="#a7f3d0">10:00</text>`;break;
 case 'table':height=130+data.rows.length*60;art=data.rows.map(([a,b],i)=>box(130,95+i*60,460,55,i%2?'#f1f5f9':'#e0f2fe')+text(270,131+i*60,a)+text(510,131+i*60,b)).join('');break;
 case 'apples':for(let i=0;i<data.count;i++)art+=apple(150+i*105,195,.95);break;
 case 'sun':art=circle(360,200,65,'#facc15');for(let i=0;i<12;i++){let a=i*Math.PI/6;art+=path(`M${360+80*Math.cos(a)} ${200+80*Math.sin(a)}L${360+112*Math.cos(a)} ${200+112*Math.sin(a)}`,'none','#eab308',7);}break;
 case 'apple':art=apple(360,195,2);break;
 case 'schoolPlan':art=box(100,100,520,210,'#f8fafc')+box(110,110,160,75)+text(190,154,'Sınıf')+box(280,110,160,75)+text(360,154,'Kütüphane')+box(450,110,160,75)+text(530,154,'Müdür odası')+text(360,245,'Koridor')+text(360,303,'Giriş');break;
 case 'monkey':art=tree(185,185,1)+circle(420,173,48,'#92400e')+circle(370,173,22,'#92400e')+circle(470,173,22,'#92400e')+circle(420,185,35,'#fed7aa')+circle(408,166,4,'#111827')+circle(433,166,4,'#111827')+path('M455 219Q535 260 538 205Q515 236 455 219','#facc15','#ca8a04')+box(390,225,60,70,'#92400e');break;
 case 'wind':art=`<g transform="translate(350 250) skewX(-18)">${tree(0,-80,1.1)}</g>`+path('M80 125H260q30 0 25-20M90 175H260m-150 55H255','none','#94a3b8',6);break;
 case 'abacus':art=box(160,290,400,15,'#92400e');[4,0,7].forEach((n,i)=>{let x=235+i*125;art+=path(`M${x} 105V290`,'none','#64748b',5)+text(x,335,['Yüzler','Onlar','Birler'][i]);for(let j=0;j<n;j++)art+=`<ellipse cx="${x}" cy="${278-j*22}" rx="35" ry="9" fill="${['#ef4444','#f59e0b','#2563eb'][i]}"/>`;});break;
 case 'mountains':data.rows.forEach(([a,b],i)=>{let x=130+i*230;art+=path(`M${x-85} 245L${x} 125L${x+85} 245Z`,'#94a3b8')+text(x,275,a)+text(x,305,b,15);});break;
 case 'seas':art=mapBase()+text(360,195,'Türkiye')+text(360,112,'Karadeniz')+text(90,245,'Ege Denizi',15)+text(350,305,'Akdeniz');break;
 case 'forces':height=390;art=box(160,235,50,50,'#a16207')+person(110,140)+path('M130 205L180 245','none','#713f12',4)+text(145,340,'A')+person(350,140)+box(405,215,65,40)+circle(420,270,12,'#334155')+circle(460,270,12,'#334155')+text(385,340,'B')+box(560,130,65,90,'#e2e8f0')+box(580,150,25,40,'#94a3b8')+path('M530 200L590 175','none','#fed7aa',14)+text(595,340,'C');break;
 case 'grandfather':art=person(350,135,{old:true});break;
 case 'ballBox':art=box(190,135,340,175,'#d6a565')+circle(360,205,47,'#2563eb')+box(190,235,340,75,'#c08457');break;
 case 'catTable':art=box(160,120,400,25,'#92400e')+box(180,145,20,165,'#92400e')+box(520,145,20,165,'#92400e')+cat(350,270,.8)+path('M336 269q5 5 10 0m8 0q5 5 10 0','none','#78350f',3);break;
 case 'forest':art=tree(140,180,1)+tree(300,170,1.2)+tree(480,175,1.1)+bird(540,130)+cat(350,285,.6);break;
 case 'eagle':art=path('M90 200L290 150L350 177L430 144L620 205L435 191L378 220L360 267L335 220L270 193Z','#78350f')+circle(369,185,17,'#f1f5f9')+path('M382 182l22 7l-22 8','#eab308')+path('M80 325L160 250L230 325M460 325L540 240L650 325','#cbd5e1');break;
 case 'story':art=box(275,110,170,50)+text(360,141,'Hikâye');['…','…','…','…'].forEach((s,i)=>{let x=105+i*170;art+=path(`M360 160L${x} 230`,'none','#64748b')+box(x-65,230,130,65)+text(x,270,s);});break;
 case 'neighbourhood':art=path('M260 135V265H500','none','#cbd5e1',36)+box(190,90,140,55)+text(260,124,'Okul')+box(185,250,155,60)+text(260,287,'Kütüphane')+box(440,250,150,60)+text(515,287,'Hastane')+text(590,118,'Kuzey ↑');break;
 case 'relief':art='<defs><clipPath id="turkeyClip">'+path(mapPath(turkey.geometry))+'</clipPath><linearGradient id="relief"><stop stop-color="#86efac"/><stop offset=".5" stop-color="#fde047"/><stop offset="1" stop-color="#92400e"/></linearGradient></defs>'+path(mapPath(turkey.geometry),'url(#relief)','#64748b')+text(360,290,'Batı → Doğu')+text(360,320,'Renk değişimini gösteren şema',14);break;
 case 'borders':art=mapBase()+text(355,195,'Türkiye')+text(130,120,'Bulgaristan',13)+text(78,212,'Yunanistan',13)+text(575,110,'Gürcistan',13)+text(610,146,'Ermenistan',13)+text(627,182,'Nahçıvan',13)+text(625,238,'İran',13)+text(530,288,'Irak',13)+text(395,286,'Suriye',13);break;
 case 'signs':['dog','food','camera','phone'].forEach((s,i)=>{let x=120+i*160;art+=circle(x,195,63,'#fff');if(s==='camera')art+=box(x-34,175,68,43,'#94a3b8')+circle(x,196,13,'#334155');if(s==='phone')art+=box(x-20,159,40,70,'#334155')+box(x-14,166,28,45,'#e0f2fe');if(s==='food')art+=path(`M${x-36} 191Q${x} 142 ${x+36} 191Z`,'#d97706')+box(x-36,196,72,12,'#78350f')+box(x-36,213,72,12,'#d97706');if(s==='dog')art+=circle(x,190,27,'#a16207')+path(`M${x-20} 170q-30-20-23 35m63-35q30-20 23 35`,'none','#78350f',13)+circle(x-9,185,3,'#111827')+circle(x+9,185,3,'#111827');art+=`<circle cx="${x}" cy="195" r="63" fill="none" stroke="#dc2626" stroke-width="7"/>`+path(`M${x-43} 150l86 90`,'none','#dc2626',7)+text(x,292,'ABCD'[i]);});break;
 case 'teacher':art=box(330,105,260,150,'#14532d')+person(220,155,{arms:true})+path('M277 180L420 130','none','#92400e',4);break;
 case 'compass':art=`<circle cx="360" cy="200" r="88" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>`+path('M360 115L342 220L360 205L378 220Z','#dc2626')+path('M360 282L345 205L360 215L375 205Z','#334155')+text(360,104,'N')+text(470,205,'E')+text(360,310,'S')+text(250,205,'W');break;
 case 'bird':art=box(60,95,600,230,'#e0f2fe')+bird(360,185);break;
 case 'fish':art=box(60,100,600,225,'#bae6fd')+`<ellipse cx="360" cy="215" rx="75" ry="40" fill="#f59e0b"/>`+path('M295 215L235 170L235 260Z','#f59e0b')+circle(405,205,5,'#111827')+circle(480,170,9,'#e0f2fe')+circle(500,130,6,'#e0f2fe');break;
 case 'reading':art=person(355,130,{sad:true})+path('M295 205L352 220L410 205V270L352 284L295 270Z','#fef3c7','#92400e')+path('M352 220V284','none','#92400e')+path('M345 134q-9 12 0 15q9-3 0-15','#60a5fa');break;
 default:throw new Error('Unknown final visual: '+data.kind);
 }
 return {art,height};
}
