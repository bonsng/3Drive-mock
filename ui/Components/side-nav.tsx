import clsx from "clsx";
import { useShowNavContext } from "@/ui/Components/context/nav-context";
import { useShortCutContext } from "@/ui/Components/context/short-cut-context";

const contents: string[] = ["Home", "Trash", "Search"];
const SideNav = () => {
  const { showNav } = useShowNavContext();
  return (
    <nav>
      <div
        className={clsx("fixed top-0 left-5 h-full z-50 transition-transform", {
          "animate-slide-in-left": showNav,
        })}
      >
        <div className="fixed flex flex-col h-full items-center justify-center">
          {contents.map((v, idx) => (
            <Dot content={v} view={idx} key={idx}></Dot>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Dot = ({ content, view }: { content: string; view: number }) => {
  const { setViewState, setToDefault, viewState, toDefault, setShowNav } =
    useShowNavContext();
  const { setShowSearch } = useShortCutContext();
  const selected = view === viewState;
  return (
    <div
      className={clsx(
        "relative w-2 h-2 rounded-2xl my-5 transition-colors cursor-pointer flex justify-start items-center duration-300",
        {
          "text-white": selected, // 선택된 경우 하얀색
          "text-gray-500 hover:text-white": !selected, // 기본 회색, 호버 시 하얀색
        },
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (viewState === 0 && selected) {
          setToDefault(!toDefault);
        } else if (view === 2) {
          setShowSearch(true);
          setShowNav(false);
        } else {
          setViewState(view);
        }
      }}
    >
      <p className="transition-opacity duration-300">{content}</p>
    </div>
  );
};

export default SideNav;
