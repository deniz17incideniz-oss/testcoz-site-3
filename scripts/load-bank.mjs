import fs from 'node:fs';
import vm from 'node:vm';
const ctx={window:{},URLSearchParams};vm.createContext(ctx);
for(const file of ['js/utils.js','data/catalog.js','data/test-normalizer.js',...fs.readdirSync('data/tests').filter(f=>f.endsWith('.js')).sort().map(f=>'data/tests/'+f)])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
export const tests=ctx.window.TestCozTestNormalizer.normalizeAllTests(ctx.window.TESTCOZ_TESTS);
export const catalog=ctx.window.TESTCOZ_CATALOG;
