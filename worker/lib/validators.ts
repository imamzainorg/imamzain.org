const EMAIL_RE = /\S+@\S+\.\S+/

export function isValidEmail(value: unknown): value is string {
	return typeof value === "string" && EMAIL_RE.test(value)
}
