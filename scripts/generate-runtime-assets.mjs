import fs from 'node:fs';
import {tests} from './load-bank.mjs';
const dimensions = {};
for (const t of tests) for (const q of t.questions) {
  if (!q.image) continue;
  const svg = fs.readFileSync(q.image, 'utf8');
  const match = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (!match) throw new Error(`Missing viewBox: ${q.image}`);
  dimensions[q.image] = [Number(match[1]), Number(match[2])];
}
fs.mkdirSync('data/runtime', {recursive:true});
fs.writeFileSync('data/runtime/image-dimensions.js', 'window.TESTCOZ_IMAGE_DIMENSIONS='+JSON.stringify(dimensions)+';\n');
const groups = new Map();
for (const t of tests.filter(t=>t.testNumber===2)) {
  const key=`${t.classLevel}-${t.subject}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(t);
}
for (const [key, bank] of groups) fs.writeFileSync(`data/runtime/zor-test2-${key}.js`, '(function(){window.TESTCOZ_TESTS=window.TESTCOZ_TESTS||[];window.TESTCOZ_TESTS.push(...'+JSON.stringify(bank)+');})();\n');
console.log(`Runtime: ${groups.size} subject bundles; ${Object.keys(dimensions).length} intrinsic image dimensions`);
