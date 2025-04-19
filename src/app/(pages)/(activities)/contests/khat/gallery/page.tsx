import ImageView from "@/components/image-view"
import Breadcrumbs from "@/components/breadcrumb"
import galleryImages from "@/data/gallery.json"

export default function Gallery() {
	const images = galleryImages
		.filter((item) => item.title === "khat")
		.map((image) => {
			return { id: image.id, path: image.image.path }
		})

	return (
		<div className="">
			{/* Breadcrumbs */}
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المسابقات", url: "#" },
					{ name: "مسابقة الخط", url: "/contests/khat" },
					{ name: "معرض الصور", url: "#" },
				]}
			/>

			{/*galleryImages*/}
			<div className="mr-3 xmd:pr-32 xmd:pl-32 2xl:pr-64 2xl:pl-64 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
				{images.map((img, index) => (
					<ImageView
						images={images}
						key={index}
						src={img.path}
						alt={`Image ${index}`}
						className="rounded-xl hover:scale-110 fixed top-0 left-0 w-full h-[120px] bg-black"
					/>
				))}
			</div>
		</div>
	)
}
