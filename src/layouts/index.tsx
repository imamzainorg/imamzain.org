import Header from "./header"
import Footer from "./footer"

export default function Layouts({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<div className="pb-16 min-h-screen">{children}</div>
			<Footer />
		</>
	)
}
