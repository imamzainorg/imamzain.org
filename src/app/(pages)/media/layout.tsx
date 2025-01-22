export default function MediaLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="bg-dark-background bg-[url('/shapes/bg.svg')] h-fit pb-2">
			<div className="container">{children}</div>
		</div>
	)
}
