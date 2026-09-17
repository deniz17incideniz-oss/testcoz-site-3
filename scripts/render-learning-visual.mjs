// Explicit renderers for source-defined diagrams; never infer answer labels.
export function renderLearningVisual(type, data, esc, shape) {
 const text=(x,y,value)=>`<text x="${x}" y="${y}" text-anchor="middle" class="value">${esc(value)}</text>`;
 const rect=(x,y,w,h,fill='#DBEAFE')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fill}" stroke="#2563eb" stroke-width="2"/>`;
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
