"use client"
import ImageView from "@/components/image-view"
import Link from "next/link"
import Breadcrumbs from "@/components/breadcrumb"
import SwiperCarousel from "@/components/swiper-carousel"
import galleryImages from "@/data/gallery.json"
// روابط القائمة
const menuLinks = [
	{ label: "...", href: "#" },
	{ label: "...", href: "#" },
	{ label: "...", href: "#" },
	{ label: "...", href: "#" },
]

export default function Gallery() {
	return (
		<div className="container space-y-14">
			{/* Breadcrumbs */}
			<Breadcrumbs
				className="text-white"
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الوسائط المتعددة", url: "/" },
					{ name: "معرض الصور", url: "/gallery" },
				]}
			/>

			{/* القائمة */}
			<div className="h-15 w-3/4 mx-auto grid-cols-2 md:grid-cols-4 grid flex-row xl:gap-8 gap-0 justify-center items-center">
				{menuLinks.map((item, index) => (
					<Link
						key={index}
						href={item.href}
						className="h-full bg-[url('/shapes/button-bg.svg')] bg-center bg-no-repeat flex justify-center items-center p-2 xs:p-3 sm:p-4 text-white font-bold w-4/3"
					>
						{item.label}
					</Link>
				))}
			</div>

			{/* Swiper Carousel */}
			<SwiperCarousel images={galleryImages} />

			{/*galleryImages*/}
			<div className="mr-3 xmd:pr-32 xmd:pl-32 2xl:pr-64 2xl:pl-64 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
				{galleryImages.map((img, index) => (
					<ImageView
						key={index}
						src={img}
						alt={`Image ${index}`}
						className="rounded-xl hover:scale-110 fixed top-0 left-0 w-full h-[120px] bg-black   "
						view={true}
					/>
				))}
			</div>
		</div>
	)
}
