// The titles and speaker names were typed by many hands ("احمد" and "أحمد", "الامام" and
// "الإمام", "النجدي" and "النجدى"), so matching folds those spellings together and drops the
// short vowels. Only for matching; the text shown is never changed.
export function fold(text: string): string {
	return text
		.replace(/[ً-ٰٟـ]/g, "")
		.replace(/[أإآٱ]/g, "ا")
		.replace(/ى/g, "ي")
		.replace(/ة/g, "ه")
		.replace(/ؤ/g, "و")
		.replace(/ئ/g, "ي")
		.toLowerCase()
		.trim()
}

// 1 تسجيل، تسجيلان، ٣ تسجيلات، ١١ تسجيلاً.
export function recordingsText(count: number): string {
	if (count === 1) return "تسجيل واحد"
	if (count === 2) return "تسجيلان"
	if (count >= 3 && count <= 10) return `${count} تسجيلات`
	return `${count} تسجيلاً`
}
