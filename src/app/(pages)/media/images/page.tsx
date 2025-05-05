import ImageView from "@/components/image-view"
import Breadcrumbs from "@/components/breadcrumb"
import SwiperCarousel from "@/components/swiper-carousel"
import galleryImages from "@/data/gallery.json"
import SectionCta from "@/components/section-cta"

export default function Gallery() {
	
	const images = galleryImages
		.filter((item) => item.title !== "khat")
		.map((item) => ({
			id: item.id,
			path: item.image.path,
			title: item.title || `Image ${item.id}`, 
		}))

	return (
		<div className="container space-y-14">
			<Breadcrumbs
				className="text-white"
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الوسائط المتعددة", url: "#" }, 
					{ name: "معرض الصور", url: "/media/images" },
				]}
			/>

			<SectionCta
				links={[
					{ label: "جميع الصور", href: "#" },
					{ label: "صور مسابقات", href: "#" },
					{ label: "صور أخبار", href: "#" },
					{ label: "صور مناسبات", href: "#" },
				]}
			/>

			<SwiperCarousel images={images} />

			<div className="mr-3 xmd:pr-32 xmd:pl-32 2xl:pr-64 2xl:pl-64 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
				{images.map((img) => (
					<div
						key={img.id}
						className="aspect-[14/12] overflow-hidden rounded-xl"
					>
						<ImageView
							images={images}
							src={img.path}
							alt={img.title}
							className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
						/>
					</div>
				))}
			</div>
		</div>
	)
}
