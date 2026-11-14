import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';

test('review ledger rejects stale content, missing evidence and duplicate IDs',()=>{
 const original=JSON.parse(fs.readFileSync('data/imports/editorial-independent-review.json','utf8'));
 const tmp=path.join(os.tmpdir(),`testcoz-review-${crypto.randomUUID()}.json`);
 try{
  for(const [mutate,expected] of [
   [x=>{x.records[0].content_sha256='0'.repeat(64);},'Stale review'],
   [x=>{x.records[0].status='VERIFIED';x.records[0].evidence='';},'Review needs substantive evidence'],
   [x=>{x.records[1].id=x.records[0].id;},'Duplicate review IDs']
  ]){
   const copy=structuredClone(original);mutate(copy);fs.writeFileSync(tmp,JSON.stringify(copy));
   const result=spawnSync(process.execPath,['scripts/audit-editorial-review.mjs','--ledger',tmp],{encoding:'utf8'});
   assert.notEqual(result.status,0);assert.match(result.stderr,new RegExp(expected));
  }
 }finally{fs.rmSync(tmp,{force:true});}
});

test('new ledger entries remain unreviewed without changing previous decisions',()=>{
 const original=JSON.parse(fs.readFileSync('data/imports/editorial-independent-review.json','utf8'));
 const copy=structuredClone(original);const removed=copy.records.pop();
 const tmp=path.join(os.tmpdir(),`testcoz-review-${crypto.randomUUID()}.json`);
 try{
  fs.writeFileSync(tmp,JSON.stringify(copy));
  const result=spawnSync(process.execPath,['scripts/audit-editorial-review.mjs','--ledger',tmp,'--add-unreviewed'],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
  const after=JSON.parse(fs.readFileSync(tmp,'utf8'));
  assert.deepEqual(after.records.slice(0,-1),copy.records);
  assert.equal(after.records.at(-1).id,removed.id);
  assert.equal(after.records.at(-1).status,'NOT_REVIEWED');assert.equal(after.records.at(-1).evidence,'');
 }finally{fs.rmSync(tmp,{force:true});}
});
