import Header from "./header"
import Footer from "./footer"

export default function Layouts({ children }: { children: React.ReactNode }) {
	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
			>
				Skip to content
			</a>
			<Header />
			<main id="main" className="pb-16 min-h-screen">
				{children}
			</main>
			<Footer />
		</>
	)
}
