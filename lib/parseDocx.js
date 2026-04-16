import mammoth from "mammoth";

export async function parseDocx(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  const text = result.value;

  const questions = text.split(/\n\d+\.\s/).slice(1);

  return questions.map((q, i) => {
    const lines = q.trim().split("\n");

    const options = lines.filter(line =>
      line.startsWith("A)") ||
      line.startsWith("B)") ||
      line.startsWith("C)") ||
      line.startsWith("D)")
    );

    return {
      id: i + 1,
      text: lines.join("\n"),
      options
    };
  });
}