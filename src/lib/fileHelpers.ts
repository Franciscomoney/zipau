import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function ensureDirectory(filePath: string) {
  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
}

export async function saveBase64Image(base64Data: string, filePath: string) {
  const cleaned = base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");
  const buffer = Buffer.from(cleaned, "base64");
  await ensureDirectory(filePath);
  await writeFile(filePath, buffer);
}
