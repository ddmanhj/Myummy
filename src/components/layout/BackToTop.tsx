import { useLayoutContext } from "@/context";
import { useScrollEvent } from "@/hooks";
import { cn } from "@/utils";
import { useEffect } from "react";
import { LuChevronUp, LuMoon, LuSun } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const BackToTop = () => {
  const { scrollY } = useScrollEvent();
  const { pathname } = useLocation();

  const { themeMode, updateTheme } = useLayoutContext();

  const toggleThemeMode = () => {
    updateTheme(themeMode == "light" ? "dark" : "light");
  };

  useEffect(() => {
    window?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="fixed bottom-18 end-5 z-10 flex flex-col items-center rounded-full bg-primary/25 lg:bottom-5">
      <button
        className={cn(
          "z-10 flex w-8 items-center justify-center transition-all duration-500",
          scrollY >= 72 ? "h-8" : "h-0 translate-y-5 opacity-0"
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <LuChevronUp size={20} className="mt-1 text-primary-500" />
      </button>
      <button
        className="z-20 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
        onClick={toggleThemeMode}
      >
        {themeMode == "dark" ? <LuSun size={20} /> : <LuMoon size={20} />}
      </button>
    </div>
  );
};

export default BackToTop;
