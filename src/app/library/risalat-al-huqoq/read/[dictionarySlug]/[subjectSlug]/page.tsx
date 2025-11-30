import { getSubject } from "@/lib/imamzain-legacy-loader"
import SubjectView from "./subject-view"

export default async function Page({
	params,
}: {
	params: Promise<{
		dictionarySlug: string
		subjectSlug: string
	}>
}) {
	const { dictionarySlug, subjectSlug } = await params
	const subject = getSubject("risalat-al-huqoq", dictionarySlug, subjectSlug)

	return (
		<>
			<div className="w-full text-center text-3xl">{subject?.title}</div>
			<div className="w-1/2 h-0.5 mx-auto bg-gradient-to-l from-transparent via-primary/40 to-transparent" />
			{subject && <SubjectView subject={subject} />}
		</>
	)
}
