export default function MediaLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="bg-dark-background bg-[url('/shapes/bg.svg')] bg-[length:500px] lg:bg-[length:70%] bg-repeat h-fit pb-2">
			<div className="">{children}</div>
		</div>
	)
}
