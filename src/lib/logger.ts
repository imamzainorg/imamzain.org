export function log(level: "INFO" | "WARN" | "ERROR", ...args: unknown[]) {
	const timestamp = new Date().toISOString()
	console.log(`[${level}] [${timestamp}]`, ...args)
}
