"use client"

import { useEffect, ReactNode, useState } from "react"

interface ModalProps {
	open: boolean
	onClose: () => void
	children: ReactNode
}

export default function Modal(props: ModalProps) {
	const { open, onClose, children } = props
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (open) {
			const timer = setTimeout(() => setIsVisible(true), 0)
			return () => clearTimeout(timer)
		} else {
			const timer = setTimeout(() => setIsVisible(false), 300)
			return () => clearTimeout(timer)
		}
	}, [open])

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}

		if (open) {
			document.addEventListener("keydown", handleEsc)
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
			<div
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out ${
					open ? "opacity-100" : "opacity-0"
				}`}
				onClick={onClose}
				aria-hidden="true"
			/>

			<div
				className="fixed inset-0 flex items-center justify-center z-50 p-4"
				role="dialog"
				aria-modal="true"
			>
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
