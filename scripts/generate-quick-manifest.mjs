import fs from 'node:fs';
import {tests} from './load-bank.mjs';
const entries=tests.map(({classLevel,subject,topic,difficulty,testNumber})=>({classLevel,subject,topic,difficulty,testNumber}));
fs.writeFileSync('data/quick-test-manifest.js','// Generated from the actual test bank.\nwindow.TESTCOZ_QUICK_TESTS = '+JSON.stringify(entries)+';\n');
