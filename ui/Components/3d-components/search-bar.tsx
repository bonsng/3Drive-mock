import clsx from "clsx";
import { useShortCutContext } from "@/ui/Components/context/short-cut-context";

export default function SearchBar() {
  const { showSearch } = useShortCutContext();
  return (
    <div
      className={clsx(
        "fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity",
        {
          "opacity-0": !showSearch,
        },
        {
          "opacity-100": showSearch,
        },
      )}
    >
      <input
        type="text"
        placeholder="Search for apps and commands..."
        className="px-4 py-2 text-sm text-gray-300 bg-[#1e1e1e] border border-[#333] rounded shadow-md w-80 outline-none placeholder-gray-500"
      />
    </div>
  );
}
