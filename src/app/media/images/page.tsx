import ImagesClient from "./_components/images-client"
import galleryImages from "@/data/gallery.json"
import type { Gallery } from "@/types/gallery"

export default function Page() {
	const images: Gallery[] = galleryImages.map((item) => ({
		id: item.id,
		url: item.url,
		title: item.name,
		description: item.description,
		category: item.category,
		date: item.date,
		location: item.location,
		photographer: item.photographer || "غير محدد",
		tags: item.tags,
	}))

	return <ImagesClient images={images} />
}
