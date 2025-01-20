export default function MediaLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="container">{children}</div>
}
