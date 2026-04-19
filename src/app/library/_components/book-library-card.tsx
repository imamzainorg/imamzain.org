import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";

const encodeImageUrl = (url: string): string => {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname
      .split("/")
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join("/");
    return urlObj.toString();
  } catch {
    return encodeURI(url);
  }
};

export default function BooklibraryCard({
  publication,
  route = "",
  priority = false,
}: {
  publication: Book;
  downloadable?: boolean;
  route?: string;
  priority?: boolean;
}) {
  const printHouse = publication.printHouse || "غير محدد";
  const author = Array.isArray(publication.author)
    ? publication.author.join("، ")
    : publication.author || "مؤلف غير معروف";

  const imageUrl = encodeImageUrl(publication.image);

  return (
    <Link
      href={`${route}/${publication.slug}`}
      className="flex items-center gap-4 py-4 lg:py-6"
      prefetch={false}
    >
      {/* ── غلاف الكتاب ── */}
      <div className="relative w-1/3 p-4 flex-shrink-0 flex justify-center items-center bg-[url('/shapes/book-bg.svg')] dark:bg-[url('/shapes/book-bg_Muharram.svg')] bg-no-repeat bg-center bg-contain min-h-[120px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            className="object-contain rounded-sm p-2"
            alt={`غلاف كتاب ${publication.title}`}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 text-center px-1 leading-tight">
              لا يوجد غلاف
            </span>
          </div>
        )}
      </div>

      {/* ── تفاصيل الكتاب ── */}
      <div className="w-2/3 flex flex-col gap-2 py-2">
        <h2 className="text-primary dark:text-Muharram_primary font-bold text-subtitle leading-snug line-clamp-2">
          {publication.title}
        </h2>
        <span className="text-sm font-medium text-gray-700 line-clamp-1">
          {author}
        </span>
        <span className="text-sm font-light text-gray-500">
          الناشر: {printHouse}
        </span>
        <span className="text-sm lg:hidden xl:block font-light text-gray-500">
          عدد الأجزاء: {publication.parts || 1}
        </span>
        <div className="flex justify-between w-11/12 text-xs xl:text-sm font-light text-gray-500">
          <span>{publication.pages} صفحة</span>
          <span>{publication.views} مشاهدة</span>
        </div>
      </div>
    </Link>
  );
}
