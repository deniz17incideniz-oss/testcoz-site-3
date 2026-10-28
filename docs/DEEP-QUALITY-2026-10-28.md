# Deep quality follow-up — 28 October 2026

This release builds on bf989fa (229 repaired records) without repeating or reverting that work. It is a targeted improvement, not an AdSense readiness certificate.

## Changes and evidence

- 30 additional questions in grade 3 Hayat Bilgisi / Ben ve Okulum Test 1 (easy, medium, hard) are individually authored replacements for repeated cross-grade templates. They have three choices, explicit single keyed answers and situation-specific explanations. Ten questions per test and stable source IDs remain. The combined source-ID change log contains 259 records across 69 tests.
- One grade-specific lesson replaces the shared school-life mini lesson on the grade-3 subject page and its four test landings. The earlier 130 topic-card placements, 19 subject pages and 520 test landings remain. Placements are not 130 independently authored lessons: some topic keys share material across grades.
- Twelve obsolete text-card visuals in the 30 replaced records are no longer referenced. Files are retained; all 35 Test 2 SVG references remain. The effective bank now references 964 images, compared with 976 on bf989fa and 1,007 on production 713f54c.
- Browser repair loading is generated from the actual Test 1 repair groups, avoiding a manually maintained subject list. Browser regression tests compare all 259 repaired records in 69 tests against the effective bank, including answers and images. Four additional checks cover the school lesson/quiz at 320, 375, 768 and 1440 pixels.
- Persistent logout: the registration sheet's K column stores an account session version. Logout invalidates all devices; the button states this. Existing ten-column rows and existing cookies remain compatible until logout. Only K1 and the current account's K cell are written, in a single Sheets batch request. Conflicting K content blocks the operation instead of overwriting it. A failed write returns an error and retains the cookie for retry. A replayed revoked cookie cannot revoke a newer login. No student account or result was created for production testing.

## Before/after (same audit and same denominator)

| Measurement | bf989fa | Current |
|---|---:|---:|
| Tests / questions | 520 / 5,200 | 520 / 5,200 |
| Exact groups after removing grade/difficulty prefixes | 444 | 414 |
| Question trigram pairs at least 80% similar | 535 | 511 |
| Grade 1–3 records with four rather than three choices | 2,430 | 2,400 |
| Embedded other-grade labels in grade-3 prompts | 12 | 10 |
| Simple explanation-restatement flags | 36 | 33 |
| Short explanation flags (under 35 characters) | 680 | 680 |
| Landing page trigram pairs at least 80% similar | 46 | 43 |

The older question-quality report uses a different normalization and still reports 136 exact groups. The new 414 is not an increase in defects; it detects prefixes the old scanner missed. Similarity and brevity are triage signals, not automatic proof of a wrong question.

## Local validation

npm ci, generate, npm test, audit:questions, audit:release-content, audit:pedagogy, audit:adsense, audit:secrets, audit:editorial-gate, audit:session-revocation and git diff --check passed. npm audit: zero known vulnerabilities. Full browser suite: 153/153 passed. Pedagogy sample: 285 records, 29 warnings; this is not a full semantic review. CI, Preview and production evidence is added after deployment.

## Deliberate limits and release distinction

The incremental changes can be tested independently. They do not make the whole site ready for AdSense. In particular, 2,400 legacy Test 1 records still have four options in grades 1–3, ten prompts retain another-grade references, 414 normalized duplicate groups and 43 similar landing pairs remain. The 30 new questions are real editorial work; broad mechanical option removal has not been represented as a content repair. Older tests remain supported by the existing structural validator's documented exceptions.

Live register/login/Sheets-result writes require a real user session; no fake production records were created. The logout implementation has fixture coverage for persistence, stale token replay, fresh login and upstream failure. Preview read-only diagnosis checks the real sheet schema before release; it cannot establish a successful real-account write. Check a real user's login/result/logout flow before calling the account journey fully verified.

Google account-level child treatment / TFAT, consent/CMP publication, ad personalization and first-party cookie choices require account-panel verification. Earlier panel observations may be stale. ads.txt returning the publisher ID does not prove Google's scanner has refreshed. Do not request AdSense review in this release.

## Reproduction

`npm run audit:deep-quality` writes current triage to outputs/deep-quality-current.json. `node scripts/audit-deep-quality.mjs --ref bf989fa` independently loads the prior committed source for comparison. `data/imports/adsense-repair-change-log.json` preserves source IDs, reasons, before and after content. `npm run test:browser` includes every repaired test. `npm run audit:session-revocation` verifies server rejection of an old signed cookie.
