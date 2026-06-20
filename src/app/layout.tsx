import type { Metadata } from "next"
import { Noto_Naskh_Arabic } from "next/font/google"
import Script from "next/script"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/style/globals.css"
import { Toaster } from "sonner"

import { Providers } from "@/app/providers"

const notoNaskhArabic = Noto_Naskh_Arabic({
	subsets: ["arabic"],
	weight: ["400", "500", "700"],
	display: "swap",
})

export const viewport = {
	width: "device-width",
	initialScale: 1,
}

export const metadata: Metadata = {
	metadataBase: new URL("https://imamzain.org"),
	title: {
		default: "مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
		template: "%s | مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
	},
	description:
		"مؤسسة قائمة لاحياء تراث ونشر تعاليم الامام علي بن الحسين السجاد عليه السلام",
	keywords: [
		"الامام زين العابدين",
		"زين العابدين",
		"السجاد",
		"علي بن الحسين",
		"مؤسسة الامام زين العابدين",
		"بحوث",
		"دراسات",
		"اسلام",
		"اهل البيت",
	],
	openGraph: {
		type: "website",
		locale: "ar_IQ",
		url: "https://imamzain.org",
	},
	robots: { index: true, follow: true },
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ar" dir="rtl" suppressHydrationWarning={true}>
			<head>
				{/* Apply the saved theme class before first paint so dark-mode
				    users never see a light flash (FOUC). External src (not inline)
				    so React doesn't flag a script tag in the component tree. */}
				<Script src="/theme-init.js" strategy="beforeInteractive" />
				<link rel="preconnect" href="https://cdn.imamzain.org" />
				<link rel="dns-prefetch" href="https://cdn.imamzain.org" />
			</head>
			<body className={`${notoNaskhArabic.className} bg-pattern`}>
				<Providers>{children}</Providers>
				<Toaster />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
