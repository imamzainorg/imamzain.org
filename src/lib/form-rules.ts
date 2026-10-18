// The rules the backend API enforces on the public forms, shared by the forms in the browser and by
// worker/ so a value that passes here is not rejected downstream. The API stays the authority: when
// its rules change, change them here.

export const NAME_MIN = 2
export const NAME_MAX = 100
export const MESSAGE_MIN = 10
export const MESSAGE_MAX = 2000

const LOCAL_PART = /^[^\s@"(),:;<>[\\\]]+$/
const LABEL = /^[a-z0-9¡-￿](?:[a-z0-9¡-￿-]{0,61}[a-z0-9¡-￿])?$/i
const TLD = /^(?:xn--[a-z0-9-]{1,59}|[a-z¡-￿]{2,63})$/i

// Close to validator.js isEmail, which the API uses: a dotted domain whose last label is a real
// TLD (so "a@b.c" fails), a local part of at most 64 characters, 254 in all.
export function isValidEmail(value: unknown): value is string {
	if (typeof value !== "string" || value.length > 254) return false
	const at = value.lastIndexOf("@")
	if (at < 1) return false

	const local = value.slice(0, at)
	if (local.length > 64 || !LOCAL_PART.test(local)) return false
	if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false

	const labels = value.slice(at + 1).split(".")
	return labels.length >= 2 && labels.every((label) => LABEL.test(label)) && TLD.test(labels[labels.length - 1])
}

export const isValidName = (value: unknown): value is string =>
	typeof value === "string" && value.trim().length >= NAME_MIN && value.trim().length <= NAME_MAX

export const isValidMessage = (value: unknown): value is string =>
	typeof value === "string" && value.trim().length >= MESSAGE_MIN && value.length <= MESSAGE_MAX

// What a visitor is told when the Worker answers a form with a failure. Rate limiting and a
// rejected value are not the visitor's fault to retry blindly, and a server fault is not theirs
// at all, so the three read differently.
export function submitErrorMessage(status: number, fallback: string): string {
	if (status === 429) return "محاولات كثيرة في وقت قصير، حاول مرة أخرى بعد بضع دقائق"
	if (status === 400 || status === 422) return "تعذر قبول البيانات، تحقق من الحقول وأعد المحاولة"
	return fallback
}
