"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react"

import HeaderSections from "@/components/header-sections"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { Book } from "@/types/book"
=======
import { useEffect, useState } from "react";
import { Book } from "@/types/book";
>>>>>>> d395314e412b1ea3364b7b8fc5454dcf0de2bfff

export default function Publications({
  publications,
}: {
  publications: Book[];
}) {
<<<<<<< HEAD
	
	const getResponsiveBooksCount = (): number => {
		if (typeof window === 'undefined') return 10

		const width = window.innerWidth

		if (width >= 1280) return 10
		else if (width >= 1024) return 8
		else if (width >= 768) return 6
		else if (width >= 640) return 4
		else return 2
	}

	const [booksToShow, setBooksToShow] = useState<number>(10)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const updateBooksToShow = () => {
			setBooksToShow(getResponsiveBooksCount())
		}

		// تحديث فوري عند التحميل
		updateBooksToShow()

		// الاستماع لتغيير حجم الشاشة
		window.addEventListener("resize", updateBooksToShow)

		return () => window.removeEventListener("resize", updateBooksToShow)
	}, [])
=======
  const [booksToShow, setBooksToShow] = useState<number>(10);
>>>>>>> d395314e412b1ea3364b7b8fc5454dcf0de2bfff

  useEffect(() => {
    const updateBooksToShow = () => {
      const width = window.innerWidth;

<<<<<<< HEAD
	const iconVariants = {
		rest: { rotate: 0, x: 0 },
		hover: {
			rotate: -90,
			x: 15,
			transition: { duration: 0.3 },
		},
	}

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
=======
      if (width >= 1280) setBooksToShow(10);
      else if (width >= 1024) setBooksToShow(8);
      else if (width >= 768) setBooksToShow(6);
      else setBooksToShow(4);
    };
>>>>>>> d395314e412b1ea3364b7b8fc5454dcf0de2bfff

    updateBooksToShow();
    window.addEventListener("resize", updateBooksToShow);

    return () => window.removeEventListener("resize", updateBooksToShow);
  }, []);

<<<<<<< HEAD
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
										className="object-center"
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
										className="object-center"
									/>
								</motion.div>
							</div>
							<div className="w-full flex flex-col gap-4 justify-between h-[5rem] rounded-2xl py-3 px-3 items-center">
								<h1 className="text-sm text-center w-full font-semibold truncate">
									{book.title}
								</h1>
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
	)
}
=======
  return (
    <div>
      {publications.slice(0, booksToShow).map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
>>>>>>> d395314e412b1ea3364b7b8fc5454dcf0de2bfff
