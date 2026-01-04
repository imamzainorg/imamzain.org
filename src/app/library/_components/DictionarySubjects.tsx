"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface Subject {
  id: string;
  title: string;
  slug: string;
}

interface DictionarySubjectsProps {
  subjects: Subject[];
  collectionSlug: string;
  dictionarySlug: string;
}

export default function DictionarySubjects({
  subjects,
  collectionSlug,
  dictionarySlug,
}: DictionarySubjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

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

    if (atTop || atBottom) {
      return;
    }
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
        <h3 className="font-semibold text-sm text-center text-gray-700 dark:text-gray-200 mb-3">
          الفهرس
        </h3>

        <div className="flex flex-col gap-2">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/library/${collectionSlug}/${dictionarySlug}/${subject.slug}`}
              className="group flex items-center justify-between rounded-lg border border-primary/15 px-3 py-2 hover:border-primary/60 transition"
            >
              <span className="text-sm text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-Muharram_primary">
                {subject.title}
              </span>
              <span className="text-xs text-gray-500 group-hover:text-primary/70 dark:group-hover:text-Muharram_primary/70">
                {subject.id}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
