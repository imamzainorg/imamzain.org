export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="container">{children}</div>
}
