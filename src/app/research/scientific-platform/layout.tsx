import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "المنصة العلمية للبحوث",
	description:
		"أرشيف بحثي يضم بحوث المؤتمرات وبحوث تخرّج البكالوريوس والماجستير والدكتوراه والدوريات العربية حول الإمام زين العابدين عليه السلام، مع بحث وتصفية وتحميل البحوث.",
	keywords: [
		"المنصة العلمية للبحوث",
		"بحوث المؤتمرات عن الإمام زين العابدين",
		"بحوث تخرج عن الصحيفة السجادية",
		"رسائل ماجستير ودكتوراه عن الإمام السجاد",
		"الدوريات العربية عن الإمام زين العابدين",
		"أرشيف البحوث العلمية",
		"بحوث الإمام علي بن الحسين عليه السلام",
		"تحميل بحوث الصحيفة السجادية",
	],
	alternates: { canonical: "/research/scientific-platform" },
	openGraph: {
		title: "المنصة العلمية للبحوث - مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"تصفّح أرشيف البحوث العلمية حول الإمام زين العابدين عليه السلام: بحوث المؤتمرات، وبحوث تخرّج البكالوريوس والماجستير والدكتوراه، والدوريات العربية، مع البحث والتحميل.",
		url: "/research/scientific-platform",
		type: "website",
		images: ["/images/imam-legacy-bg-bricks.jpg"],
	},
	twitter: {
		card: "summary_large_image",
		title: "المنصة العلمية للبحوث - مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"أرشيف البحوث حول الإمام زين العابدين عليه السلام: بحوث المؤتمرات وبحوث التخرج والدوريات العربية، مع البحث والتحميل.",
		images: ["/images/imam-legacy-bg-bricks.jpg"],
	},
}

export default function ScientificPlatformLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
