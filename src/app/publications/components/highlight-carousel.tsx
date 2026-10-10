"use client";

import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/book";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
export function HighlightCarousel({ publications }: { publications: Book[] }) {
  const displayedPublications = publications.slice(0, 4);
  const [publication, setPublication] = useState(displayedPublications[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = displayedPublications.indexOf(publication);
      const nextIndex =
        currentIndex === displayedPublications.length - 1
          ? 0
          : currentIndex + 1;
      setPublication(displayedPublications[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayedPublications, publication]);

  return (
    <section className="space-y-10">
      <div
        className={cn(
          "h-[18rem] sm:h-[24rem] lg:h-[30rem] xl:h-[36rem] overflow-hidden text-white rounded-xl sm:rounded-2xl lg:rounded-[50px] xl:rounded[150px] bg-[url('/shapes/dark-bg.svg')] p-4 lg:p-10 xl:p-20 duration-200",
          displayedPublications.indexOf(publication) % 2 === 0
            ? "bg-dark-background dark:bg-dark-background "
            : "bg-dark-background dark:bg-dark-background",
        )}
      >
        <AnimatePresence mode="wait">
          {publication ? (
            <motion.div
              key={publication.id}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="flex h-full items-center justify-center gap-2 sm:gap-6"
            >
              <div className="flex h-full min-w-0 w-7/12 flex-col justify-center gap-3 sm:gap-6 lg:gap-8">
                <h2 className="line-clamp-3 sm:line-clamp-2 text-sm sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold xl:!leading-[5rem] tracking-wide">
                  {publication.title}
                </h2>
                <h3 className="line-clamp-1 text-xs sm:text-2xl">
                  {publication.author}
                </h3>
                <Link
                  href={`/publications/${publication.slug}`}
                  className="w-fit bg-primary dark:bg-Muharram_primary text-xs sm:text-2xl tracking-wide font-semibold px-4 py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-lg lg:rounded-xl"
                >
                  اشتري الكتاب
                </Link>
              </div>
              <div className="w-5/12 flex justify-center items-center">
                <div className="relative flex-none h-[calc(9rem_+_2cm)] w-[calc(7rem_+_2cm)] sm:h-[calc(14rem_+_2cm)] sm:w-[calc(10.5rem_+_2cm)] lg:h-[calc(18rem_+_2cm)] lg:w-[calc(13.5rem_+_2cm)] xl:h-[calc(20rem_+_2cm)] xl:w-[calc(15rem_+_2cm)] bg-[url('/shapes/book-bg.svg')] dark:bg-[url('/shapes/book-bg_Muharram.svg')] bg-no-repeat bg-center bg-contain">
                  <div className="absolute inset-[1cm]">
                    <Image
                      src={publication.image}
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 168px, (max-width: 1280px) 216px, 240px"
                      className="object-contain"
                      priority
                      alt={publication.title}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            "لا توجد اصدارات"
          )}
        </AnimatePresence>
      </div>

      {/* المؤشرات */}
      <div className="flex gap-4 w-full justify-center">
        {displayedPublications.map((_, index) => (
          <div
            key={index}
            onClick={() => setPublication(displayedPublications[index])}
            className={cn(
              "rounded-full w-4 h-4 bg-primary/20 cursor-pointer hover:bg-primary-50 dark:bg-Muharram_primary/20 dark:hover:bg-Muharram_primary duration-150",
              displayedPublications.indexOf(publication) === index &&
                "bg-primary dark:bg-Muharram_primary",
            )}
          />
        ))}
      </div>
    </section>
  );
}
