"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSubject } from "@/types/imamzain-legacy";
import { libraryPath } from "../_config/paths";

type DictionarySubjectsProps = {
  subjects: NavSubject[];
  collectionSlug: string;
  dictionarySlug: string;
  dictionaryTitle: string;
};

const SCROLL_KEY = "dictionary-scroll-top";

const activeClass =
  "bg-primary/10 opacity-100 text-emerald-700 dark:bg-emerald-400/20 dark:border-emerald-400 dark:text-emerald-300";

export default function DictionarySubjects({
  subjects,
  collectionSlug,
  dictionarySlug,
  dictionaryTitle,
}: DictionarySubjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ y: 0, scrollTop: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(SCROLL_KEY);
    if (savedScroll && scrollRef.current) {
      scrollRef.current.scrollTop = Number(savedScroll);
    }
  }, []);

  function saveScrollPosition() {
    if (scrollRef.current) {
      sessionStorage.setItem(SCROLL_KEY, String(scrollRef.current.scrollTop));
    }
  }

  function startDragging(e: React.MouseEvent) {
    setIsDragging(true);
    dragStartRef.current = {
      y: e.clientY,
      scrollTop: scrollRef.current?.scrollTop ?? 0,
    };
  }

  function drag(e: React.MouseEvent) {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollTop =
      dragStartRef.current.scrollTop - (e.clientY - dragStartRef.current.y);
  }

  // عند بلوغ طرف القائمة تنتقل العجلة إلى الصفحة، وإلا تبقى داخل القائمة
  function handleWheel(e: React.WheelEvent) {
    const el = scrollRef.current;
    if (!el) return;

    const atTop = el.scrollTop === 0 && e.deltaY < 0;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;
    if (!atTop && !atBottom) e.stopPropagation();
  }

  return (
    <div
      ref={scrollRef}
      className={`flex-1 overflow-y-auto max-h-[60vh] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={startDragging}
      onMouseMove={drag}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onWheel={handleWheel}
    >
      <div className="bg-white dark:bg-zinc-900 border border-primary/20 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-subtitle text-center text-gray-700 dark:text-gray-200 mb-3">
          فهرس {dictionaryTitle}
        </h3>

        <div className="flex flex-col gap-2">
          {subjects.map((subject) => {
            const isActive = pathname.endsWith(`/${subject.slug}`);

            return (
              <Link
                key={subject.id}
                href={libraryPath(collectionSlug, dictionarySlug, subject.slug)}
                onClick={saveScrollPosition}
                className={`group flex items-center justify-between rounded-lg border px-3 py-2 transition
                  ${isActive ? activeClass : "border-primary/15 hover:border-primary/60"}
                `}
              >
                <span
                  className={`text-subtitle ${
                    isActive
                      ? "font-semibold text-emerald-700 dark:text-emerald-300"
                      : "text-gray-800 dark:text-gray-200 group-hover:text-primary"
                  }`}
                >
                  {subject.title}
                </span>

                <span className="text-xs border-2 border-primary/30 rounded-full p-1 leading-5 text-gray-500">
                  {subject.id}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
