"use client"

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
	const path = usePathname();

	useEffect(() => {
		// Set the background color based on the path
		if (path.startsWith("/media")) {
			document.body.style.backgroundColor = "rgb(37,52,63)";
		} else {
			// Reset the background color if the path doesn't match
			document.body.style.backgroundColor = ""; // or set to your default color
		}

		// Cleanup function to reset the background color when the component unmounts
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, [path]); // Add `path` as a dependency

	return (
		<div className="pb-12 -mb-24">
			{children}
		</div>
	);
}