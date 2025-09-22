import { Attachment } from "./attachments"

export type PostCategory =
	| "العتبة الحسينية"
	| " مؤتمرات"
	| "اخبار"
	| "اجتماعات"
	| "ندوات"
	| "مجالس"

export type Post = {
	id: number
	slug: string
	image: string
	title: string
	summary: string
	content: string
	views: number
	date: string
	last_update: string
	category: PostCategory
	attachments?: Attachment[]
}
