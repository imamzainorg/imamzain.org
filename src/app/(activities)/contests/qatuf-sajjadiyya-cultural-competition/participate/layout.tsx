import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "المشاركة في مسابقة قبسات من حياة الإمام السجاد",
	description:
		"صفحة المشاركة في مسابقة قبسات من حياة الإمام السجاد عليه السلام: أجب عن خمسين سؤالاً حول سيرة الإمام زين العابدين مستخرجة من كتاب المسابقة ثم أرسل إجاباتك.",
	keywords: [
		"مسابقة قبسات من حياة الإمام السجاد",
		"المشاركة في مسابقة الإمام زين العابدين",
		"أسئلة مسابقة الإمام السجاد",
		"مسابقة ثقافية الإمام زين العابدين",
		"اختبار سيرة الإمام السجاد",
		"نموذج المشاركة في مسابقة قبسات",
		"كتاب قبسات من حياة الإمام السجاد",
	],
	alternates: {
		canonical:
			"/contests/qatuf-sajjadiyya-cultural-competition/participate",
	},
	// Transactional quiz step — empty/unreachable without a valid attempt_id; keep out of the index.
	robots: { index: false, follow: false },
	openGraph: {
		title: "المشاركة في مسابقة قبسات من حياة الإمام السجاد عليه السلام",
		description:
			"أجب عن خمسين سؤالاً حول سيرة الإمام زين العابدين عليه السلام مستخرجة من كتاب مسابقة قبسات من حياة الإمام السجاد، ثم أرسل إجاباتك للمشاركة.",
		url: "/contests/qatuf-sajjadiyya-cultural-competition/participate",
		type: "website",
		images: [
			"/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg",
		],
	},
}

export default function ParticipateLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
