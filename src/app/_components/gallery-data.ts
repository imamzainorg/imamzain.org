import galleryImages from "@/data/gallery.json";

export type GallerySlide = { id: number; path: string };

const SLIDER_IMAGE_IDS = [498, 579, 335, 354, 806, 209, 473, 823, 452, 205, 457];

// Server-only selection of the handful of curated photos the home gallery shows, so the
// client component gets ~11 records instead of the whole gallery.json in its bundle.
export function getSliderImages(): GallerySlide[] {
  return galleryImages
    .filter((image) => image.name !== "khat" && SLIDER_IMAGE_IDS.includes(image.id))
    .map((image) => ({ id: image.id, path: image.url }));
}
