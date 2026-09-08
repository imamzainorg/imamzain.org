// Defines shared <symbol> path data once per page so repeated icon
// instances (e.g. FileText rendered dozens of times in a .map()) can
// reference it via a tiny <use> instead of shipping a full inline <svg>
// with its own <path> data on every occurrence. Path data is copied
// verbatim from lucide-react (node_modules/lucide-react/dist/esm/icons)
// so rendering stays pixel-identical to the lucide-react component.
export function IconSprite() {
	return (
		<svg
			style={{ position: "absolute", width: 0, height: 0 }}
			aria-hidden="true"
		>
			<defs>
				{/* lucide-react "file-text" icon, v0.468.0 */}
				<symbol id="icon-file-text" viewBox="0 0 24 24">
					<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
					<path d="M14 2v4a2 2 0 0 0 2 2h4" />
					<path d="M10 9H8" />
					<path d="M16 13H8" />
					<path d="M16 17H8" />
				</symbol>
			</defs>
		</svg>
	)
}
