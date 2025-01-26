export default function PublicationsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="container !mb-16">{children}</div>
}
