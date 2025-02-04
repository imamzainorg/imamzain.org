export default function galleryLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="bg-dark-background bg-pattern pb-10">{children}</div>
}
