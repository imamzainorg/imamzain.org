"use client";

import { useRef, useState } from "react";
import FilterChips from "@/components/filter-chips";
import Pagination from "@/components/pagination";
import { PostTile } from "@/components/post-cards";
import { Post } from "@/types/post";

const categories = ["الكل", "نشاطات", "فعاليات", "مجالس", "العتبة الحسينية"] as const;
type Category = (typeof categories)[number];

const PER_PAGE = 12;

export default function ArchivesClient({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<Category>("الكل");
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered =
    category === "الكل"
      ? posts
      : posts.filter((post) => post.category === category);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const options = categories.map((key) => ({
    key,
    label: key,
    count:
      key === "الكل"
        ? posts.length
        : posts.filter((post) => post.category === key).length,
  }));

  const changePage = (next: number) => {
    setPage(next);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-16">
      <FilterChips
        label="تصنيف الأخبار"
        options={options}
        value={category}
        onChange={(next) => {
          setCategory(next);
          setPage(1);
        }}
      />

      <ul
        ref={listRef}
        className="mt-10 grid scroll-mt-40 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((post) => (
          <li key={post.id}>
            <PostTile post={post} />
          </li>
        ))}
      </ul>

      <Pagination
        className="mt-14"
        page={page}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </div>
  );
}
