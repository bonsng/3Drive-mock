import { useShortCutContext } from "@/ui/Components/context/short-cut-context";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function SearchBar() {
  const { showSearch } = useShortCutContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <AnimatePresence>
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for apps and commands..."
            className="px-4 py-2 text-sm text-gray-300 bg-[#1e1e1e] border border-[#333] rounded shadow-md w-80 outline-none placeholder-gray-500"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
