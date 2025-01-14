export type BookCategory = "دراسات دينية" | "سيرة ذاتية"
export type Book = {
	id: number
	title: string
	slug: string
	author: string
	category: BookCategory
	publisher: string
	pages: number
	summary: string
	views: number
	image: string
	pdf: string
}

export type PostCategory = "مؤتمرات" | "اخبار" | "لقاءات" | "ندوات"
export type Post = {
	id: number
	slug: string
	image: string
	title: string
	summary: string
	body: {
		lede: string
		content: string
		tail: string
	}
	views: number
	date: Date
	last_update: Date
	category: PostCategory
}
