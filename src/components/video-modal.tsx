"use client"

import { useState } from "react"

export default function VideoModal({ youtubeLink }: { youtubeLink: string }) {
	const [videoId, setVideoId] = useState<string | null>(null)

	const openModal = (id: string) => setVideoId(id)
	const closeModal = () => setVideoId(null)

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-6">
			<button
				onClick={() => openModal(youtubeLink)}
				className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
			>
				Play Video
			</button>

			{/* Modal */}
			{videoId && (
				<div
					className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4"
					onClick={closeModal}
				>
					<div
						className="relative bg-black rounded-lg overflow-hidden w-full max-w-4xl aspect-video"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute top-3 right-3 text-white text-2xl font-bold"
							onClick={closeModal}
						>
							✕
						</button>
						<iframe
							className="w-full h-full"
							src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
							title="YouTube Video"
							allow="autoplay; fullscreen"
						></iframe>
					</div>
				</div>
			)}
		</div>
	)
}
