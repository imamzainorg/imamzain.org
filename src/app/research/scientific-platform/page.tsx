"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BookCopyIcon, GraduationCapIcon, NewspaperIcon } from "lucide-react";
import StudentResearch   from "./_components/student-research";
import Journals          from "./_components/journals";
import ConferencePapers  from "./_components/conference-papers";
import Breadcrumbs       from "@/components/breadcrumb";

// ─── أنواع ────────────────────────────────────────────────────────────────────

type ActiveView = "student-research" | "conferences" | "journals";
const TABS = [
  { id: "conferences",     icon: NewspaperIcon,     title: "بحوث المؤتمرات" },
  { id: "student-research",icon: GraduationCapIcon, title: "بحوث التخرج"    },
  { id: "journals",        icon: BookCopyIcon,       title: "الدوريات العربية"},
] as const;

// ─── PageContent ──────────────────────────────────────────────────────────────

function PageContent() {
  const initialView = (useSearchParams().get("type") as ActiveView) || "student-research";
  const [activeView, setActiveView] = useState<ActiveView>(initialView);

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
          {activeView === "conferences"      && <ConferencePapers />}
          {activeView === "student-research" && <StudentResearch  />}
          {activeView === "journals"         && <Journals         />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-20 text-gray-400">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
        جاري التحميل...
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
