import galleryImages from "@/data/gallery.json";

export type GallerySlide = { id: number; path: string };

export type GalleryCategoryImage = {
  id: number;
  url: string;
  name: string;
  linkedCategory: string;
};

const SLIDER_IMAGE_IDS = [498, 579, 335, 354, 806, 209, 473, 823, 452, 205, 457];

const CATEGORY_IMAGE_IDS = [
  { id: 218, category: "نشاطات" },
  { id: 236, category: "ندوات" },
  { id: 195, category: "مناسبات" },
  { id: 309, category: "مسابقات" },
  { id: 265, category: "اخبار" },
];

// Server-only selection of the handful of curated images the home gallery
// shows, so the client component gets ~16 records instead of the whole
// gallery.json in its bundle.
export function getGallerySectionData() {
  const gallery = galleryImages.filter((item) => item.name !== "khat");

  const sliderImages: GallerySlide[] = gallery
    .filter((image) => SLIDER_IMAGE_IDS.includes(image.id))
    .map((image) => ({ id: image.id, path: image.url }));

  const categoryImages: GalleryCategoryImage[] = CATEGORY_IMAGE_IDS.flatMap(
    ({ id, category }) => {
      const image = gallery.find((img) => img.id === id);
      return image
        ? [{ id: image.id, url: image.url, name: image.name, linkedCategory: category }]
        : [];
    },
  );

  return { sliderImages, categoryImages };
}
