import { PlayButtonIcon, TimeIcon } from "@/assets/icons/reusable"
import ImageView from "@/components/image-view"
import { Eye } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "@heroui/react"

export default function VideoComponent() {
	// Set isPlaying to true so video auto-plays (muted)
	const [isPlaying] = useState(true)
	const containerRef = useRef<HTMLDivElement>(null)

	const handleFullScreen = () => {
		if (containerRef.current && containerRef.current.requestFullscreen) {
			containerRef.current.requestFullscreen()
		}
	}

	return (
		<div
			ref={containerRef}
			className="relative rounded-2xl h-screen overflow-hidden bg-black"
		>
			<iframe
				className={`w-full h-[114vh] transition-opacity duration-300 absolute   ${
					isPlaying ? "opacity-100" : "opacity-0"
				}`}
				src={`https://www.youtube.com/embed/c2In_ZUNTsI?autoplay=1&mute=1`}
				title="YouTube Video"
				allow="autoplay; fullscreen"
			></iframe>

			<div
				className={`w-full h-full transition-opacity duration-300 absolute z-0   ${
					isPlaying ? "opacity-0" : "opacity-100"
				}`}
			>
				<ImageView
					src="/news/img.png"
					alt="Video thumbnail"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="absolute group top-0 right-0 w-full  font-semibold text-sm h-full pointer-events-none z-20  ">
				<div className="container flex flex-col justify-end items-start w-full h-full p-8 gap-4   cursor-pointer ">
					<div className="font-semibold text-2xl text-white  ">
						كلمة السيد غسان الخرسان في الملتقى التشاوري الأول لخطباء
						المنبر الحسيني
					</div>

					<div className="flex gap-4 items-center">
						<div className="w-fit text-slate-400 flex items-center gap-1 py-4">
							<TimeIcon className="w-5 h-5" stroke="#aaa" />
							<span>09 /02 /2025</span>
						</div>

						<div className="w-fit text-slate-400 flex items-center gap-1 py-4">
							<Eye className="w-5 h-5" stroke="#aaa" />
							<span>10 الف</span>
						</div>
					</div>

					<Button
						isIconOnly
						radius="full"
						size={"lg"}
						onClick={handleFullScreen}
					>
						<PlayButtonIcon
							fill="#006654"
							className={
								"bg-white rounded-full p-2 shadow-lg  w-40 h-40 transition-colors"
							}
						/>
					</Button>
				</div>
			</div>
		</div>
	)
}
