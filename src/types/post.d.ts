import { Attachment } from "./attachments"

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
	date: string
	last_update: string
	category: PostCategory
	attachments?: Attachment[]
}
