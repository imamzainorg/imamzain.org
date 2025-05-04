"use client"

import { useEffect, ReactNode, useState } from "react"

interface ModalProps {
	open: boolean
	onClose: () => void
	children: ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
	// State for handling animation
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Handle animation timing
		if (open) {
			// Make component visible immediately, then start animations
			setIsVisible(true)
		} else {
			// Delay unmounting to allow exit animations to complete
			const timer = setTimeout(() => {
				setIsVisible(false)
			}, 300) // Match this to your animation duration
			return () => clearTimeout(timer)
		}
	}, [open])

	// Close when escape key is pressed
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}

		if (open) {
			document.addEventListener("keydown", handleEsc)
			// Prevent body scrolling when modal is open
			document.body.style.overflow = "hidden"
		}

		return () => {
			document.removeEventListener("keydown", handleEsc)
			document.body.style.overflow = "unset"
		}
	}, [open, onClose])

	if (!open && !isVisible) return null

	return (
		<>
			{/* Backdrop */}
			<div
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out ${
					open ? "opacity-100" : "opacity-0"
				}`}
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal container */}
			<div className="fixed inset-0 flex items-center justify-center z-50 p-4">
				{/* Modal content */}
				<div
					className={`transform transition-all duration-300 ease-out ${
						open
							? "opacity-100 scale-100 translate-y-0"
							: "opacity-0 scale-95 translate-y-4"
					}`}
					onClick={(e) => e.stopPropagation()}
				>
					{children}
				</div>
			</div>
		</>
	)
}
