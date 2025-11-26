import { getSubject } from "@/lib/imamzain-legacy-loader"
import SubjectView from "./subject-view"

export default async function Page({
	params,
}: {
	params: { subjectSlug: string; dictionarySlug: string }
}) {
	const { subjectSlug, dictionarySlug } = await params

	const subject = getSubject("al-sahifa", dictionarySlug, subjectSlug)

	return (
		<>
			<div className="w-full text-center text-3xl ">{subject?.title}</div>
			<div className="w-1/2 h-0.5 mx-auto bg-gradient-to-l from-transparent via-primary/40 to-transparent " />
			{subject && <SubjectView subject={subject} />}
		</>
	)
}
