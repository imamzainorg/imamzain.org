import Layouts from "@/layouts"

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Layouts>{children}</Layouts>
		</>
	)
}
