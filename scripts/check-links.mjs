import fs from "node:fs";
import path from "node:path";

const ignoredFolders = new Set([".git", "node_modules", "automation", "work", "outputs"]);

function walk(folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) return ignoredFolders.has(entry.name) ? [] : walk(path.join(folder, entry.name));
    return entry.name.endsWith(".html") ? [path.join(folder, entry.name)] : [];
  });
}

const missing = [];
for (const file of walk(".")) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#|javascript:)/.test(reference)) continue;
    const target = reference.split(/[?#]/)[0];
    if (!target) continue;
    const resolved = path.resolve(path.dirname(file), target.replace(/^\//, ""));
    if (!fs.existsSync(resolved)) missing.push(`${file}: ${reference}`);
  }
}

if (missing.length) throw new Error("Kırık yerel bağlantılar:\n" + missing.join("\n"));
console.log("✓ Yerel HTML bağlantıları doğrulandı.");
