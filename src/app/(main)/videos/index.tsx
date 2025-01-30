import Image from "next/image"
import Link from "next/link"

import {
	PlayButtonIcon,
	TimeIcon,
	VideoRecordingIcon,
} from "@/assets/icons/reusable"
import SectionCta from "@/components/section-cta"
import HeaderSections from "@/components/header-sections"
export default function Videos() {
	return (
		<>
			<div className="container flex flex-col gap-12 py-32">
				<HeaderSections
					title={"المرئيات"}
					moreButton={{
						label: "المزيد",
						href: "/videos",
					}}
				/>

				<div
					className="grid
             grid-cols-1
             md:grid-cols-2
             lg:grid-cols-4
             xl:grid-cols-5
             gap-4 xl:gap-8"
				>
					{Array.from({length: 7}).map((_, index) => (
						<Link
							key={index}
							href="gallery"
							className={`relative w-full h-full rounded-xl overflow-hidden flex flex-col shadow-xl
       						 ${index === 0 && 'row-span-2 lg:row-span-2 col-span-1 lg:col-span-2'}`}
						>
							<Image
								src="/images/placeholder.jpg"
								width={300}
								height={300}
								alt="media pic"
								className="absolute inset-0 w-full h-full object-cover -z-10"
							/>
							<div
								className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/20 to-transparent -z-10"></div>
							<div className="h-4/6">
								<div className="h-1/2 w-full flex justify-end items-start p-3">
									<VideoRecordingIcon fill="none" stroke="#fff"/>
								</div>
								<div className="h-1/2 w-full flex justify-start items-end p-3">
									<div className="bg-white rounded-full rotate-180 p-2">
										<PlayButtonIcon fill="#006654" className="w-auto h-auto"/>
									</div>
								</div>
							</div>
							<div className="h-2/6 bg-white rounded-tl-xl flex flex-wrap justify-between p-3">
								<div className="w-full font-semibold text-sm">
									سيرة الإمام زين العابدين
								</div>
								<div className="text-[10px] text-slate-400">
									سيرة الامام زين العابدين
								</div>
								<div className="text-xs text-slate-400 flex items-center gap-1">
									<TimeIcon className="w-3 h-3" stroke="#aaa"/>
									<span>١٢ ديسمبر ٢٠٢٤</span>
								</div>
							</div>
						</Link>
					))}
				</div>

				<div className="hidden md:block">
					<SectionCta
						links={[
							{label: "محاضرات", href: "/gallery"},
							{label: "ندوات", href: "/gallery"},
							{label: "مناسبات", href: "/gall ery"},
							{label: "مؤتمرات", href: "/gallery"},
							{label: "برامج", href: "/gallery"},
							{label: "زيارات", href: "/gallery"},
						]}
					/>
				</div>
			</div>
		</>
	)
}
