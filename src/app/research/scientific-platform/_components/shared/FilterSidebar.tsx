"use client";
import { useState, ReactNode } from "react";
import Select from "react-select";
import { Button } from "@/components/button";
import { User, Building2, Calendar, LayoutGrid } from "lucide-react";
import { SingleValue } from "react-select";

/* ================= TYPES ================= */

type Filters = Record<string, string[]>;

type FilterSidebarWrapperProps = {
  filters: Filters;
  filterValues: Record<string, string>;
  onFilterChange: (key: string, val: string) => void;
  reset: () => void;
  horizontal?: boolean;
};

/* ================= MAIN COMPONENT ================= */

export default function FilterSidebarWrapper({
  filters,
  filterValues,
  onFilterChange,
  reset,
  horizontal = false,
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
    bg-white rounded-t-2xl p-4
    transition-transform duration-300

    ${mobileFilterOpen ? "translate-y-0" : "translate-y-full"}

    lg:sticky
    lg:top-28
    lg:self-start
    lg:translate-y-0
    lg:w-full
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
          <div
            className={
              horizontal
                ? "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-1"
            }
          >
            {getOrderedFilterKeys(filters).map((key) => {
              const meta = keyMeta(key);
              return (
                <FilterSelect
                  key={key}
                  instanceId={`${key}-select`}
                  icon={meta.icon}
                  label={meta.label}
                  placeholder={meta.placeholder}
                  options={filters[key] || []}
                  value={filterValues?.[key] ?? ""}
                  onChange={(v: string) => onFilterChange(key, v)}
                />
              );
            })}
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

function keyMeta(key: string): {
  label: string;
  icon: ReactNode;
  placeholder: string;
} {
  const k = key.toLowerCase();
  if (k.includes("author")) {
    return {
      label: "المؤلف",
      icon: <User size={16} className="hidden md:inline" />,
      placeholder: "ابحث عن مؤلف...",
    };
  }
  if (k.includes("conf")) {
    return {
      label: "المؤتمر",
      icon: <Calendar size={16} className="hidden md:inline" />,
      placeholder: "ابحث عن مهرجان أو مؤتمر...",
    };
  }
  if (k.includes("year") || k.includes("years") || k.includes("published")) {
    return {
      label: "سنة النشر",
      icon: <Calendar size={16} className="hidden md:inline" />,
      placeholder: "كل السنوات",
    };
  }
  if (
    k.includes("pub") ||
    k.includes("publisher") ||
    k.includes("publication")
  ) {
    return {
      label: "الناشر",
      icon: <Building2 size={16} className="hidden md:inline" />,
      placeholder: "ابحث عن دار نشر...",
    };
  }
  if (k.includes("cat") || k.includes("topic") || k.includes("category")) {
    return {
      label: "التصنيف العلمي",
      icon: <LayoutGrid size={16} className="hidden md:inline" />,
      placeholder: "اختر التصنيف العلمي...",
    };
  }

  return {
    label: key,
    icon: <LayoutGrid size={16} className="hidden md:inline" />,
    placeholder: "اختر...",
  };
}

function getOrderedFilterKeys(filters: Filters) {
  const keys = Object.keys(filters).filter(
    (k) => (filters[k] || []).length > 0,
  );
  const order = [
    "category",
    "categories",
    "topic",
    "author",
    "authors",
    "publicationvenue",
    "publication",
    "publisher",
    "publishers",
    "publishedyear",
    "year",
    "years",
    "conference",
    "conferences",
  ];
  return keys.sort((a, b) => {
    const la = a.toLowerCase();
    const lb = b.toLowerCase();
    const ia = order.findIndex((o) => la.includes(o));
    const ib = order.findIndex((o) => lb.includes(o));
    const va = ia === -1 ? 999 : ia;
    const vb = ib === -1 ? 999 : ib;
    return va - vb;
  });
}
