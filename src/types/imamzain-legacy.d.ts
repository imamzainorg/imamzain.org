export type Legacy = {
	id: number
	title: string
	slug: string
	dictionaries: Dictionary[]
}

type Dictionary = {
	id: number
	title: string
	slug: string
	subjects: DictionarySubjects[]
}

type Subject = {
	id: string
	title: string
	slug: string
	phrases: Phrase[]
}

type Phrase = {
	id: string
	content: string
	explanations: Explanation[]
}

type Explanation = {
	id: number
	author: string
	content: string
}
