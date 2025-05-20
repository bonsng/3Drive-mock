import { useShortCutContext } from "@/ui/Components/context/short-cut-context";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import useDebounce from "@/ui/Components/hooks/use-debounce";
import { useFileTree } from "@/ui/Components/context/file-tree-context";

export default function SearchBar() {
  const { showSearch } = useShortCutContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchQuery } = useFileTree();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <AnimatePresence>
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 "
        >
          <input
            ref={inputRef}
            type="search"
            placeholder="Search for apps and commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-6 py-3 text-md text-gray-300 bg-[#1e1e1e] border border-[#333] rounded shadow-md w-96 outline-none placeholder-gray-500"
          />
          {/*<div className="flex text-xs text-gray-400 mt-1 justify-end">*/}
          {/*  *연관도가 높은 결과는 가깝게, 낮은 결과는 멀리 나타납니다.*/}
          {/*</div>*/}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
