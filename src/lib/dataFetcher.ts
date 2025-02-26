"use server"

import path from "path"
import { promises as fs } from "fs"

export async function dataFetcher<T>(
	fileName: string,
	isApi: boolean = false,
): Promise<T> {
	if (isApi) {
		const res = await fetch(`${process.env.DATA_JSON}${fileName}`)
		if (!res.ok) {
			throw new Error(`Failed to fetch ${fileName} from API`)
		}
		return res.json()
	} else {
		const filePath = path.join(process.cwd(), "/src/data", fileName)
		const fileContents = await fs.readFile(filePath, "utf-8")
		return JSON.parse(fileContents) as T
	}
}
