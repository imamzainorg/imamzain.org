import { HeadphonesIcon } from "./Icons";

interface HeroSectionProps {
  filteredCount: number;
}

export function HeroSection({ filteredCount }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-emerald-900 via-emerald-800 to-teal-700 text-white mb-6 p-6 md:p-8 shadow-xl">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
            <HeadphonesIcon />
            المكتبة الصوتية
          </h1>
          <p className="text-emerald-100/80 text-sm">
            استمع وتأمل في أشهر المحاضرات والدروس
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
          <span className="text-sm font-medium">
            {filteredCount} محتوى صوتي
          </span>
        </div>
      </div>
    </div>
  );
}
