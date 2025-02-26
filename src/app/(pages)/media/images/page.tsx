"use client"
import ImageView from "@/components/image-view"
import Link from "next/link"
import Breadcrumbs from "@/components/breadcrumb"
import SwiperCarousel from "@/components/swiper-carousel"
import galleryImages from "@/data/gallery.json"
import {useEffect, useState} from "react";
import {Attachment} from "@/types/attachments";
import SectionCta from "@/components/section-cta";
// روابط القائمة
const menuLinks = [
	{ label: "...", href: "#" },
	{ label: "...", href: "#" },
	{ label: "...", href: "#" },
	{ label: "...", href: "#" },
]

export default function Gallery() {
	const [images , setImages] = useState<Attachment[]>([])
	useEffect(() => {
		const newArray = galleryImages.map(item => ({
			id: item.id,
			path: item.image.path
		}));

		console.log(newArray);
		setImages(newArray);
	}, [])
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
			<SectionCta
				links={[
					{ label: "...", href: "#" },
					{ label: "...", href: "#" },
					{ label: "...", href: "#" },
					{ label: "...", href: "#" },
				]}
			/>

			{/* Swiper Carousel */}
			<SwiperCarousel images={images} />

			{/*galleryImages*/}
			<div className="mr-3 xmd:pr-32 xmd:pl-32 2xl:pr-64 2xl:pl-64 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
				{galleryImages.map((img, index) => (
					<ImageView
						images={images}
						key={index}
						src={img.image.path}
						alt
							={`Image ${index}`}
						className="rounded-xl hover:scale-110 fixed top-0 left-0 w-full h-[120px] bg-black   "
					/>
				))}
			</div>
		</div>
	)
}
