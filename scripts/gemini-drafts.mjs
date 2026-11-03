// Gemini drafts are review inputs, never direct changes to the question bank.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const outDir = path.resolve('outputs/gemini-drafts');
const textModel = process.env.TESTCOZ_GEMINI_TEXT_MODEL || 'gemini-3.1-flash-lite';
const imageModel = process.env.TESTCOZ_GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-image';
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateDraft(data, expectedCount, choiceCount) {
 if (!data || !Array.isArray(data.questions) || data.questions.length !== expectedCount) throw new Error(`Expected ${expectedCount} questions`);
 const seen = new Set();
 for (const [i,q] of data.questions.entries()) {
  for (const key of ['question','correctAnswer','explanation','subSkill','questionType','imageBrief','imageAlt']) {
   if (typeof q[key] !== 'string') throw new Error(`Question ${i+1}: invalid ${key}`);
  }
  if (!q.question.trim() || !q.correctAnswer.trim() || !q.subSkill.trim() || !q.questionType.trim()) throw new Error(`Question ${i+1}: required content is empty`);
  if(q.explanation.trim().length<40)throw new Error(`Question ${i+1}: explanation is shorter than 40 characters`);
  if (!Array.isArray(q.choices) || q.choices.length !== choiceCount || q.choices.some(c=>typeof c !== 'string' || !c.trim())) throw new Error(`Question ${i+1}: invalid choices`);
  const normal = s=>s.trim().toLocaleLowerCase('tr-TR');
  const choices=q.choices.map(normal);
  if(new Set(choices).size!==choiceCount || choices.filter(c=>c===normal(q.correctAnswer)).length!==1) throw new Error(`Question ${i+1}: ambiguous choices or key`);
  const key=normal(q.question); if(seen.has(key))throw new Error(`Question ${i+1}: repeated question`);seen.add(key);
  if(Boolean(q.imageBrief.trim())!==Boolean(q.imageAlt.trim()))throw new Error(`Question ${i+1}: image brief and alt must be paired`);
 }
 return data;
}

const schema = {type:'OBJECT',properties:{questions:{type:'ARRAY',items:{type:'OBJECT',properties:{
 question:{type:'STRING'},choices:{type:'ARRAY',items:{type:'STRING'}},correctAnswer:{type:'STRING'},
 explanation:{type:'STRING'},subSkill:{type:'STRING'},questionType:{type:'STRING'},imageBrief:{type:'STRING'},imageAlt:{type:'STRING'}
},required:['question','choices','correctAnswer','explanation','subSkill','questionType','imageBrief','imageAlt']}}},required:['questions']};

async function api(model, payload) {
 const key=process.env.GEMINI_API_KEY;
 if(!key)throw new Error('GEMINI_API_KEY bulunamadı. Anahtarı güvenli ortam değişkeni olarak tanımlayın.');
 if(!/^[a-z0-9.-]+$/.test(model))throw new Error('Invalid model name');
 const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{
  method:'POST',headers:{'content-type':'application/json','x-goog-api-key':key},body:JSON.stringify(payload),signal:AbortSignal.timeout(120000)
 });
 const data=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(`Gemini API HTTP ${response.status}: ${String(data.error?.status || 'request failed')}`);
 const candidate=data.candidates?.[0];
 if(!candidate || (candidate.finishReason && candidate.finishReason !== 'STOP'))throw new Error(`Gemini did not finish normally: ${candidate?.finishReason || data.promptFeedback?.blockReason || 'no candidate'}`);
 return candidate.content?.parts || [];
}

async function main() {
 const [mode,...args]=process.argv.slice(2);
 if(mode==='questions') {
  const [grade,subject,topic,difficulty,number='10']=args;
  const count=Number(number), cls=Number(grade);
  if(![1,2,3,4].includes(cls) || !slugPattern.test(subject||'') || !slugPattern.test(topic||'') || !['kolay','orta','zor'].includes(difficulty) || !Number.isInteger(count) || count<1 || count>10)throw new Error('Usage: node scripts/gemini-drafts.mjs questions <1-4> <subject-slug> <topic-slug> <kolay|orta|zor> [1-10]');
  const choiceCount=cls<=3?3:4;
  const extra=cls===4&&subject==='matematik'&&topic==='carpma'?'Farklı beceriler kullan: basamaklara ayırma, kısa yoldan 10 ve 100 ile çarpma, gerçekçi eş grup problemi, işlemde eksik çarpan, çarpmanın değişme özelliği ve sonucu uygun yolla tahmin veya kontrol etme. Yalnız tek basamaklı çarpım tablosunu soran sorular hazırlama. Aynı eş grup hikâyesini farklı nesnelerle tekrarlama. Sayılar ve kazanımlar 4. sınıfa uygun olsun.':'Beceri türlerini olabildiğince çeşitlendir; aynı problemi yalnız nesne veya sayı değiştirerek tekrarlama.';
  const prompt=`Türkiye ilkokulu için ${cls}. sınıf, ders ${subject}, konu ${topic}, ${difficulty} düzeyinde ${count} özgün çoktan seçmeli soru taslağı hazırla. Her soruda tam ${choiceCount} farklı seçenek, yalnız bir doğru cevap ve öğrenciye çözüm yolunu gösteren en az 60 karakterlik Türkçe açıklama olsun. Sınıf düzeyine uygun, farklı becerileri ölçen, konu dışına çıkmayan, gerçekçi ve birbirini tekrar etmeyen sorular hazırla. ${extra} Görsel sadece öğrenme için gerçekten gerekliyse imageBrief alanına metinsiz bir görsel betimi, imageAlt alanına soruyu çözmeye yetecek doğru alternatif metin yaz; diğer sorularda iki alan da boş olsun. Görselde sayı veya metin güvenilirliği gerekiyorsa görsel isteme; verileri soru metnine koy. Resmî onay veya doğrulanmamış kaynak iddia etme. Bu sorular yayınlanmayacak taslaklardır.`;
  const parts=await api(textModel,{contents:[{parts:[{text:prompt}]}],generationConfig:{responseMimeType:'application/json',responseSchema:schema}});
  const raw=parts.filter(p=>p.text).map(p=>p.text).join('');let result;try{result=JSON.parse(raw)}catch{throw new Error('Gemini returned invalid JSON')}
  validateDraft(result,count,choiceCount);fs.mkdirSync(outDir,{recursive:true});
  const stamp=new Date().toISOString().replace(/[:.]/g,'-');const file=path.join(outDir,`${grade}-${subject}-${topic}-${difficulty}-${stamp}.json`);
  fs.writeFileSync(file,JSON.stringify({status:'DRAFT_REQUIRES_EDITORIAL_REVIEW',model:textModel,grade:cls,subject,topic,difficulty,createdAt:new Date().toISOString(),...result},null,2)+'\n',{flag:'wx'});
  console.log(`Draft saved: ${file}`);console.log('Schema checks passed; answers, curriculum fit and image accuracy need independent review.');
 } else if(mode==='image') {
  const [filename,indexArg]=args;const absolute=path.resolve(filename||'');const relative=path.relative(outDir,absolute);
  if(relative.startsWith('..') || path.isAbsolute(relative) || path.extname(absolute)!=='.json')throw new Error('Image input must be a draft JSON inside outputs/gemini-drafts');
  const draft=JSON.parse(fs.readFileSync(absolute,'utf8'));const index=Number(indexArg)-1;
  if(!Number.isInteger(index)||index<0||index>=draft.questions.length)throw new Error('Specify a valid question number (starting at 1).');
  const q=draft.questions[index];if(!q.imageBrief || !q.imageAlt)throw new Error('This question has no image brief and alternative text.');
  const prompt=`Create an age-appropriate clean educational illustration for a Turkish primary school question. No text, numerals, letters, logos, branding or watermarks. Illustration brief: ${q.imageBrief}. Do not include the answer. Avoid inventing details that alter the problem. Flat, clear style with high contrast.`;
  const parts=await api(imageModel,{contents:[{parts:[{text:prompt}]}],generationConfig:{responseModalities:['IMAGE']}});
  const img=parts.find(p=>p.inlineData?.data)?.inlineData;
  if(!img || !['image/png','image/jpeg'].includes(img.mimeType))throw new Error('No supported image returned.');
  const target=absolute.replace(/\.json$/,`-q${index+1}.${img.mimeType==='image/png'?'png':'jpg'}`);
  fs.writeFileSync(target,Buffer.from(img.data,'base64'),{flag:'wx'});console.log(`Draft image saved: ${target}`);console.log('Inspect image, answer and alternative text before use.');
 } else throw new Error('Use questions or image mode. See docs/GEMINI-DRAFTS.md.');
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) main().catch(e=>{console.error(e.message);process.exitCode=1});
