export type SahifaSection = {
	id: string
	title: string
	slug: string
	supplications: Supplication[]
}

type Supplication = {
	id: string
	title: string
	slug: string
	phrases: Phrase[]
}

type Phrase = {
	content: string
	explanations: Explaination[]
}

type Explaination = {
	author: string
	content: string
}
