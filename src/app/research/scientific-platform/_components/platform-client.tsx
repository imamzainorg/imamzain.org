"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import StudentResearch   from "./student-research";
import Journals          from "./journals";
import ConferencePapers  from "./conference-papers";
import Breadcrumbs       from "@/components/breadcrumb";
import FilterChips       from "@/components/filter-chips";
import PageHeader        from "@/components/page-header";
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
  { id: "conferences",      title: "بحوث المؤتمرات" },
  { id: "student-research", title: "بحوث التخرج" },
  { id: "journals",         title: "الدوريات العربية" },
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
    <div className="container pb-12">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية",    url: "/" },
          { name: "بوابة البحث العلمي", url: "/research" },
          { name: "المنصة العلمية للبحوث", url: "#" },
        ]}
      />

      <PageHeader
        title="المنصة العلمية للبحوث"
        text="أرشيف بحثي يضم بحوث المؤتمرات وبحوث تخرّج البكالوريوس والماجستير والدكتوراه والدوريات العربية حول الإمام زين العابدين عليه السلام، مع بحث وتصفية وتحميل البحوث."
        className="mb-16"
      />

      {/* ── Tab switcher ── */}
      <FilterChips
        className="mb-12"
        label="نوع البحوث"
        options={TABS.map((tab) => ({ key: tab.id, label: tab.title }))}
        value={activeView}
        onChange={(id) => setActiveView(id as ActiveView)}
      />
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
