import galleryImages from "@/data/gallery.json";

export type GallerySlide = { id: number; path: string };

// Picked by their image URL: gallery ids are numbered at build time and are not stable.
const SLIDER_IMAGE_URLS = [
  "https://cdn.imamzain.org/media/102a302e-57c9-4990-ab0f-98fc19aa71f8.jpg",
  "https://cdn.imamzain.org/media/43117417-3c96-4432-a24f-cecd79a0aad7.jpg",
  "https://cdn.imamzain.org/media/4055a136-cb03-4f8e-a985-919113d1bb42.jpg",
  "https://cdn.imamzain.org/media/910c5efe-82bd-42a2-a3da-1ed09d29724e.jpg",
  "https://cdn.imamzain.org/media/63b0e0d2-204f-4d4c-b599-009583d79726.jpg",
  "https://cdn.imamzain.org/media/c0f1be7b-62dc-407b-a89b-c130d4952d9f.jpg",
  "https://cdn.imamzain.org/media/1ca6f25b-1b24-4f40-bb98-04da8a48c853.jpg",
  "https://cdn.imamzain.org/media/620bdacb-5124-44ae-b0bd-388ef9064814.jpg",
  "https://cdn.imamzain.org/media/033b1ef3-374a-4dbc-830d-60ed83feef1c.jpg",
  "https://cdn.imamzain.org/media/73272a18-0b48-4a37-9800-4473ea18f5ec.jpg",
  "https://cdn.imamzain.org/media/e0ff4ecc-cf01-4c30-ac75-a1ca6b743f67.jpg",
];

// Server-only selection of the handful of curated photos the home gallery shows, so the
// client component gets ~11 records instead of the whole gallery.json in its bundle.
export function getSliderImages(): GallerySlide[] {
  return galleryImages
    .filter((image) => SLIDER_IMAGE_URLS.includes(image.url))
    .map((image) => ({ id: image.id, path: image.url }));
}
