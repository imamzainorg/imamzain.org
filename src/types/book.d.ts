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
	// "app": the PDF is for the mobile app only, and the API gives the website no link to it.
	pdfAccess: "public" | "app" | null
	partNumber: number
	totalParts: number
	series: string
	category?: string[]
	description?: string,
	Conferences?: string[]
}
