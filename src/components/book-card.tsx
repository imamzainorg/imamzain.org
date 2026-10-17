"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, Share2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Book } from "@/types/book";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";
import Dropdown from "@/components/dropdown";

const smallButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-colors";
const solid = `${smallButton} border-primary bg-primary text-white hover:bg-primary/90 dark:border-Muharram_primary dark:bg-Muharram_primary`;
const outline = `${smallButton} border-primary/30 text-primary hover:border-primary hover:bg-primary hover:text-white dark:border-Muharram_primary/40 dark:text-Muharram_primary dark:hover:bg-Muharram_primary dark:hover:text-white`;

const ORDINALS = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر", "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر", "التاسع عشر", "العشرون"];
const partName = (n: number) => `الجزء ${ORDINALS[n - 1] ?? n}`;

// A previous/next arrow; a dimmed one stands in at either end of the series.
function PartArrow({ target, base, label, Icon }: { target?: Book; base: string; label: string; Icon: typeof ArrowLeft }) {
  return target ? (
    <Link href={`${base}/${target.slug}`} aria-label={label} title={label} className={cn(outline, "h-9 px-3")}>
      <Icon className="h-4 w-4" />
    </Link>
  ) : (
    <span aria-hidden className={cn(smallButton, "h-9 border-gray-200 px-3 text-gray-300")}>
      <Icon className="h-4 w-4" />
    </span>
  );
}

// The book page: title, the part it is, the numbers a reader looks for first, small actions, and
// a one-line way to move between the parts of its series.
export default function BookCard({
  publication,
  seriesParts,
}: {
  publication: Book;
  // Only the books sharing publication.series (including this one), not the whole catalog, so
  // the detail page does not ship every book to the client.
  seriesParts: Book[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  // The image loader encodes CDN paths itself; encoding here too would break them.
  const imageUrl = publication.image || "/images/placeholder.jpg";

  // The data holds some languages as a list although the type says string.
  const language = Array.isArray(publication.language)
    ? (publication.language as string[]).join("، ")
    : publication.language;

  const stats = [
    { label: "صفحة", value: publication.pages },
    { label: publication.parts > 1 ? "أجزاء" : "جزء", value: publication.parts },
    { label: "سنة الطبع", value: publication.printDate },
    { label: "اللغة", value: language },
  ].filter((stat) => stat.value);

  const details = [
    { label: "المطبعة", value: publication.printHouse },
    { label: "أسماء أخرى", value: publication.otherNames?.join("، ") },
  ].filter((detail) => detail.value);

  const parts = [...seriesParts].sort((a, b) => a.partNumber - b.partNumber);
  const current = parts.findIndex((part) => part.slug === publication.slug);
  const base = pathname.substring(0, pathname.lastIndexOf("/"));

  return (
    <div>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <Reveal x={60} y={0} className="min-w-0">
          {publication.category?.length ? (
            <ul className="mb-4 flex flex-wrap gap-2">
              {publication.category.map((name) => (
                <li
                  key={name}
                  className="rounded-full bg-primary/[0.07] px-3 py-1 text-sm font-semibold text-primary dark:bg-white/10 dark:text-white"
                >
                  {name}
                </li>
              ))}
            </ul>
          ) : null}

          <h1 className="text-3xl font-extrabold leading-snug text-primary dark:text-Muharram_primary md:text-4xl md:leading-snug">
            {publication.title}
          </h1>
          {publication.author && (
            <p className="mt-3 text-lg text-gray-600">
              تأليف: <span className="font-bold text-gray-900">{publication.author}</span>
            </p>
          )}

          {current >= 0 && parts.length > 1 && (
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-lg bg-secondary/20 px-3 py-1 text-lg font-extrabold text-secondary_dark dark:bg-Muharram_secondary/20 dark:text-Muharram_secondary">
                {partName(current + 1)}
              </span>
              <span className="text-gray-600">من {parts.length} أجزاء في سلسلة «{publication.series}»</span>
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {publication.pdf ? (
              <Link href={publication.pdf} target="_blank" rel="noopener noreferrer" className={solid}>
                <Download className="h-4 w-4" />
                تنزيل الكتاب
              </Link>
            ) : (
              <span className={cn(smallButton, "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500")}>
                الكتاب غير متوفر
              </span>
            )}
            {publication.category?.includes("الإصدارات") && (
              <Link href="/services/stores" className={outline}>
                <ShoppingCart className="h-4 w-4" />
                أماكن البيع
              </Link>
            )}
            <button
              type="button"
              aria-label="نسخ رابط الصفحة"
              title="نسخ الرابط"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast("تم نسخ الرابط في الحافظة");
              }}
              className={cn(outline, "px-3")}
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {current >= 0 && parts.length > 1 && (
            <nav aria-label="أجزاء السلسلة" className="mt-3 flex items-center gap-2">
              <PartArrow target={parts[current - 1]} base={base} label="الجزء السابق" Icon={ArrowRight} />
              <Dropdown
                compact
                label="الانتقال إلى جزء آخر"
                className="w-44"
                value={publication.slug}
                onChange={(slug) => router.push(`${base}/${slug}`)}
                options={parts.map((part, index) => ({ value: part.slug, label: partName(index + 1) }))}
              />
              <PartArrow target={parts[current + 1]} base={base} label="الجزء التالي" Icon={ArrowLeft} />
            </nav>
          )}

          {stats.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 divide-primary/10 overflow-hidden rounded-3xl border border-primary/10 bg-white/70 dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.04] sm:grid-cols-4 sm:divide-x sm:divide-x-reverse">
              {stats.map(({ label, value }) => (
                <div key={label} className="px-4 py-4 text-center">
                  <dd className="text-2xl font-extrabold text-primary dark:text-white">{value}</dd>
                  <dt className="mt-1 text-sm font-semibold text-secondary_dark dark:text-white/60">{label}</dt>
                </div>
              ))}
            </dl>
          )}

          {details.length > 0 && (
            <dl className="mt-5 space-y-2 text-base leading-7">
              {details.map(({ label, value }) => (
                <div key={label} className="flex flex-wrap gap-x-3">
                  <dt className="font-semibold text-secondary_dark dark:text-Muharram_secondary">{label}:</dt>
                  <dd className="text-gray-800 dark:text-white/85">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        <Reveal x={-60} y={0} delay={0.15} className="order-first lg:order-none">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[12rem] lg:max-w-[16rem]">
            <Image
              src={imageUrl}
              fill
              sizes="256px"
              alt={publication.title}
              className="object-contain drop-shadow-[0_22px_24px_rgba(0,0,0,0.35)]"
              priority
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
