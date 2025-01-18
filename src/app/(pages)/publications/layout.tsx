export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="container mt-52 sm:mt-32 lg:mt-40 xl:mt-40">
			{children}
		</div>
	)
}
