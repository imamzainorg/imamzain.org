// نوع موحّد لداتا الفيديوهات — يستبدل التعريفين المتعارضين اللي كانوا
// موجودين بـ videos-client.tsx وبـ types/youtube-data.ts القديم

export type YouTubeVideo = {
	title: string
	url: string // معرف فيديو يوتيوب (يستخدم مباشرة بـ embed/{url})
	date: string // مثال: "15‏/07‏/2026" — قد تحتوي محارف اتجاه خفية
	desc: string
	thumbnail: string // مسار نسبي، مثال: "general/xxx.png"
	slug: string
	categories: string[]
}

export type DisplayLocation = "home" | "internal" | "both"

export type YouTubeGroup = {
	id: number
	title: string
	url: string
	displayLocation: DisplayLocation
	videos: YouTubeVideo[]
	categories: string[]
}

/** @deprecated استخدم YouTubeGroup — هذا الاسم القديم موجود بس حتى ما ينكسر
 * كود ثاني بالموقع (متل الصفحة الرئيسية) يستورد "YouTubePlaylist" */
export type YouTubePlaylist = YouTubeGroup
