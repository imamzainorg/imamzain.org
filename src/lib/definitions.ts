export type Book = {
	id: number
	slug: string

	title: string
	author: string
	otherNames: string[]
	printHouse: string
	printDate: Date
	language: string
	pages: number
	parts: number

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
