"use client";

import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Calendar, Download } from "lucide-react";
import type { CardData } from "./research-card";

interface SummaryModalProps {
  item: CardData | null;
  onClose: () => void;
}

export function SummaryModal({ item, onClose }: SummaryModalProps) {
  return (
    <AnimatePresence>
      {item && (
        <Dialog open onClose={onClose} className="relative z-50">
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="w-full max-w-2xl"
              >
                <div className="
                  bg-white dark:bg-gray-900 rounded-3xl overflow-hidden
                  border border-gray-100 dark:border-gray-800 shadow-2xl
                ">
                  {/* header */}
                  <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Dialog.Title className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                          {item.title}
                        </Dialog.Title>
                        <div className="flex items-center flex-wrap gap-3 mt-2 text-xs text-gray-400">
                          {(item.author ?? item.authors?.join("، ")) && (
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {item.author ?? item.authors?.join("، ")}
                            </span>
                          )}
                          {item.publishedYear && (
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {item.publishedYear}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        aria-label="إغلاق"
                        className="
                          shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                          text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
                          hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                        "
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* body */}
                  <div className="
                    px-6 py-5 max-h-[55vh] overflow-y-auto
                    scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700
                  ">
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none
                        prose-p:text-gray-600 dark:prose-p:text-gray-300
                        prose-p:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.abstract ?? "" }}
                    />
                  </div>

                  {/* footer */}
                  {item.pdfUrl && (
                    <div className="
                      px-6 py-4
                      bg-gray-50/60 dark:bg-gray-800/40
                      border-t border-gray-100 dark:border-gray-800
                      flex justify-end
                    ">
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                          bg-primary text-white text-sm font-semibold
                          hover:bg-primary/90 active:scale-95 transition-all
                          shadow-sm shadow-primary/20
                        "
                      >
                        <Download size={15} />
                        تحميل PDF
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
