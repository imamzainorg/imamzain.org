export default function HisLifeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="bg-yellow-50 bg-pattern pb-14 -mb-24">
			<div className="container">{children}</div>
		</div>
	)
}
