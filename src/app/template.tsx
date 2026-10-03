"use client";

import { usePathname } from "next/navigation";
import Layouts from "@/layouts";

// Routes that render standalone, without the site header/footer or page transition
const STANDALONE_ROUTES = ["/links"];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (STANDALONE_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Layouts>
      {/* The route change itself is animated by <RouteProgress /> in the root layout. This wrapper
          only fades the new page in (see .page-enter in globals.css). It is plain CSS,
          not framer-motion: Next remounts this template on every route, so an AnimatePresence in
          here never gets to play an exit. */}
      <div className="page-enter">{children}</div>
    </Layouts>
  );
}
