"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import Layouts from "@/layouts";

const pageVariants: Variants = {
  hidden: {
    opacity: 1,
    y: 80,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 1,
    y: -20,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Routes that render standalone, without the site header/footer or page transition
const STANDALONE_ROUTES = ["/links"];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (STANDALONE_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Layouts>
      <AnimatePresence mode="wait">
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
