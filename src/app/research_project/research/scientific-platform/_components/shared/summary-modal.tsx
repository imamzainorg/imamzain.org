"use client";

import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, User, Calendar, Download } from "lucide-react";
import type { CardData } from "./research-card";

interface SummaryModalProps {
  item: CardData | null;
  onClose: () => void;
}

export function SummaryModal({ item, onClose }: SummaryModalProps) {
  return (
    <AnimatePresence mode="wait">
      {item && (
        <Dialog open onClose={onClose} className="relative z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
            onClick={onClose}
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 16 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative w-full max-w-3xl"
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                  {/* Header */}
                  <div className="px-7 pt-7 pb-5 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary shrink-0">
                          <FileText size={18} />
                        </span>
                        <div className="min-w-0">
                          <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                            {item.title}
                          </Dialog.Title>
                          {(item.author || item.publishedYear) && (
                            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                              {item.author && (
                                <>
                                  <User size={13} /> {item.author}
                                </>
                              )}
                              {item.publishedYear && (
                                <>
                                  <span className="mx-1 opacity-40">·</span>
                                  <Calendar size={13} />
                                  {item.publishedYear}
                                </>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="إغلاق"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-7 py-6 max-h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <div
                      className="prose text-subtitle prose-base dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:font-bold"
                      // safe: abstract comes from trusted static JSON
                      dangerouslySetInnerHTML={{ __html: item.abstract ?? "" }}
                    />
                  </div>

                  {/* Footer */}
                  {item.pdfUrl && (
                    <div className="px-7 py-5 bg-gray-50/60 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20"
                      >
                        <Download size={16} />
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
