import { getSubject, getDictionary } from "@/lib/imamzain-legacy-loader"
import { notFound } from "next/navigation"
import SubjectView from "@/app/library/_components/subject-view"
import SubjectNavigation from "@/app/library/_components/subject-navigation"
import { collections } from "@/app/library/_config/collections"

export const revalidate = 300

export default async function SubjectPage({
	params,
	searchParams,
}: {
	params: Promise<{
		collectionSlug: string
		dictionarySlug: string
		subjectSlug: string
	}>
	searchParams: Promise<{ highlight?: string }>
}) {
	const { collectionSlug, dictionarySlug, subjectSlug } = await params
	const { highlight } = await searchParams

	if (!collections[collectionSlug]) notFound()

	const subject = getSubject(collectionSlug, dictionarySlug, subjectSlug)
	if (!subject) notFound()

	// Get all subjects for navigation
	const dictionary = getDictionary(collectionSlug, dictionarySlug)
	const allSubjects = dictionary?.subjects || []

	return (
		<>
			<div className="w-full text-center">
				<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
					{subject.title}
				</h1>
			</div>

			<div className="w-1/2 h-0.5 mx-auto bg-gradient-to-l from-transparent via-primary/40 dark:via-Muharram_primary/40 to-transparent" />

			<SubjectView subject={subject} highlightTerm={highlight} />

			<SubjectNavigation
				collectionSlug={collectionSlug}
				dictionarySlug={dictionarySlug}
				currentSubjectSlug={subjectSlug}
				allSubjects={allSubjects}
			/>
		</>
	)
}
