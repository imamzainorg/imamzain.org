import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "مسابقات في تراث الإمام زين العابدين عليه السلام",
	description:
		"مسابقات مؤسسة الإمام زين العابدين عليه السلام في تراث الإمام السجاد: مسابقة قبسات الثقافية، ومسابقة الكتاب البحثية، ومسابقة الخط العربي الدولية.",
	keywords: [
		"مسابقات الإمام زين العابدين عليه السلام",
		"مسابقة الخط العربي الدولية",
		"مسابقة كتاب 1447هـ",
		"مسابقة قبسات من حياة الإمام السجاد",
		"مسابقات ثقافية عن الإمام السجاد",
		"مسابقات بحثية في التراث الإسلامي",
		"مسابقات في تراث أهل البيت",
		"مسابقة الخط العربي للإمام زين العابدين",
	],
	alternates: { canonical: "/contests" },
	openGraph: {
		title: "مسابقات في تراث الإمام زين العابدين عليه السلام: قبسات والكتاب والخط العربي",
		description:
			"تعرّف على مسابقات مؤسسة الإمام زين العابدين عليه السلام: مسابقة قبسات الثقافية، ومسابقة الكتاب البحثية، ومسابقة الخط العربي الدولية الأولى.",
		url: "/contests",
		type: "website",
		images: [
			"/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg",
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "مسابقات في تراث الإمام زين العابدين عليه السلام",
		description:
			"تعرّف على مسابقات مؤسسة الإمام زين العابدين عليه السلام: مسابقة قبسات الثقافية، ومسابقة الكتاب البحثية، ومسابقة الخط العربي الدولية الأولى.",
		images: [
			"/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg",
		],
	},
}

export default function ContestsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
