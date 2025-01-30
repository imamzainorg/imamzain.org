import { galleryImages } from "@/lib/data"

import SwiperCarousel from "@/app/(pages)/gallery/_component/swiper-carousel"
import Section from "@/components/section"
import HeaderSections from "@/components/header-sections"
import Image from "next/image"

export default function GallerySection() {
	return (
		<div className="relative">
			<div className="absolute h-full w-full bg-dark-background -z-10" />
			<div className="container py-10 sm:py-20 space-y-8">
				<HeaderSections
					title={"معرض الصور"}
					moreButton={{
						label: "المزيد",
						href: "/gallery",
					}}
					dark
				/>
				<SwiperCarousel images={galleryImages} />
				<div className="pt-8 grid grid-cols-2 md:grid-cols-3 xmd:grid-cols-5 gap-4 grid-rows-1">
					{Array.from({ length: 5 }).map((_, index) => (
						<div
							key={index}
							className="relative rounded-2xl overflow-hidden"
						>
							<Image
								src={"/images/albaqi.jpg"}
								width={300}
								height={200}
								className="w-full object-cover aspect-[20/16]  "
								alt={`Image ${index}`}
							/>

							<div
								className="absolute top-0 right-0 w-full font-semibold text-sm flex flex-col justify-end h-full  "
								style={{
									background:
										"linear-gradient(0deg, rgba(0,0,0,0.8715861344537815) 0%, rgba(0,0,0,0.40940126050420167) 45%, rgba(229,229,229,0) 100%)",
								}}
							>
								<div className="font-semibold text-lg p-4 text-white">
									صور المؤسسه
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
