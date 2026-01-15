"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeaderSections from "@/components/header-sections";
import { Post } from "@/types/post";

export default function Posts({ newsPosts }: { newsPosts: Post[] }) {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [enableHover, setEnableHover] = useState(false);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisiblePosts(2);
        setEnableHover(false);
      } else if (width < 1024) {
        setVisiblePosts(3);
        setEnableHover(true);
      } else {
        setVisiblePosts(4);
        setEnableHover(true);
      }
    };

    update(); // أول قراءة بعد mount (مسموح)
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="container pt-20 flex flex-col items-center gap-6">
      <HeaderSections
        title="الأخبار"
        moreButton={{
          label: "ارشيف الاخبار",
          href: "/news/archives",
        }}
      />

      <div
        className="flex w-full h-[65rem] sm:h-full gap-4 pt-10
			                flex-col items-center
			                md:flex-row md:justify-center"
      >
        {newsPosts.slice(0, visiblePosts).map((item) => (
          <motion.div
            key={item.slug}
            initial={{ flex: 1 }}
            animate={{ flex: 1 }}
            whileHover={enableHover ? { flex: 2 } : {}}
            className="relative w-full h-[30rem] rounded-lg"
          >
            <Link href={`/news/${item.slug}`} className="block h-full">
              <div
                className="absolute inset-0 rounded-3xl bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="rounded-3xl bg-gradient-to-t from-primary dark:from-Muharram_primary to-transparent flex items-end p-6 h-full">
                  <div className="flex flex-col text-white/90">
                    <div className="flex gap-2 items-center text-xl sm:text-2xl font-bold">
                      <Image
                        src="/shapes/title-icon.svg"
                        width={12}
                        height={12}
                        alt="title icon"
                        className="dark:hidden"
                      />
                      <Image
                        src="/shapes/title-icon_Muharram.svg"
                        width={12}
                        height={12}
                        alt="title icon"
                        className="hidden dark:block"
                      />
                      خبــــر
                    </div>
                    <p className="line-clamp-2 p-1 pr-5 pb-8 md:pb-5">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
