"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DownloadIcon } from "@/assets/icons/reusable";
import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button1";
import { toast } from "sonner";
import NewsShare from "@/components/news-share";
import {
  ShoppingCartIcon,
  BookOpen,
  Languages,
  FileText,
  CalendarIcon,
  Printer,
  Users,
} from "lucide-react";

export default function BookCard({
  publication,
  publications,
}: {
  publication: Book;
  publications: Book[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [prevPageUrl, setPrevPageUrl] = useState("");

  useEffect(() => {
    if (
      document.referrer &&
      !document.referrer.includes(window.location.href)
    ) {
      setPrevPageUrl(document.referrer);
    }
  }, []);

  const seriesParts = publication.series
    ? publications.filter((book) => book.series === publication.series)
    : [];

  return (
    <div className="space-y-16 my-12 max-w-screen-xl mx-auto px-4">
      {prevPageUrl && (
       <div className="mb-4">
  <Button
    onClick={() => router.back()}
    variant="outline"
    className="inline-flex px-5 py-2 text-sm items-center gap-2 bg-white border border-primary text-primary hover:bg-primary/10 dark:border-Muharram_primary dark:text-Muharram_primary dark:hover:bg-Muharram_primary/10 transition-all font-medium rounded-full shadow-sm"
  >
    ← الرجوع إلى الصفحة السابقة
  </Button>
</div>

      )}

      <div className="relative rounded-3xl shadow-2xl border border-gray-200 bg-gradient-to-tr from-white via-secondary/10 to-secondary/30 dark:via-Muharram_secondary/10 dark:to-Muharram_secondary/30 overflow-hidden">
        {/* أجزاء السلسلة */}
        {seriesParts.length > 1 && (
          <div className="px-6 md:px-10 py-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
              أجزاء السلسلة
            </h3>

            <div className="flex flex-wrap gap-3 justify-center">
              {seriesParts.map((part, index) => (
                <button
                  key={part.id}
                  onClick={() => {
                    const base = pathname.substring(
                      0,
                      pathname.lastIndexOf("/")
                    );
                    router.push(`${base}/${part.slug}`);
                  }}
                  className={`px-5 py-2 rounded-full border-2 transition-all text-sm font-medium
                    ${
                      part.slug === publication.slug
                        ? "bg-primary text-white border-primary dark:bg-Muharram_primary dark:border-Muharram_primary shadow-md"
                        : "border-white text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                    }
                  `}
                >
                  الجزء {index + 1}
                </button>
              ))}
            </div>

            <div className="w-full h-[0.5px] mt-5 bg-gradient-to-r from-transparent via-primary dark:via-Muharram_primary dark:to-transparent to-transparent" />
          </div>
        )}

        {/* معلومات الكتاب */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 md:p-10 gap-8 ">
          <div className="w-full lg:w-1/3 flex justify-center relative group">
            <div className="relative w-full max-w-xs aspect-[3/4] rounded-xl overflow-hidden bg-transparent">
              <Image
                src={publication.image}
                fill
                alt={publication.title}
                className="object-contain transition-transform"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-6 text-center lg:text-right">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {publication.title}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                تأليف: <span className="font-medium">{publication.author}</span>
              </p>
            </div>

            {/* الأزرار */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              {publication.pdf ? (
                <Link
                  href={publication.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-700 hover:from-primary/90 hover:to-emerald-700/90 dark:from-Muharram_primary dark:to-Muharram_primary/70 dark:hover:to-Muharram_primary/20 transition-all text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg"
                >
                  <DownloadIcon fill="#ffffff" />
                  تنزيل الكتاب
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 bg-gray-400 dark:bg-gray-600 text-white font-medium px-6 py-3 rounded-full shadow-md cursor-not-allowed">
                  الكتاب غير متوفر
                </span>
              )}

              <Button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast("تم نسخ الرابط في الحافظة");
                }}
                variant="outline"
                className="inline-flex p-6 text-md items-center gap-2 bg-white border border-primary text-primary hover:bg-primary/10 dark:border-Muharram_primary dark:text-Muharram_primary dark:hover:bg-Muharram_primary/10 transition-all font-medium rounded-full shadow-sm"
              >
                <NewsShare iconSize={20} />
                مشاركة
              </Button>

              {publication.category?.includes("publications") && (
                <Link
                  href={`/services/stores`}
                  className="inline-flex items-center gap-2 bg-white border border-primary text-primary hover:bg-primary/10 dark:border-Muharram_primary dark:text-Muharram_primary dark:hover:bg-Muharram_primary/10 transition-all font-medium px-6 py-3 rounded-full shadow-sm"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  اماكن البيع المباشر
                </Link>
              )}
            </div>

            {/* التفاصيل */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <Detail
                label="عدد الصفحات"
                icon={
                  <BookOpen className="w-5 h-5 text-primary dark:text-Muharram_primary" />
                }
                value={publication.pages}
              />
              <Detail
                label="عدد الأجزاء"
                icon={
                  <FileText className="w-5 h-5 text-primary dark:text-Muharram_primary" />
                }
                value={publication.parts}
              />
              <Detail
                label="تاريخ الطبع"
                icon={
                  <CalendarIcon className="w-5 h-5 text-primary dark:text-Muharram_primary" />
                }
                value={publication.printDate}
              />
           
              <Detail
                label="اللغة"
                icon={
                  <Languages className="w-5 h-5 text-primary dark:text-Muharram_primary" />
                }
                value={publication.language}
              />
              <Detail
                label="المطبعة"
                icon={
                  <Printer className="w-5 h-5 text-primary dark:text-Muharram_primary" />
                }
                value={publication.printHouse}
              />
              <Detail
                label="شخصيات اخرى"
                icon={
                  <Users className="w-5 h-5 text-primary dark:text-Muharram_primary" />
                }
                value={
                  publication.otherNames.length
                    ? publication.otherNames.slice(0, -1).join(", ") +
                      publication.otherNames[publication.otherNames.length - 1]
                    : "لا يوجد"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  icon,
  english = false,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  english?: boolean;
}) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center lg:items-start ">
      <div className="flex items-center gap-2 text-gray-700">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <span
        dir={english ? "ltr" : "rtl"}
        className={`text-gray-500 mt-1 ${english && "text-left"}`}
      >
        {value}
      </span>
    </div>
  );
}
