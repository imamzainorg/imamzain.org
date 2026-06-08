"use client";

import { useEffect, useState } from "react";

import HeaderSections from "@/components/header-sections";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Book } from "@/types/book";

export default function Publications({
  publications,
}: {
  publications: Book[];
}) {
  const getResponsiveBooksCount = (): number => {
    if (typeof window === "undefined") return 10;

    const width = window.innerWidth;

    if (width >= 1280) return 10;
    else if (width >= 1024) return 8;
    else if (width >= 768) return 6;
    else if (width >= 640) return 4;
    else return 2;
  };

  const [booksToShow, setBooksToShow] = useState<number>(10);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateBooksToShow = () => {
      setBooksToShow(getResponsiveBooksCount());
    };

    updateBooksToShow();

    window.addEventListener("resize", updateBooksToShow);

    return () => window.removeEventListener("resize", updateBooksToShow);
  }, []);

  const parentVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const iconVariants = {
    rest: { rotate: 0, x: 0 },
    hover: {
      rotate: -90,
      x: 15,
      transition: { duration: 0.3 },
    },
  };
const sortedPublications = [...publications]
	.filter(
		(book) =>
			Array.isArray(book.category) &&
			book.category.includes("الإصدارات")
	)
	.sort((a, b) => b.id - a.id);
  return (
    <div className="container w-full flex flex-col items-center pt-20">
      <div className="flex w-full items-center justify-between my-8">
        <HeaderSections
          title={"الإصدارات"}
          moreButton={{
            label: "ارشيف الإصدارات",
            href: "/publications",
          }}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 items-start my-8">
  {sortedPublications.slice(0, booksToShow).map((book) => (
          <Link key={book.id} href={`/publications/${book.slug}`}>
            <motion.div
              className="flex flex-col justify-between rounded-2xl h-3/4 bg-gradient-to-t from-[#e1e8d7] via-[#e1e8d7]/10 to-transparent dark:from-Muharram_secondary/20 dark:via-Muharram_secondary/5 dark:to-transparent"
              variants={parentVariants}
              initial="rest"
              animate="visible"
              whileHover="hover"
              transition={{ duration: 0.3 }}
            >
              <div className="relative flex justify-center items-center w-44 h-60 mx-auto">
                {/* Book Icon with Rotation */}
                <motion.div
                  variants={iconVariants}
                  className="absolute right-0 bottom-0 w-32 h-32"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 1,
                          ease: "easeOut",
                        },
                      },
                    }}
                    className="absolute right-0 bottom-0 w-32 h-32"
                  >
                    <Image
                      src="/shapes/book_icon.svg"
                      alt={`${book.title} icon`}
                      fill
                      sizes="100vw"
                      className="object-contain dark:hidden"
                      unoptimized
                    />

                    <Image
                      src="/shapes/book_icon_Muharram.svg"
                      alt={`${book.title} icon (dark)`}
                      fill
                      sizes="100vw"
                      className="object-contain hidden dark:block"
                      unoptimized
                    />
                  </motion.div>
                </motion.div>

                {/* Book Image 1 */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        ease: "easeOut",
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  className="absolute left-0 top-10 w-[7.5rem] h-[11.5rem]"
                >
                  <Image
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    fill
                    sizes="120px"
                    className="object-center"
                    unoptimized
                  />
                </motion.div>

                {/* Book Image 2 */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        ease: "easeOut",
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-2 left-11 w-[7.5rem] h-[11.5rem]"
                >
                  <Image
                    src={book.image}
                    alt={`Back cover of ${book.title}`}
                    fill
                    sizes="120px"
                    className="object-center"
                    unoptimized
                  />
                </motion.div>
              </div>
              <div className="w-full flex flex-col gap-4 justify-between h-[5rem] rounded-2xl py-3 px-3 items-center">
                <h3 className="text-sm text-center w-full font-semibold truncate">
                  {book.title}
                </h3>
                <div className="flex justify-between w-full text-[10px] sm:text-base lg:text-xs font-light tracking-wide text-gray-700">
                  <span>{book.pages} صفحة</span>
                  <span>{book.views} مشاهدة</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
