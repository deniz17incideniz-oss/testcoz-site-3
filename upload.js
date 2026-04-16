import { parseDocx } from "./lib/parseDocx.js";
import { generateTestPage } from "./lib/generateTestPage.js";

const filePath = "./uploads/test.docx";

async function run() {
  const questions = await parseDocx(filePath);

  await generateTestPage({
    grade: 4,
    subject: "math",
    topic: "zaman-olcme",
    questions
  });

  console.log("Bitti 🚀");
}

run();