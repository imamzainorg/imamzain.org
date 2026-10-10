// A research item listed on the scientific platform: journal articles come in several
// languages, graduation research in one.
export type TranslatedResearch = {
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
