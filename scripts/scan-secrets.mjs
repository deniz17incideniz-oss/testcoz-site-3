import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const files=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
const bad=[];
for(const f of files){
 if(/(^|\/)\.env($|\.)/.test(f)&&!f.endsWith('.env.example'))bad.push(`${f}: env file`);
 if(!fs.existsSync(f)||fs.statSync(f).size>2e6)continue;
 const text=fs.readFileSync(f,'utf8');
 for(const pattern of [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----\s+[A-Za-z0-9+/=\r\n]{80,}/,/\bgh[pousr]_[A-Za-z0-9]{30,}\b/,/\bgithub_pat_[A-Za-z0-9_]{50,}\b/,/\bAIza[A-Za-z0-9_-]{35}\b/,/\bAKIA[A-Z0-9]{16}\b/])if(pattern.test(text))bad.push(`${f}: possible credential (redacted)`);
}
console.log(bad.length?bad.join('\n'):`Secret patterns: ${files.length} tracked files scanned, no matches. Test-only credentials and variable references require diff review.`);
if(bad.length)process.exitCode=1;
