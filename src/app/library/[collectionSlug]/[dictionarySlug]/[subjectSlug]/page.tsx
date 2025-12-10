import { getSubject } from "@/lib/imamzain-legacy-loader"
import { notFound } from "next/navigation"
import SubjectView from "@/app/library/_components/subject-view"
import { collections } from "@/app/library/_config/collections"

export default async function SubjectPage({
	params,
}: {
	params: Promise<{
		collectionSlug: string
		dictionarySlug: string
		subjectSlug: string
	}>
}) {
	const { collectionSlug, dictionarySlug, subjectSlug } = await params

	if (!collections[collectionSlug]) notFound()

	const subject = getSubject(collectionSlug, dictionarySlug, subjectSlug)

	if (!subject) notFound()

	return (
		<>
			<div className="w-full text-center text-3xl">{subject.title}</div>
			<div className="w-1/2 h-0.5 mx-auto bg-gradient-to-l from-transparent via-primary/40 to-transparent" />
			<SubjectView subject={subject} />
		</>
	)
}
