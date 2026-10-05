"use client";

import { useState, type ReactNode } from "react";
import Select, { type SingleValue } from "react-select";
import { Building2, Calendar, LayoutGrid, User, type LucideIcon } from "lucide-react";
import { Button } from "@/components/button";
import type {
  BookFilterKey,
  BookFilterOptions,
  BookFilterValues,
} from "../_lib/book-filters";

type FilterSidebarProps = {
  options: BookFilterOptions;
  values: BookFilterValues;
  onChange: (key: BookFilterKey, value: string) => void;
  reset: () => void;
};

const FILTER_FIELDS: Array<{
  key: BookFilterKey;
  label: string;
  placeholder: string;
  Icon: LucideIcon;
}> = [
  { key: "category", label: "الموضوع", placeholder: "اختر الموضوع...", Icon: LayoutGrid },
  { key: "author", label: "المؤلف", placeholder: "ابحث عن مؤلف...", Icon: User },
  { key: "publisher", label: "دار النشر", placeholder: "ابحث عن دار نشر...", Icon: Building2 },
  {
    key: "conferences",
    label: "المهرجانات والمؤتمرات",
    placeholder: "ابحث عن مهرجان أو مؤتمر...",
    Icon: Calendar,
  },
];

export default function FilterSidebar({
  options,
  values,
  onChange,
  reset,
}: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleReset() {
    reset();
    setIsMobileOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="
          lg:hidden
          fixed bottom-4 right-4 z-50
          bg-primary dark:bg-Muharram_secondary  text-white
          px-4 py-2 rounded-full
          shadow-lg
          flex items-center gap-2
        "
      >
        فلترة
      </button>

      <div
        className={`
          fixed inset-0 bg-black/40 z-40
          transition-opacity
          ${isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          lg:hidden
        `}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={`
          fixed bottom-0 left-0 right-0 z-40
          bg-white 
          rounded-t-2xl
          p-4
          transition-transform
          ${isMobileOpen ? "translate-y-0" : "translate-y-full"}
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
         dark:lg:bg-Muharram_secondary/10
            rounded-2xl
            p-6 
            space-y-5
            border border-gray-200
            shadow-md
          "
        >
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-sm text-gray-500 mb-2"
          >
            ✕ إغلاق
          </button>

          <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-1">
            {FILTER_FIELDS.map(({ key, label, placeholder, Icon }) => (
              <FilterSelect
                key={key}
                instanceId={`${key}-select`}
                icon={<Icon size={16} className="hidden md:inline" />}
                label={label}
                placeholder={placeholder}
                options={options[key]}
                value={values[key]}
                onChange={(value) => onChange(key, value)}
              />
            ))}
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              className="
                w-full
                hover:bg-red-50
                hover:text-red-600
                hover:border-red-500
             
                dark:bg-gray-100
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

type FilterSelectProps = {
  instanceId: string;
  icon?: ReactNode;
  label: string;
  placeholder: string;
  options?: string[];
  value: string;
  onChange: (value: string) => void;
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
      <label
        htmlFor={instanceId}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-black"
      >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </label>
      <Select
        instanceId={instanceId}
        inputId={instanceId}
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
        options={options.map((option) => ({ value: option, label: option }))}
        value={value ? { value, label: value } : null}
        onChange={(option: SingleValue<{ value: string; label: string }>) =>
          onChange(option ? option.value : "")
        }
        classNamePrefix="react-select"
      />
    </div>
  );
}
