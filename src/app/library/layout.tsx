export default function libraryLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="md:container mx-auto pb-10">{children}</div>
}
