"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function PageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-24 md:px-8 md:pb-28 md:pt-28"
    >
      {children}
    </motion.div>
  );
}
