"use client";
import { useState, ReactNode } from "react";
import Select from "react-select";
import { Button } from "@/components/button";
import { User, Building2, Calendar, LayoutGrid } from "lucide-react";
import { SingleValue } from "react-select";

/* ================= TYPES ================= */

type Filters = {
  authors: string[];
  publishers: string[];
  years: string[];
  categories: string[];
  conferences: string[];
};

type FilterSidebarWrapperProps = {
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

/* ================= MAIN COMPONENT ================= */

export default function FilterSidebarWrapper({
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
}: FilterSidebarWrapperProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleReset = () => {
    reset();
    setMobileFilterOpen(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setMobileFilterOpen(true)}
        className="
          lg:hidden
          fixed bottom-4 right-4 z-50
          bg-primary text-white
          px-4 py-2 rounded-full
          shadow-lg
          flex items-center gap-2
        "
      >
        فلترة
      </button>

      {/* Overlay (Mobile) */}
      <div
        className={`
          fixed inset-0 bg-black/40 z-40
          transition-opacity
          ${mobileFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          lg:hidden
        `}
        onClick={() => setMobileFilterOpen(false)}
      />

      {/* Sidebar / Drawer */}
      <aside
        className={`
          fixed bottom-0 left-0 right-0 z-40
          bg-white
          rounded-t-2xl
          p-4
          transition-transform
          ${mobileFilterOpen ? "translate-y-0" : "translate-y-full"}
          lg:sticky lg:top-28 lg:self-start
          lg:translate-y-0
          lg:w-72
          xl:w-96
          lg:bg-transparent
        `}
      >
        <div
          className="
            lg:bg-secondary/5
            rounded-2xl
            p-6
            space-y-5
            border border-gray-200
            shadow-md
          "
        >
          {/* Mobile Close */}
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="lg:hidden text-sm text-gray-500 mb-2"
          >
            ✕ إغلاق
          </button>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-1">
            <FilterSelect
              instanceId="category-select"
              icon={<LayoutGrid size={16} className="hidden md:inline" />}
              label="الموضوع"
              placeholder="اختر الموضوع..."
              options={filters.categories}
              value={category}
              onChange={setCategory}
            />

            <FilterSelect
              instanceId="author-select"
              icon={<User size={16} className="hidden md:inline" />}
              label="المؤلف"
              placeholder="ابحث عن مؤلف..."
              options={filters.authors}
              value={author}
              onChange={setAuthor}
            />

            <FilterSelect
              instanceId="publisher-select"
              icon={<Building2 size={16} className="hidden md:inline" />}
              label="دار النشر"
              placeholder="ابحث عن دار نشر..."
              options={filters.publishers}
              value={publisher}
              onChange={setPublisher}
            />

            <FilterSelect
              instanceId="conference-select"
              icon={<Calendar size={16} className="hidden md:inline" />}
              label="المهرجانات والمؤتمرات"
              placeholder="ابحث عن مهرجان أو مؤتمر..."
              options={filters.conferences || []}
              value={conferences}
              onChange={setConferences}
            />
          </div>

          {/* Reset */}
          <div className="pt-4">
            <Button
              variant="outline"
              className="
                w-full
                hover:bg-red-50
                hover:text-red-600
                hover:border-red-500
              "
              onClick={handleReset}
            >
              إعادة تعيين الفلاتر
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ================= FILTER SELECT ================= */

type FilterSelectProps = {
  instanceId: string;
  icon?: ReactNode;
  label: string;
  placeholder: string;
  options?: string[];
  value: string;
  onChange: (val: string) => void;
};

export function FilterSelect({
  instanceId,
  icon,
  label,
  placeholder,
  options = [],
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon}
        <span className="hidden md:inline">{label}</span>
      </label>
      <Select
        instanceId={instanceId}
        placeholder={placeholder}
        isClearable
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        menuPosition="fixed"
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menu: (base) => ({
            ...base,
            maxHeight: 300,
            overflowY: "auto",
            wordWrap: "break-word",
          }),
          option: (base) => ({ ...base, whiteSpace: "normal" }),
        }}
        options={(options || []).map((o) => ({ value: o, label: o }))}
        value={value ? { value, label: value } : null}
        onChange={(opt: SingleValue<{ value: string; label: string }>) => {
          onChange(opt ? opt.value : "");
        }}
        classNamePrefix="react-select"
      />
    </div>
  );
}
