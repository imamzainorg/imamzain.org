"use client";

import { Building2, Calendar, LayoutGrid, User } from "lucide-react";
import { FilterPanel, FilterSelect } from "@/components/filter-panel";

type Filters = {
  authors: string[];
  publishers: string[];
  years: string[];
  categories: string[];
  conferences: string[];
};

type FilterSidebarProps = {
  filters: Filters;
  author: string;
  setAuthor: (val: string) => void;
  publisher: string;
  setPublisher: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  conferences: string;
  setConferences: (val: string) => void;
  reset: () => void;
};

export default function FilterSidebar({
  filters,
  author,
  setAuthor,
  publisher,
  setPublisher,
  category,
  setCategory,
  conferences,
  setConferences,
  reset,
}: FilterSidebarProps) {
  return (
    <FilterPanel onReset={reset}>
      <FilterSelect
        instanceId="category-select"
        icon={<LayoutGrid size={16} />}
        label="الموضوع"
        placeholder="اختر الموضوع..."
        options={filters.categories}
        value={category}
        onChange={setCategory}
      />
      <FilterSelect
        instanceId="author-select"
        icon={<User size={16} />}
        label="المؤلف"
        placeholder="ابحث عن مؤلف..."
        options={filters.authors}
        value={author}
        onChange={setAuthor}
      />
      <FilterSelect
        instanceId="publisher-select"
        icon={<Building2 size={16} />}
        label="دار النشر"
        placeholder="ابحث عن دار نشر..."
        options={filters.publishers}
        value={publisher}
        onChange={setPublisher}
      />
      <FilterSelect
        instanceId="conference-select"
        icon={<Calendar size={16} />}
        label="المهرجانات والمؤتمرات"
        placeholder="ابحث عن مهرجان أو مؤتمر..."
        options={filters.conferences || []}
        value={conferences}
        onChange={setConferences}
      />
    </FilterPanel>
  );
}
