"use client";

interface Filters {
  speaker: string | null;
}

interface FiltersPanelProps {
  speakers: string[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onClearFilters: () => void;
}

export function FiltersPanel({
  speakers,
  filters,
  setFilters,
}: FiltersPanelProps) {
  const update = (newPart: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newPart }));
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-center bg-white p-4 rounded-2xl border shadow-sm">
        <select
          value={filters.speaker ?? ""}
          onChange={(e) => update({ speaker: e.target.value || null })}
          className="px-4 py-2 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none"
        >
          <option value="">كل المحاضرين</option>
          {speakers
            .filter((s) => s !== "الكل")
            .map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
