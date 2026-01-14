"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Subject {
  id: string;
  title: string;
  slug: string;
}

interface DictionarySubjectsProps {
  subjects: Subject[];
  collectionSlug: string;
  dictionarySlug: string;
  dictionaryTitle: string;
}

export default function DictionarySubjects({
  subjects,
  collectionSlug,
  dictionarySlug,
  dictionaryTitle,
}: DictionarySubjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const pathname = usePathname();

  const activeClasses =
    "bg-primary/10 opacity-100 text-emerald-700 dark:bg-emerald-400/20 dark:border-emerald-400 dark:text-emerald-300";

  // ===== حفظ مكان السكرول =====
  const handleClick = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(
        "dictionary-scroll-top",
        scrollRef.current.scrollTop.toString()
      );
    }
  };

  // ===== استرجاع مكان السكرول =====
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("dictionary-scroll-top");
    if (savedScroll && scrollRef.current) {
      scrollRef.current.scrollTop = Number(savedScroll);
    }
  }, []);

  // ===== سحب بالماوس =====
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    if (scrollRef.current) setScrollTop(scrollRef.current.scrollTop);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dy = e.clientY - startY;
    scrollRef.current.scrollTop = scrollTop - dy;
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  const onWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const atTop = el.scrollTop === 0 && e.deltaY < 0;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;

    if (atTop || atBottom) return;
    e.stopPropagation();
  };

  return (
    <div
      ref={scrollRef}
      className={`flex-1 overflow-y-auto max-h-[60vh] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
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
                href={`/library/${collectionSlug}/${dictionarySlug}/${subject.slug}`}
                onClick={handleClick}
                className={`group flex items-center justify-between rounded-lg border px-3 py-2 transition
                  ${
                    isActive
                      ? activeClasses
                      : "border-primary/15 hover:border-primary/60"
                  }
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

                <span className="text-xs border-2 border-primary/30 rounded-full p-1 leading-5 text-gray-500">{subject.id}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
