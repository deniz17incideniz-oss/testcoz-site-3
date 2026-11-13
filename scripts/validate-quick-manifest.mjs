import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {tests} from './load-bank.mjs';
const context={window:{}};
vm.runInNewContext(fs.readFileSync('data/quick-test-manifest.js','utf8'),context);
const expected=tests.map(({classLevel,subject,topic,difficulty,testNumber})=>({classLevel,subject,topic,difficulty,testNumber}));
assert.equal(JSON.stringify(context.window.TESTCOZ_QUICK_TESTS),JSON.stringify(expected),'Hızlı test listesi güncel değil: npm run generate çalıştırın');
console.log(`Hızlı test listesi: ${expected.length} gerçek test ile uyumlu.`);
