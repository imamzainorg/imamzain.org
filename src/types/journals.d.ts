export type Journals = {
	id: string

	translations: {
		languageid: number
		language: string
		title: string
		authors: string[]
		publicationVenue: string
		category?: string
		pagenam?: number
	}[]
	publishedYear: string
	pdfUrl: string
}
