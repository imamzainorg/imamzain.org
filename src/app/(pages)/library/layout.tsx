export default function libraryLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="container pb-10">{children}</div>

}