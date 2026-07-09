import type { Metadata } from "next"

export const metadata: Metadata = {
	title: {
		absolute: "روابط | مؤسسة الإمام زين العابدين عليه السلام",
	},
	description:
		"جميع روابط مؤسسة الإمام زين العابدين عليه السلام للدراسات والبحوث في مكان واحد: الموقع، تطبيقاتنا، وحساباتنا على منصات التواصل الاجتماعي.",
	alternates: {
		canonical: "/links",
	},
	openGraph: {
		type: "website",
		locale: "ar_IQ",
		url: "https://imamzain.org/links",
		title: "روابط | مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"جميع روابط مؤسسة الإمام زين العابدين عليه السلام في مكان واحد.",
	},
	robots: { index: true, follow: true },
}

export default function LinksLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}
