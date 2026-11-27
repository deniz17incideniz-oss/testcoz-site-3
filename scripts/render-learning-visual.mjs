import { renderFinalVisual } from "./render-final-visual.mjs";
// Explicit renderers for source-defined diagrams; never infer answer labels.
export function renderLearningVisual(type, data, esc, shape) {
 if(type==='finalDiagram') return renderFinalVisual(data,esc);
 if(type==='pairedPictograph') {
  let art = `<text x="180" y="105" text-anchor="middle" style="font:600 21px Arial;fill:#334155">Her kare ${esc(data.unit)} kitabı gösterir.</text>`;
  data.groups.forEach((group,groupIndex)=>{
   const left=24, top=125+groupIndex*190;
   art+=`<rect x="${left}" y="${top}" width="312" height="175" rx="18" fill="${groupIndex ? '#f0fdfa' : '#eff6ff'}" stroke="${groupIndex ? '#0f766e' : '#2563eb'}" stroke-width="2"/><text x="180" y="${top+32}" text-anchor="middle" style="font:700 24px Arial;fill:#1e293b">${esc(group.label)}</text>`;
   group.items.forEach((item,row)=>{
    const y=top+67+row*42;
    art+=`<text x="${left+14}" y="${y+7}" style="font:600 22px Arial;fill:#334155">${esc(item.label)}</text>`;
    for(let i=0;i<item.count;i++) art+=`<rect x="${left+105+i*38}" y="${y-13}" width="25" height="25" rx="4" fill="${groupIndex ? '#0f766e' : '#2563eb'}"/>`;
   });
  });
  return {art,width:360,height:515};
 }
 const text=(x,y,value)=>`<text x="${x}" y="${y}" text-anchor="middle" class="value">${esc(value)}</text>`;
 const rect=(x,y,w,h,fill='#DBEAFE')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fill}" stroke="#2563eb" stroke-width="2"/>`;
 if(type==='schoolReadingScene') {
  const art=`<rect x="25" y="90" width="430" height="190" rx="18" fill="#EFF6FF"/>
  <path d="M38 152 L146 99 L254 152 Z" fill="#3B82F6" stroke="#1E40AF" stroke-width="4"/>
  <rect x="48" y="151" width="196" height="112" rx="5" fill="#FEF3C7" stroke="#92400E" stroke-width="3"/>
  <rect x="119" y="208" width="54" height="55" rx="3" fill="#BFDBFE" stroke="#1E40AF" stroke-width="3"/>
  <rect x="67" y="181" width="35" height="26" rx="2" fill="#DBEAFE" stroke="#1E40AF" stroke-width="3"/>
  <rect x="191" y="181" width="35" height="26" rx="2" fill="#DBEAFE" stroke="#1E40AF" stroke-width="3"/>
  <circle cx="349" cy="153" r="21" fill="#F5C8A8" stroke="#78350F" stroke-width="2"/>
  <path d="M328 151 Q330 123 349 129 Q368 125 371 151 Q358 141 349 140 Q340 140 328 151" fill="#78350F"/>
  <path d="M316 255 L323 192 Q349 176 375 192 L382 255 Z" fill="#A7F3D0" stroke="#047857" stroke-width="3"/>
  <path d="M290 202 Q315 197 345 207 L345 250 Q316 240 290 246 Z" fill="#FFFFFF" stroke="#1E40AF" stroke-width="3"/>
  <path d="M345 207 Q375 197 402 202 L402 246 Q374 240 345 250 Z" fill="#FFFFFF" stroke="#1E40AF" stroke-width="3"/>
  <path d="M303 211 L332 216 M303 221 L332 226 M358 216 L389 211 M358 226 L389 221" stroke="#93C5FD" stroke-width="3"/>
  <path d="M35 265 H445" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>`;
  return {art,width:480,height:300};
 }
 if(type==='observationRecords'||type==='observationInterpretation') {
  const values=[data.first,data.second];let y=96,art='';
  values.forEach((value,index)=>{
   const lines=[''];for(const word of String(value).split(/\s+/)){if((lines.at(-1)+' '+word).length>24)lines.push(word);else lines[lines.length-1]+=(lines.at(-1)?' ':'')+word;}
   const h=60+lines.length*39;art+=rect(25,y,430,h,'#f1f5f9');
   const label=type==='observationInterpretation' ? ['Gözlem','Yorum'][index] : `${index+1}. kayıt`;
   art+=`<text x="45" y="${y+27}" style="font:700 21px Arial;fill:#1e293b">${label}</text>`;
   art+=lines.map((line,i)=>`<text x="45" y="${y+64+i*39}" style="font:28px Arial;fill:#1f2937">${esc(line)}</text>`).join('');y+=h+14;
  });
  return {art,width:480,height:Math.max(300,y+28)};
 }
 if(type==='cards') {
  const labels={correct:'A',wrong:'B',first:'A',second:'B',text:'Bilgi',konu:'Konu',seviye:'Seviye',beceri:'Beceri'};
  const lines=Object.entries(data).filter(([,v])=>['string','number'].includes(typeof v));
  let y=96,art='';
  for(const [key,value] of lines) {
   const words=String(value).split(/\s+/),wrapped=[''];for(const word of words){if((wrapped.at(-1)+' '+word).length>46)wrapped.push(word);else wrapped[wrapped.length-1]+=(wrapped.at(-1)?' ':'')+word;}
   const height=wrapped.length*30+44;art+=rect(45,y,630,height,'#f1f5f9');
   art+=`<text x="65" y="${y+27}" class="value">${esc(labels[key]||'Bilgi')}</text>`;
   art+=wrapped.map((line,i)=>`<text x="65" y="${y+57+i*30}" style="font:22px Arial;fill:#1f2937">${esc(line)}</text>`).join('');y+=height+14;
  }
  return {art,height:Math.max(300,y+28)};
 }
 if(type==='balance') {
  const delta=Math.sign(data.left.value-data.right.value)*27,yl=150+delta,yr=150-delta;
  return {art:`<path d="M330 250 L360 145 L390 250 Z" fill="#94a3b8"/><line x1="175" y1="${yl}" x2="545" y2="${yr}" stroke="#475569" stroke-width="7"/>${rect(105,yl+15,140,55)}${rect(475,yr+15,140,55)}${text(175,yl+50,data.left.label)}${text(545,yr+50,data.right.label)}`};
 }
 if(['units','unitsCompare','measurementError'].includes(type)) {
  const counts=type==='unitsCompare'?[data.large,data.small]:[data.count||data.units];let art='';
  counts.forEach((count,row)=>{const y=115+row*80,w=500/count;art+=`<line x1="90" y1="${y-10}" x2="590" y2="${y-10}" stroke="#334155" stroke-width="8"/>`;
   for(let i=0;i<count;i++){const shift=data.overlap?-i*15:(data.gapAfter&&i>=data.gapAfter?24:0);art+=rect(90+i*w+shift,y,w,35,i%2?'#fef3c7':'#dbeafe');}
  });return {art};
 }
 if(type==='subtraction') {
  let art='';for(let i=0;i<data.total;i++){const x=90+(i%7)*85,y=130+Math.floor(i/7)*80;art+=shape('star',x,y,42,'#d97706');if(i>=data.total-data.removed)art+=`<path d="M${x-24} ${y-24}l48 48m0 -48l-48 48" stroke="#b91c1c" stroke-width="4"/>`;}
  return {art};
 }
 if(type==='matching')return {art:data.items.map((item,i)=>{const x=80+i*(560/Math.max(1,data.items.length-1));return shape(item.kind,x,150,item.size?item.size*24:50,item.color)+text(x,225,item.id);}).join('')};
 if(type==='position') {
  if(data.relation==='inside')return {art:rect(90,100,310,155)+text(240,185,data.first)+text(545,185,data.second)};
  if(data.items)return {art:data.items.map((v,i)=>text(140+i*220,170,v)).join('')};
  return {art:shape('star',230,165,70,'#eab308')+shape('circle',490,165,70,'#2563eb')};
 }
 if(type==='path')return {art:data.steps.map((step,i)=>text(70+i*(580/Math.max(data.steps.length,1)),165,`${i+1}. ${step}`)).join('')};
 if(type==='pathCompare')return {art:text(350,140,`Birinci rota: ${data.first} adım`)+text(350,205,`İkinci rota: ${data.second} adım`)};
 if(type==='shapeHouse')return {art:shape(data.roof,360,125,100,'#d97706')+shape(data.body,360,220,105,'#2563eb')};
 if(type==='shapeRobot')return {art:shape('square',360,190,80)+shape('rectangle',270,185,60)+shape('rectangle',450,185,60)+shape('circle',360,115,50,'#d97706')};
 if(type==='shapeGroups')return {art:data.groups.map((g,i)=>text(130+i*230,110,g.label)+g.shapes.map((s,j)=>shape(s,100+i*230+j*65,185,50)).join('')).join('')};
 return null;
}
