import fs from "fs/promises";
import path from "path";
import { Book } from "@/types/book";

export async function getBooksFromFile(): Promise<Book[]> {
  const filePath = path.join(process.cwd(), "src/data/risalat-al-huqoq.json");
  const json = await fs.readFile(filePath, "utf-8");
  return JSON.parse(json);
}
