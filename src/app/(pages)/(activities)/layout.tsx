export default function ActivitiesLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="container !mb-16">{children}</div>
}
