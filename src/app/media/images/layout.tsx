import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "معرض الصور",
	description:
		"معرض صور مؤسسة الإمام زين العابدين عليه السلام يضم صور النشاطات والندوات والمناسبات والمسابقات والأخبار من النجف وكربلاء وسامراء مع بحث وتصفية بالتصنيف.",
	keywords: [
		"معرض صور مؤسسة الإمام زين العابدين",
		"صور نشاطات مؤسسة الإمام زين العابدين",
		"ندوات ومؤتمرات مؤسسة الإمام زين العابدين",
		"صور مناسبات أهل البيت في النجف",
		"صور مسابقات قرآنية النجف الأشرف",
		"أرشيف صور المؤسسة",
		"صور فعاليات النجف وكربلاء وسامراء",
		"معرض الوسائط المتعددة الإسلامي",
	],
	alternates: { canonical: "/media/images" },
	openGraph: {
		title: "معرض الصور | مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
		description:
			"معرض صور المؤسسة: نشاطات وندوات ومناسبات ومسابقات وأخبار موثقة بالصور من النجف وكربلاء وسامراء، مع إمكانية البحث والتصفية حسب التصنيف.",
		url: "/media/images",
		type: "website",
		images: [
			"https://cdn.imamzain.org/news/imam-zain-alabideen-mu2tamar-elmi-rabe3-samarra.jpg",
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "معرض الصور | مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"معرض صور المؤسسة: نشاطات وندوات ومناسبات ومسابقات وأخبار موثقة بالصور من النجف وكربلاء وسامراء.",
		images: [
			"https://cdn.imamzain.org/news/imam-zain-alabideen-mu2tamar-elmi-rabe3-samarra.jpg",
		],
	},
}

export default function MediaImagesLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
