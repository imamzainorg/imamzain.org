"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import Layouts from "@/layouts";

// Opacity-only cross-fade between routes. No transforms: a full-page translate
// re-animates the whole document on every load and stacks on top of each
// section's own entrance motion, which reads as the page "loading twice".
const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Layouts>
      {/* initial={false} skips the enter animation on first paint so the page
          renders immediately at its final position; only route changes fade. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Layouts>
  );
}
