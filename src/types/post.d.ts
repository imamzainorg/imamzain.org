export type PostCategory = "مؤتمرات" | "اخبار" | "لقاءات" | "ندوات"

interface Attachment {
	id: number
	path: string
}

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
	date: string
	last_update: string
	category: PostCategory
	attachments?: Attachment[]
}
