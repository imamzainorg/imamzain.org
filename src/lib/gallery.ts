import galleryImages from "@/data/gallery.json"
import type { Gallery } from "@/types/gallery"

// gallery.json (819 items, ~590 KB) in the shape the images page works with.
export const gallery: Gallery[] = galleryImages.map((item) => ({
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
