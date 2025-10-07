import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "./button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toggleTheme } from "@/store/slices/theme-slice";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const onToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative"
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
