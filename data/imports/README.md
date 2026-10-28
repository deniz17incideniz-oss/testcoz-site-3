# Zor Test 2 source and visual provenance

The final bank is preserved in `zor-test2-final.md`. `npm run import:zor-test2` maps its 130 topics and 1300 questions to the site. `zor-test2-change-log.json` records each changed question and reason. The original import had a limited duplicate/answer correction scope. The 2026-10-27 user instruction authorizes broader editorial repairs. `data/editorial-repairs.mjs` is the new source, applied reproducibly during `npm run generate`; `adsense-repair-change-log.json` records before/after values without overwriting the historical source.

35 source records require visuals. `zor-test2-visuals.mjs` defines those diagrams; `scripts/render-final-visual.mjs` draws them through the existing asset generator. Conflicting briefs use the question text (digital clock, eagle, school plans). No external image URLs, watermarks or branded characters are used.

`turkey-neighbours.json` is a subset of Natural Earth 1:110m country geometry, downloaded 2026-09-30 from https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson . Natural Earth places its map data in the public domain: https://www.naturalearthdata.com/about/terms-of-use/ . The relief illustration is explicitly a schematic colour transition, not an elevation dataset.

Historical source concerns must be checked against the current effective bank: earlier repairs already removed many noun templates. The October repair adds topic-aligned English and science questions and precise wording fixes. Remaining whole-bank risks are reported by `npm run audit:semantic`, `npm run audit:questions` and the stricter `npm run audit:editorial-gate`. Structural validation is not certification of academic quality or AdSense approval.
