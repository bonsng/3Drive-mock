import clsx from "clsx";
import { useShowNavContext } from "@/ui/Components/context/nav-context";
import { useShortCutContext } from "@/ui/Components/context/short-cut-context";
import { contents } from "@/lib/side-nav-contents";
import React from "react";

const SideNav = () => {
  const { showNav } = useShowNavContext();
  return (
    <nav>
      <div
        className={clsx("fixed top-0 left-5 h-full z-40 transition-transform", {
          "animate-slide-in-left": showNav,
        })}
      >
        <div className="fixed flex flex-col h-full items-start justify-center">
          {contents.map((v, idx) => (
            <Dot content={v} view={idx} key={idx}></Dot>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Dot = ({
  content,
  view,
}: {
  content: { label: string; icon: React.ReactNode };
  view: number;
}) => {
  const {
    setViewState,
    setToDefault,
    viewState,
    toDefault,
    setShowNav,
    setIsTrash,
  } = useShowNavContext();
  const { setShowSearch } = useShortCutContext();
  const selected = view === viewState;
  return (
    <div
      className={clsx(
        "relative my-5 ml-4 transition-colors cursor-pointer flex justify-start items-center duration-300",
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
          setViewState(view);
        } else if (view === 1) {
          setViewState(view);
          setIsTrash(true);
        } else {
          setViewState(view);
          setTimeout(() => setIsTrash(false), 500);
        }
      }}
    >
      {content.icon}

      <p className={clsx("ml-3 transition-opacity duration-300")}>
        {content.label}
      </p>
    </div>
  );
};

export default SideNav;
