import { useShortCutContext } from "@/ui/Components/context/short-cut-context";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import useDebounce from "@/ui/Components/hooks/use-debounce";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { useShowNavContext } from "@/ui/Components/context/nav-context";

export default function SearchBar() {
  const { showPreSearch, setShowSearch, setShowPreSearch, showSearch } =
    useShortCutContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setViewState } = useShowNavContext();
  const { setSearchQuery } = useFileTree();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (showPreSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPreSearch]);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query && showPreSearch) {
      // TODO: trigger desired action here
      // ShowSearch -> True
      // set view to searchView
      setShowSearch(true);
      setShowPreSearch(false);
      setViewState(3);
    }
  };

  return (
    <AnimatePresence>
      {(showPreSearch || showSearch) && (
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
            onKeyDown={handleKeyDown}
            className="px-6 py-3 text-md text-gray-300 bg-[#1e1e1e] border border-[#333] rounded shadow-md w-96 outline-none placeholder-gray-500"
          />
          <div className="flex text-xs text-gray-50 mt-1 justify-end">
            {showPreSearch
              ? "*검색 결과만 보려면 Enter를 누르세요"
              : "*전체 파일 구조로 돌아가려면 Esc를 누르세요"}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
