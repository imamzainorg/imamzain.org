export default function MediaLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="bg-dark-background bg-pattern pb-12 -mb-24">
			{children}
		</div>
	)
}
