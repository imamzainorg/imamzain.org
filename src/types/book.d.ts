export type Book = {
	id: number
	slug: string
	title: string
	author: string
	otherNames: string[]
	printHouse: string
	printDate: string
	language: string
	pages: number
	parts: number
	views: number
	image: string
	pdf: string
	partNumber: number
	totalParts: number
	series: string
	category?: string[]
	description?: string
}
