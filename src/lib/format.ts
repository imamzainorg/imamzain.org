// Month names are spelled out instead of using toLocaleDateString("ar-IQ"), so the server
// render and the browser can never disagree on ICU data (a hydration mismatch).
const MONTHS = [
	"كانون الثاني",
	"شباط",
	"آذار",
	"نيسان",
	"أيار",
	"حزيران",
	"تموز",
	"آب",
	"أيلول",
	"تشرين الأول",
	"تشرين الثاني",
	"كانون الأول",
]

// "2026-9-27" becomes "27 أيلول 2026". Anything that is not a Y-M-D date comes back untouched.
export function formatDate(date: string) {
	const [year, month, day] = date.split("-").map(Number)
	if (!year || !month || !day || month > 12) return date
	return `${day} ${MONTHS[month - 1]} ${year}`
}

// 12 becomes "١٢".
export const arabicNumber = (n: number) => n.toLocaleString("ar-EG")
