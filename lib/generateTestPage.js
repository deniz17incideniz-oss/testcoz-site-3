import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function generateTestPage({ grade, subject, topic, questions }) {
  const folder = path.join(process.cwd(), "generated");
  await mkdir(folder, { recursive: true });

  const filePath = path.join(folder, "test.html");

  const content = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body { font-family: Arial; background:#f3f4f6; padding:20px;}
.grid { display:grid; grid-template-columns:1fr 1fr; gap:20px;}
.question { background:white; padding:15px; border-radius:10px;}
</style>
</head>
<body>
<h1>TESTCOZ</h1>
<div class="grid">
${questions.map(q => `
<div class="question">
<b>${q.id}. Soru</b>
<p>${q.text}</p>
${q.options.map(o => `<div>${o}</div>`).join("")}
</div>
`).join("")}
</div>
</body>
</html>
`;

  await writeFile(filePath, content);
}