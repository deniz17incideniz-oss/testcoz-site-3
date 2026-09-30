# Zor Test 2 source and visual provenance

The final bank is preserved in `zor-test2-final.md`. `npm run import:zor-test2` maps its 130 topics and 1300 questions to the site. `zor-test2-change-log.json` records each changed question and reason. User authorization limits edits to proven duplicate or answer errors. Source topic assignments and other wording remain unchanged.

35 source records require visuals. `zor-test2-visuals.mjs` defines those diagrams; `scripts/render-final-visual.mjs` draws them through the existing asset generator. Conflicting briefs use the question text (digital clock, eagle, school plans). No external image URLs, watermarks or branded characters are used.

`turkey-neighbours.json` is a subset of Natural Earth 1:110m country geometry, downloaded 2026-09-30 from https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson . Natural Earth places its map data in the public domain: https://www.naturalearthdata.com/about/terms-of-use/ . The relief illustration is explicitly a schematic colour transition, not an elevation dataset.

The source contains pedagogical concerns outside the authorized correction scope, including generic noun questions assigned to science/life-skills topics and implausible arithmetic contexts. Structural validation is not certification of academic quality or AdSense approval.
