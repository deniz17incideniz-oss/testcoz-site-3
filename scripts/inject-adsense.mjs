import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".");
const CLIENT_ID = "ca-pub-1287455375559097";
const SNIPPET = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}"
     crossorigin="anonymous"></script>`;

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(fullPath);
    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

let changed = 0;
const files = htmlFiles(ROOT);
for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  const occurrences = html.split(CLIENT_ID).length - 1;
  if (occurrences > 1) throw new Error(`AdSense kodu birden fazla kez bulundu: ${path.relative(ROOT, file)}`);
  if (occurrences === 0) {
    if (!/<head(?:\s[^>]*)?>/i.test(html) || !/<\/head>/i.test(html)) throw new Error(`Head etiketi bulunamadı: ${path.relative(ROOT, file)}`);
    html = html.replace(/<head(?:\s[^>]*)?>/i, (head) => `${head}\n  ${SNIPPET}`);
    fs.writeFileSync(file, html, "utf8");
    changed += 1;
  }
  const head = html.match(/<head(?:\s[^>]*)?>([\s\S]*?)<\/head>/i)?.[1] || "";
  if (!head.includes(CLIENT_ID)) throw new Error(`AdSense kodu head dışında: ${path.relative(ROOT, file)}`);
}

console.log(`✓ ${files.length} HTML dosyası doğrulandı; ${changed} dosyaya AdSense kodu eklendi.`);
