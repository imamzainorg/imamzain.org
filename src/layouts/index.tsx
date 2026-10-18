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
			{/* Sections slide in from the side (Reveal), so until they appear they sit past the screen
			    edge and would widen the page on phones. `clip` rather than `hidden`: it makes no scroll
			    container, so the sticky sidebars keep working. It sits on <main>, not <body>: a body
			    value is handed up to the viewport, which does not stop a phone from zooming out. */}
			<main id="main" className="pb-16 min-h-screen overflow-x-clip">
				{children}
			</main>
			<Footer />
		</>
	)
}
