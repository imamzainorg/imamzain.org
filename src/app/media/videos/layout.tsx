import DarkPage from "@/components/dark-page"

export default function MediaVideosLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <DarkPage>{children}</DarkPage>
}
