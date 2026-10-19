// 4:05, 43:18, 1:26:28.
export function formatTime(totalSeconds: number): string {
	const s = Math.max(0, Math.floor(totalSeconds || 0))
	const hours = Math.floor(s / 3600)
	const minutes = Math.floor((s % 3600) / 60)
	const seconds = String(s % 60).padStart(2, "0")
	return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}` : `${minutes}:${seconds}`
}

// Arabic counts change form with the number: دقيقة، دقيقتان، ٣ دقائق، ١١ دقيقة.
function minutesText(minutes: number): string {
	if (minutes === 1) return "دقيقة"
	if (minutes === 2) return "دقيقتان"
	if (minutes <= 10) return `${minutes} دقائق`
	return `${minutes} دقيقة`
}

// The length shown in the list, rounded to what a listener plans around.
export function formatLength(totalSeconds: number): string {
	const minutes = Math.max(1, Math.round((totalSeconds || 0) / 60))
	if (minutes < 60) return minutesText(minutes)
	const hours = Math.floor(minutes / 60)
	const rest = minutes % 60
	const hourText = hours === 1 ? "ساعة" : hours === 2 ? "ساعتان" : `${hours} ساعات`
	return rest ? `${hourText} و${minutesText(rest)}` : hourText
}
