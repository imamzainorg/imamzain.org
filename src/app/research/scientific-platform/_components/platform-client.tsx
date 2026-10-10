"use client";

import { Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ConferencePapers from "./conference-papers";
import TranslatedResearchList from "./translated-research";
import Breadcrumbs from "@/components/breadcrumb";
import FilterChips from "@/components/filter-chips";
import PageHeader from "@/components/page-header";
import type { Research } from "@/types/research";
import type { TranslatedResearch } from "@/types/translated-research";

type ActiveView = "student-research" | "conferences" | "journals";
const TABS = [
  { id: "conferences", title: "بحوث المؤتمرات" },
  { id: "student-research", title: "بحوث التخرج" },
  { id: "journals", title: "الدوريات العربية" },
] as const;

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

// Journals and conference papers are big (journals.json alone is ~730 KB) and live on tabs
// most visitors never open, so they are fetched from static API routes the first time their
// tab shows instead of shipping with every visit. A failed request can be retried.
function useTabData<T>(url: string, active: boolean) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const requested = useRef(false);

  const load = useCallback(() => {
    if (requested.current) return;
    requested.current = true;
    setError(false);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((json: T) => setData(json))
      .catch(() => {
        requested.current = false;
        setError(true);
      });
  }, [url]);

  useEffect(() => {
    if (active) load();
  }, [active, load]);

  return { data, error, load };
}

function TabData<T>({
  tab,
  children,
}: {
  tab: ReturnType<typeof useTabData<T>>;
  children: (data: T) => ReactNode;
}) {
  if (tab.data) return children(tab.data);
  return tab.error ? <TabError onRetry={tab.load} /> : <TabLoading />;
}

function PageContent({ studentData }: { studentData: TranslatedResearch[] }) {
  const initialView = (useSearchParams().get("type") as ActiveView) || "student-research";
  const [activeView, setActiveView] = useState<ActiveView>(initialView);
  // Graduation research is the default tab, so it arrives with the page.
  const journals = useTabData<TranslatedResearch[]>("/api/research-data/journals", activeView === "journals");
  const conferences = useTabData<Research[]>("/api/research-data/conferences", activeView === "conferences");

  return (
    <div className="container pb-12">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "بوابة البحث العلمي", url: "/research" },
          { name: "المنصة العلمية للبحوث", url: "#" },
        ]}
      />

      <PageHeader
        title="المنصة العلمية للبحوث"
        text="أرشيف بحثي يضم بحوث المؤتمرات وبحوث تخرّج البكالوريوس والماجستير والدكتوراه والدوريات العربية حول الإمام زين العابدين عليه السلام، مع بحث وتصفية وتحميل البحوث."
        className="mb-16"
      />

      <FilterChips
        className="mb-12"
        label="نوع البحوث"
        options={TABS.map((tab) => ({ key: tab.id, label: tab.title }))}
        value={activeView}
        onChange={setActiveView}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {activeView === "conferences" && (
            <TabData tab={conferences}>{(data) => <ConferencePapers data={data} />}</TabData>
          )}
          {activeView === "student-research" && <TranslatedResearchList variant="student" data={studentData} />}
          {activeView === "journals" && (
            <TabData tab={journals}>{(data) => <TranslatedResearchList variant="journals" data={data} />}</TabData>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function PlatformClient(props: { studentData: TranslatedResearch[] }) {
  return (
    <Suspense fallback={<TabLoading />}>
      <PageContent {...props} />
    </Suspense>
  );
}
