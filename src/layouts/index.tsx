import Header from "./header"
import Footer from "./footer"

export default function Layouts({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
