import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "زيارة الإمام زين العابدين وأئمة البقيع نيابةً عنك",
	description:
		"سجّل اسمك لتُؤدّى زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام نيابةً عنك عند قبورهم الطاهرة في البقيع، مع نص الزيارة الشريفة المأثورة.",
	keywords: [
		"زيارة الإمام زين العابدين",
		"زيارة أئمة البقيع",
		"زيارة نيابية عن الميت",
		"الزيارة نيابةً عن",
		"نص زيارة الإمام السجاد",
		"السلام عليك يا زين العابدين",
		"تسجيل زيارة نيابية",
		"زيارة قبور أئمة البقيع",
	],
	alternates: { canonical: "/visitation" },
	openGraph: {
		title: "زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام نيابةً عنك",
		description:
			"سجّل اسمك لتُؤدّى زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام نيابةً عنك عند قبورهم الطاهرة في البقيع، مع نص الزيارة الشريفة المأثورة.",
		url: "/visitation",
		type: "website",
		images: ["/images/ziara-imamzain-web.jpg"],
	},
	twitter: {
		card: "summary_large_image",
		title: "زيارة الإمام زين العابدين وأئمة البقيع نيابةً عنك",
		description:
			"سجّل اسمك لتُؤدّى زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام نيابةً عنك عند قبورهم الطاهرة، مع نص الزيارة المأثورة.",
		images: ["/images/ziara-imamzain-web.jpg"],
	},
}

export default function VisitationLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
