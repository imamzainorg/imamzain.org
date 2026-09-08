"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BookCopyIcon, GraduationCapIcon, NewspaperIcon } from "lucide-react";
import StudentResearch   from "./student-research";
import Journals          from "./journals";
import ConferencePapers  from "./conference-papers";
import Breadcrumbs       from "@/components/breadcrumb";
import type { StudentResearch as StudentResearchItem } from "@/types/student";
import type { Journals as JournalsItem } from "@/types/journals";
import type { Research } from "@/types/research";

// ─── أنواع ────────────────────────────────────────────────────────────────────

// بحوث التخرج فقط تصل كخاصية جاهزة من page.tsx (هي التبويب الافتراضي).
// بيانات الدوريات والمؤتمرات كبيرة (journals.json وحده ~730 كيلوبايت) وتخص
// تبويبين لا يظهران إلا عند الطلب، فتُجلب من مسارات API ثابتة عند الحاجة
// فقط بدل شحنها مع كل زيارة بغض النظر عن التبويب الظاهر.
type PlatformData = {
  studentData: StudentResearchItem[];
};

type ActiveView = "student-research" | "conferences" | "journals";
const TABS = [
  { id: "conferences",     icon: NewspaperIcon,     title: "بحوث المؤتمرات" },
  { id: "student-research",icon: GraduationCapIcon, title: "بحوث التخرج"    },
  { id: "journals",        icon: BookCopyIcon,       title: "الدوريات العربية"},
] as const;

// ─── حالة تحميل/خطأ بسيطة لتبويب لم تصل بياناته بعد ───────────────────────────

function TabLoading() {
  return (
    <div className="flex items-center justify-center p-20 text-gray-400">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
      جاري التحميل...
    </div>
  );
}

function TabError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-20 text-gray-400">
      <p>تعذّر تحميل البيانات، تحقق من الاتصال وحاول مرة أخرى.</p>
      <button
        onClick={onRetry}
        className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors dark:bg-Muharram_primary"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}

// ─── PageContent ──────────────────────────────────────────────────────────────

function PageContent({ studentData }: PlatformData) {
  const initialView = (useSearchParams().get("type") as ActiveView) || "student-research";
  const [activeView, setActiveView] = useState<ActiveView>(initialView);

  const [journalsData, setJournalsData] = useState<JournalsItem[] | null>(null);
  const [journalsError, setJournalsError] = useState(false);
  const journalsRequested = useRef(false);

  const [researchData, setResearchData] = useState<Research[] | null>(null);
  const [researchError, setResearchError] = useState(false);
  const researchRequested = useRef(false);

  const loadJournals = useCallback(() => {
    if (journalsRequested.current) return;
    journalsRequested.current = true;
    setJournalsError(false);
    fetch("/api/research-data/journals")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: JournalsItem[]) => setJournalsData(data))
      .catch(() => {
        // نسمح بإعادة المحاولة لاحقاً (زر "إعادة المحاولة"، أو الرجوع لهذا
        // التبويب من جديد).
        journalsRequested.current = false;
        setJournalsError(true);
      });
  }, []);

  const loadResearch = useCallback(() => {
    if (researchRequested.current) return;
    researchRequested.current = true;
    setResearchError(false);
    fetch("/api/research-data/conferences")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: Research[]) => setResearchData(data))
      .catch(() => {
        researchRequested.current = false;
        setResearchError(true);
      });
  }, []);

  // يجلب بيانات التبويب الفعّال أول ما يظهر: سواء وصل الزائر مباشرة برابط
  // يحمل ?type=journals أو ?type=conferences (من صفحة /research)، أو بدّل
  // التبويب يدوياً من داخل الصفحة نفسها.
  useEffect(() => {
    if (activeView === "journals") loadJournals();
    if (activeView === "conferences") loadResearch();
  }, [activeView, loadJournals, loadResearch]);

  return (
    <div className="p-6 container">
      <h1 className="sr-only">المنصة العلمية للبحوث</h1>

      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية",    url: "/" },
          { name: "بوابة البحث العلمي", url: "/research" },
        ]}
      />
      {/* ── Tab switcher ── */}
      <div className=" flex flex-wrap justify-center items-center gap-4 mt-6 mb-12">
        {TABS.map((tab) => {
          const isActive = activeView === tab.id;
          return (
            <motion.div
              key={tab.id}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              <button
                onClick={() => setActiveView(tab.id as ActiveView)}
                className={`
                  group relative flex items-center justify-center gap-3
                  px-6 py-3 h-14 rounded-xl font-medium text-note
                  shadow-lg border transition-all duration-300 overflow-hidden
                  ${isActive
                    ? "bg-primary text-white border-primary dark:bg-Muharram_primary dark:border-Muharram_secondary  "
                    : "bg-primary/15 text-primary hover:border-primary dark:hover:border-black  dark:text-white dark:bg-Muharram_primary/50 border-transparent"
                  }
                `}
              >
                {/* shine overlay */}
                <span className={`
                  absolute inset-0
                  bg-gradient-to-r from-secondary/0 via-primary/20 to-secondary/0
                  dark:from-Muharram_secondary/50 dark:vai-Muharram_primary dark:to-Muharram_secondary/20
                  opacity-0 group-hover:opacity-100 blur-lg
                  transition duration-500
                  ${isActive ? "opacity-100" : ""}
                `} />

                <span className="relative z-10 flex items-center gap-3">
                  <tab.icon size={20} />
                  {tab.title}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>
      {/* ── المحتوى ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {activeView === "conferences" &&
            (researchData ? (
              <ConferencePapers data={researchData} />
            ) : researchError ? (
              <TabError onRetry={loadResearch} />
            ) : (
              <TabLoading />
            ))}
          {activeView === "student-research" && <StudentResearch  data={studentData} />}
          {activeView === "journals" &&
            (journalsData ? (
              <Journals data={journalsData} />
            ) : journalsError ? (
              <TabError onRetry={loadJournals} />
            ) : (
              <TabLoading />
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlatformClient(props: PlatformData) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-20 text-gray-400">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
        جاري التحميل...
      </div>
    }>
      <PageContent {...props} />
    </Suspense>
  );
}
