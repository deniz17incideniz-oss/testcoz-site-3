import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "node_modules", "automation", "outputs", "work"]);
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if (entry.isDirectory()) return ignoredDirectories.has(entry.name) ? [] : walk(path.join(directory, entry.name));
  return entry.name.endsWith(".html") ? [path.join(directory, entry.name)] : [];
});
const rel = (file) => path.relative(root, file).replaceAll("\\", "/");
const htmlFiles = walk(root);
const indexed = [];
const thin = [];
const errors = [];
const links = new Map();

function localTarget(file, reference) {
  if (!reference || /^(#|mailto:|tel:|javascript:|data:)/i.test(reference)) return null;
  let url;
  try { url = new URL(reference, `https://testcoz.pro/${rel(file)}`); } catch { return null; }
  if (!["testcoz.pro", "www.testcoz.pro"].includes(url.hostname) || url.pathname.startsWith("/api/")) return null;
  const pathname = decodeURIComponent(url.pathname);
  const target = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  return target.endsWith("/") ? `${target}index.html` : target;
}

for (const file of htmlFiles) {
  const key = rel(file);
  const $ = load(fs.readFileSync(file, "utf8"));
  const noindex = /noindex/i.test($("meta[name=robots]").attr("content") || "");
  const targets = new Set();
  $("a[href]").each((_, element) => {
    const target = localTarget(file, $(element).attr("href"));
    if (target) targets.add(target);
  });
  links.set(key, targets);
  const loaders = $("script[src*='pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']");
  if (noindex && loaders.length) errors.push(`${key}: noindex sayfada AdSense loader var`);
  if (loaders.length > 1) errors.push(`${key}: birden fazla AdSense loader var`);
  if (loaders.length && !(loaders.attr("src") || "").includes("ca-pub-1287455375559097")) errors.push(`${key}: publisher uyuşmuyor`);
  if (noindex) continue;
  indexed.push(key);
  const words = $("main").text().replace(/\s+/g, " ").trim().match(/[\p{L}\p{N}]+/gu)?.length || 0;
  if (words < 120) thin.push({ page: key, words });
}

const reachable = new Set(["index.html"]);
const queue = ["index.html"];
while (queue.length) {
  const current = queue.shift();
  for (const target of links.get(current) || []) {
    if (!links.has(target) || reachable.has(target)) continue;
    reachable.add(target);
    queue.push(target);
  }
}
const orphanPages = indexed.filter((page) => !reachable.has(page));
const trustPages = ["hakkimizda.html", "icerik-yaklasimimiz.html", "iletisim.html", "gizlilik-politikasi.html", "kullanim-sartlari.html"];
for (const page of trustPages) {
  if (!fs.existsSync(page)) errors.push(`eksik güven sayfası: ${page}`);
  else if ((load(fs.readFileSync(page, "utf8"))("main").text().match(/[\p{L}\p{N}]+/gu)?.length || 0) < 100) errors.push(`yetersiz güven sayfası: ${page}`);
}
const adsTxt = fs.readFileSync("ads.txt", "utf8").trim();
if (adsTxt !== "google.com, pub-1287455375559097, DIRECT, f08c47fec0942fa0") errors.push("ads.txt satırı beklenen publisher ile eşleşmiyor");
const robots = fs.readFileSync("robots.txt", "utf8");
if (!/Allow:\s*\//i.test(robots) || !/Sitemap:\s*https:\/\/testcoz\.pro\/sitemap\.xml/i.test(robots)) errors.push("robots.txt public crawl veya sitemap bildirimi eksik");
if (orphanPages.length) errors.push(`${orphanPages.length} indexlenebilir orphan sayfa var`);

const report = {
  generatedAt: new Date().toISOString(),
  pages: htmlFiles.length,
  indexablePages: indexed.length,
  uniqueIndexablePages: new Set(indexed).size,
  thinPages: thin,
  orphanPages,
  trustPages,
  adsTxt: adsTxt === "google.com, pub-1287455375559097, DIRECT, f08c47fec0942fa0" ? "PASS" : "FAIL",
  publisher: "ca-pub-1287455375559097",
  duplicateLoader: errors.some((error) => error.includes("birden fazla AdSense")) ? "FAIL" : "PASS",
  childAgeTreatment: "MANUAL",
  cmp: "MANUAL",
  errors,
};
fs.mkdirSync("outputs", { recursive: true });
fs.writeFileSync("outputs/adsense-readiness.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  pages: report.pages,
  indexablePages: report.indexablePages,
  thinPages: report.thinPages.length,
  orphanPages: report.orphanPages.length,
  adsTxt: report.adsTxt,
  duplicateLoader: report.duplicateLoader,
  errors: report.errors,
}, null, 2));
if (errors.length) process.exitCode = 1;
