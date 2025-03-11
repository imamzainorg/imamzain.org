export default function HisLifeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className=" bg-pattern  pb-24 -mb-24">
			<div className="container">{children}</div>
		</div>
	)
}
