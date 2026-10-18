import path from "path"
import { promises as fs } from "fs"

// Reads one of the JSON files in src/data at build time.
export async function dataFetcher<T>(fileName: string): Promise<T> {
	const filePath = path.join(process.cwd(), "/src/data", fileName)
	return JSON.parse(await fs.readFile(filePath, "utf-8")) as T
}
