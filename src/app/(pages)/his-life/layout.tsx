export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="bg-yellow-50 bg-[url('/shapes/bg.svg')] bg-[length:500px] lg:bg-[length:70%] bg-repeat !pb-16">
			<div className="container">{children}</div>
		</div>
	)
}
