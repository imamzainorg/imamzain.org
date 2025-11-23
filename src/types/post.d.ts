import { Attachment } from "./attachments"

export type PostCategory =
	| "فعاليات"
	|"مجالس"
	| "نشاطات"
| "العتبة الحسينية"
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
