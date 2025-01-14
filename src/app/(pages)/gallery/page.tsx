import Image from "next/image"
import Link from "next/link"
import { galleryImages } from "@/lib/data"
import Breadcrumbs from "@/components/breadcrumb"
import SwiperCarousel from "./_component/swiper-carousel"

export default async function Gallery() {
	return (
		<div className="bg-dark-background bg-[url('/shapes/bg.svg')]">
			<div className="w-11/12 space-y-20 mx-auto py-28 sm:yt-32 lg:py-40 xl:py-48">
				<Breadcrumbs
					className="text-white"
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "الوسائط المتعددة", url: "/" },
						{ name: "معرض الصور", url: "/gallery" },
					]}
				/>

				<div className="h-15 w-3/4 mx-auto grid-cols-2 md:grid-cols-4 grid flex-row xl:gap-8 gap-0 justify-center items-center my-20">
					{[
						{ label: "...", href: "#" },
						{ label: "...", href: "#" },
						{ label: "...", href: "#" },
						{ label: "...", href: "#" },
					].map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className="h-full bg-[url('/shapes/button-bg.svg')] bg-center bg-no-repeat flex justify-center items-center p-2 xs:p-3 sm:p-4 text-white font-bold w-4/3"
						>
							{item.label}
						</Link>
					))}
				</div>

				<SwiperCarousel images={galleryImages} />

				<div className="mr-3 xmd:pr-32 xmd:pl-32 2xl:pr-64 2xl:pl-64 grid grid-cols-2 md:grid-cols-3 xmd:grid-cols-4 gap-5">
					{galleryImages.map((img, index) => (
						<Image
							key={index}
							src={img}
							width={300}
							height={200}
							className="w-full object-cover aspect-[20/16] rounded-2xl"
							alt={`Image ${index}`}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
