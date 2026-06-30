import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const context = { window: {} };
vm.createContext(context);
for (const file of fs.readdirSync("data/tests").filter((name) => name.endsWith(".js")).sort()) {
  vm.runInContext(fs.readFileSync(path.join("data/tests", file), "utf8"), context);
}
const tests = (context.window.TESTCOZ_TESTS || []).filter((test) => test.classLevel <= 2);
const imageDir = path.resolve("images/tests");
const pageDir = path.resolve("tests");
fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]);
}

function shape(kind, x, y, size, color = "#2563EB", rotate = 0) {
  const transform = `transform="rotate(${rotate} ${x} ${y})"`;
  if (kind === "circle") return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${color}"/>`;
  if (kind === "triangle") return `<polygon points="${x},${y - size / 2} ${x - size / 2},${y + size / 2} ${x + size / 2},${y + size / 2}" fill="${color}" ${transform}/>`;
  if (kind === "rectangle") return `<rect x="${x - size * .65}" y="${y - size * .4}" width="${size * 1.3}" height="${size * .8}" rx="8" fill="${color}" ${transform}/>`;
  return `<rect x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" rx="8" fill="${color}" ${transform}/>`;
}

function flattenData(data) {
  if (!data) return [];
  if (data.text) return [data.text];
  if (data.labeled) return data.labeled.map((item) => `${item.label}: ${item.value} TL`);
  if (data.values) return data.values.map((value) => `${value} TL`);
  if (data.groups) return data.groups.map((item) => `${item.label}: ${item.count}`);
  if (data.items && data.items.every((item) => typeof item === "object" && "value" in item)) return data.items.map((item) => `${item.label}: ${item.value}`);
  if (data.left && data.right) return [`${data.left.label}: ${data.left.value}`, `${data.right.label}: ${data.right.value}`];
  if (data.steps) return data.steps.map((step, index) => `${index + 1}. ${step}`);
  if (data.first || data.second) return [data.first, data.second].filter(Boolean);
  if (data.large || data.small) return [`Büyük birim: ${data.large}`, `Küçük birim: ${data.small}`];
  return Object.entries(data).filter(([, value]) => ["string", "number"].includes(typeof value)).map(([key, value]) => `${key}: ${value}`);
}

function renderSvg(question) {
  const { type, title, data } = question.visual;
  const colors = ["#2563EB", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];
  let art = "";

  if (["chart", "bars"].includes(type) && data.items) {
    const max = Math.max(...data.items.map((item) => item.value), 1);
    art = data.items.map((item, index) => {
      const x = 70 + index * (560 / data.items.length);
      const height = 125 * item.value / max;
      return `<rect x="${x}" y="${235 - height}" width="${Math.min(90, 440 / data.items.length)}" height="${height}" rx="10" fill="${colors[index % colors.length]}"/><text x="${x + 35}" y="${255}" text-anchor="middle" class="label">${esc(item.label)}</text><text x="${x + 35}" y="${225 - height}" text-anchor="middle" class="value">${item.value}</text>`;
    }).join("");
  } else if (type === "dots" && data.groups) {
    art = data.groups.map((group, groupIndex) => {
      const startX = 70 + groupIndex * (580 / data.groups.length);
      const dots = Array.from({ length: group.count }, (_, index) => `<circle cx="${startX + (index % 6) * 24}" cy="${120 + Math.floor(index / 6) * 24}" r="8" fill="${colors[groupIndex % colors.length]}"/>`).join("");
      return `${dots}<text x="${startX + 55}" y="215" text-anchor="middle" class="label">${esc(group.label)}: ${group.count}</text>`;
    }).join("");
  } else if (type === "numberLine") {
    const start = data.start ?? 0;
    const end = data.end ?? 20;
    const width = 570;
    art = `<line x1="75" y1="175" x2="645" y2="175" stroke="#334155" stroke-width="4"/>` +
      Array.from({ length: end - start + 1 }, (_, index) => {
        const value = start + index;
        const x = 75 + width * index / (end - start);
        return `<line x1="${x}" y1="165" x2="${x}" y2="185" stroke="#334155" stroke-width="2"/><text x="${x}" y="210" text-anchor="middle" class="small">${value}</text>`;
      }).join("") +
      (data.arrow || []).map((value, index) => `<circle cx="${75 + width * (value - start) / (end - start)}" cy="150" r="10" fill="${colors[index % colors.length]}"/>`).join("");
  } else if (type === "coins") {
    const values = data.values || (data.labeled || []).map((item) => item.value);
    art = values.map((value, index) => {
      const x = 100 + index * (520 / Math.max(values.length - 1, 1));
      const label = data.labeled?.[index]?.label;
      return `<circle cx="${x}" cy="155" r="48" fill="#FEF3C7" stroke="#D97706" stroke-width="5"/><text x="${x}" y="162" text-anchor="middle" class="coin">${value} TL</text>${label ? `<text x="${x}" y="225" text-anchor="middle" class="label">${esc(label)}</text>` : ""}`;
    }).join("");
  } else if (["equation"].includes(type)) {
    art = `<rect x="105" y="105" width="510" height="105" rx="22" fill="#EFF6FF" stroke="#60A5FA" stroke-width="4"/><text x="360" y="173" text-anchor="middle" class="equation">${esc(data.text)}</text>`;
  } else if (["pattern", "shapes", "shapeSet", "shapePattern", "rotatedShapes"].includes(type)) {
    const source = data.shapes || data.items || data.labeled || [];
    art = source.map((item, index) => {
      const kind = typeof item === "string" ? item : (item.shape || item.kind);
      const x = 85 + index * (550 / Math.max(source.length - 1, 1));
      if (kind === "?") return `<text x="${x}" y="180" text-anchor="middle" class="equation">?</text>`;
      if (["red", "blue", "green", "yellow"].includes(kind)) return `<rect x="${x - 28}" y="127" width="56" height="56" rx="12" fill="${kind}"/>`;
      return `${shape(kind, x, 155, 60, colors[index % colors.length], item.rotate || 0)}${item.label || item.id ? `<text x="${x}" y="225" text-anchor="middle" class="label">${esc(item.label || item.id)}</text>` : ""}`;
    }).join("");
  } else if (type === "pictograph" && data.items) {
    art = data.items.map((item, row) => {
      const dots = Array.from({ length: item.symbols }, (_, index) => `<circle cx="${235 + index * 65}" cy="${130 + row * 75}" r="20" fill="${colors[row % colors.length]}"/>`).join("");
      return `<text x="185" y="${137 + row * 75}" text-anchor="end" class="label">${esc(item.label)}</text>${dots}`;
    }).join("") + `<text x="360" y="275" text-anchor="middle" class="small">Her simge ${data.unit} veriyi gösterir.</text>`;
  } else if (type === "balance" && data.left && data.right) {
    art = `<line x1="360" y1="115" x2="360" y2="235" stroke="#475569" stroke-width="8"/><line x1="170" y1="145" x2="550" y2="145" stroke="#475569" stroke-width="7"/><circle cx="170" cy="180" r="55" fill="#DBEAFE"/><circle cx="550" cy="180" r="55" fill="#FEF3C7"/><text x="170" y="176" text-anchor="middle" class="value">${esc(data.left.label)}</text><text x="170" y="200" text-anchor="middle" class="small">${data.left.value}</text><text x="550" y="176" text-anchor="middle" class="value">${esc(data.right.label)}</text><text x="550" y="200" text-anchor="middle" class="small">${data.right.value}</text>`;
  } else {
    const lines = flattenData(data).slice(0, 6);
    art = lines.map((line, index) => `<rect x="${80 + (index % 3) * 195}" y="${105 + Math.floor(index / 3) * 80}" width="170" height="58" rx="14" fill="${colors[index % colors.length]}18" stroke="${colors[index % colors.length]}" stroke-width="3"/><text x="${165 + (index % 3) * 195}" y="${140 + Math.floor(index / 3) * 80}" text-anchor="middle" class="label">${esc(line)}</text>`).join("");
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 300" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(question.question)}</desc><style>.title{font:700 24px Arial,sans-serif;fill:#1E3A8A}.label{font:600 15px Arial,sans-serif;fill:#334155}.small{font:500 14px Arial,sans-serif;fill:#475569}.value{font:700 17px Arial,sans-serif;fill:#1E293B}.coin{font:700 18px Arial,sans-serif;fill:#92400E}.equation{font:700 36px Arial,sans-serif;fill:#1E3A8A}</style><rect width="720" height="300" rx="24" fill="#F8FAFC"/><rect x="18" y="18" width="684" height="264" rx="20" fill="#fff" stroke="#DBEAFE" stroke-width="3"/><text x="360" y="65" text-anchor="middle" class="title">${esc(title)}</text>${art}</svg>`;
}

function pageHtml(test) {
  const query = `sinif=${test.classLevel}&ders=${test.subject}&konu=${test.topic}&zorluk=${test.difficulty}&test=${test.testNumber}`;
  const label = test.difficulty.charAt(0).toLocaleUpperCase("tr-TR") + test.difficulty.slice(1);
  return `<!doctype html>\n<html lang="tr">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta http-equiv="refresh" content="0; url=../test.html?${query.replaceAll("&", "&amp;")}">\n  <title>1. Sınıf Matematik ${test.topicName} ${label} Test 1 | TestÇöz</title>\n  <link rel="canonical" href="https://testcoz.pro/${test.pageUrl}">\n  <link rel="stylesheet" href="../css/style.css">\n</head>\n<body>\n  <main class="section"><div class="container empty-state">\n    <h1>${label} Test 1 açılıyor…</h1>\n    <p>Otomatik yönlendirme başlamazsa aşağıdaki bağlantıyı kullanın.</p>\n    <a class="btn btn-primary" href="../test.html?${query.replaceAll("&", "&amp;")}">Teste Başla</a>\n  </div></main>\n  <script>location.replace("../test.html?${query}");</script>\n</body>\n</html>\n`;
}

let imageCount = 0;
for (const test of tests) {
  const html = pageHtml(test).replace("1. Sınıf Matematik", test.classLevel + ". Sınıf " + test.subjectName);
  fs.writeFileSync(test.pageUrl, html, "utf8");
  for (const question of test.questions) {
    if (!question.image || !question.visual) continue;
    fs.writeFileSync(question.image, renderSvg(question), "utf8");
    imageCount += 1;
  }
}

console.log(`✓ ${tests.length} test sayfası ve ${imageCount} SVG oluşturuldu.`);
