"use client";

import { usePathname } from "next/navigation";
import {
  CalendarIcon,
  Download,
  FileText,
  Languages,
  Printer,
  Share2,
  ShoppingCartIcon,
  Users,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Book } from "@/types/book";
import { cn } from "@/lib/utils";
import { outlineButton, shieldPanel, solidButton } from "@/components/brand";
import { Reveal } from "@/components/motion";

const MISSING = "غير محدد";

// The book page: its cover, title and actions, then its particulars in a green shield.
export default function BookCard({
  publication,
  seriesParts,
}: {
  publication: Book;
  // Only the other books sharing publication.series (including this one),
  // not the whole catalog — this used to be filtered here from a
  // `publications: Book[]` prop holding every book, which meant every
  // book/publication detail page shipped all ~138 books to the client just
  // to find the handful in the same series.
  seriesParts: Book[];
}) {
  const pathname = usePathname();

  // The image loader encodes CDN paths itself; encoding here too would break them.
  const imageUrl = publication.image || "/images/placeholder.jpg";

  // The data holds some languages as a list although the type says string.
  const language = Array.isArray(publication.language)
    ? (publication.language as string[]).join("، ")
    : publication.language;

  const facts = [
    { label: "عدد الصفحات", value: publication.pages ?? MISSING, Icon: BookOpen },
    { label: "عدد الأجزاء", value: publication.parts ?? MISSING, Icon: FileText },
    { label: "تاريخ الطبع", value: publication.printDate ?? MISSING, Icon: CalendarIcon },
    { label: "اللغة", value: language || MISSING, Icon: Languages },
    { label: "المطبعة", value: publication.printHouse ?? MISSING, Icon: Printer },
    {
      label: "أخرى",
      value: publication.otherNames?.length
        ? publication.otherNames.join(", ")
        : "لا يوجد",
      Icon: Users,
    },
  ];

  return (
    <div>
      <div className="grid items-center gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
        <Reveal x={60} y={0}>
          <h1 className="text-3xl font-extrabold leading-snug text-primary dark:text-Muharram_primary md:text-4xl md:leading-snug">
            {publication.title}
          </h1>
          {publication.author && (
            <p className="mt-3 text-xl text-gray-600">
              تأليف:{" "}
              <span className="font-bold text-gray-900">{publication.author}</span>
            </p>
          )}

          {seriesParts.length > 1 && (
            <div className="mt-8">
              <p className="mb-3 font-bold text-secondary_dark dark:text-Muharram_secondary">
                أجزاء السلسلة
              </p>
              <div className="flex flex-wrap gap-2">
                {seriesParts.map((part, index) => (
                  <Link
                    key={part.id}
                    href={`${pathname.substring(0, pathname.lastIndexOf("/"))}/${part.slug}`}
                    aria-current={part.slug === publication.slug ? "page" : undefined}
                    className={cn(
                      "rounded-xl border-2 px-4 py-2 font-semibold transition-colors",
                      part.slug === publication.slug
                        ? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
                        : "border-primary/25 text-primary hover:border-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary dark:hover:border-Muharram_primary",
                    )}
                  >
                    الجزء {index + 1}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {publication.pdf ? (
              <Link
                href={publication.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={solidButton}
              >
                <Download className="h-5 w-5" />
                تنزيل الكتاب
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center rounded-xl border-2 border-gray-300 bg-gray-100 px-6 py-3 font-semibold text-gray-500">
                الكتاب غير متوفر
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast("تم نسخ الرابط في الحافظة");
              }}
              className={outlineButton}
            >
              <Share2 className="h-5 w-5" />
              مشاركة
            </button>

            {publication.category?.includes("الإصدارات") && (
              <Link href="/services/stores" className={outlineButton}>
                <ShoppingCartIcon className="h-5 w-5" />
                اماكن البيع المباشر
              </Link>
            )}
          </div>
        </Reveal>

        <Reveal x={-60} y={0} delay={0.15}>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs">
            <Image
              src={imageUrl}
              fill
              sizes="(max-width: 1024px) 320px, 30vw"
              alt={publication.title}
              className="object-contain drop-shadow-[0_22px_24px_rgba(0,0,0,0.35)]"
              priority
            />
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <dl className={`${shieldPanel} grid gap-x-12 p-8 md:grid-cols-2 md:p-12 lg:grid-cols-3`}>
          {facts.map(({ label, value, Icon }) => (
            <div key={label} className="border-b border-white/10 py-4 last:border-0 md:[&:nth-last-child(-n+2)]:border-0 lg:[&:nth-last-child(-n+3)]:border-0">
              <dt className="flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white/60">
                <Icon className="h-4 w-4" />
                {label}
              </dt>
              <dd className="mt-1 text-lg leading-8 text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
