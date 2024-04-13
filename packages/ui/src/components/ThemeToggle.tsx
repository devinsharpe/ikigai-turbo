"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Button, { ButtonTheme } from "./Button";
import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react";

const themeOptions = [
  { theme: "system", component: ComputerIcon },
  { theme: "light", component: SunIcon },
  { theme: "dark", component: MoonIcon }
];

function useMediaWatcher() {
  const media = useRef<MediaQueryList | null>(null);
  const [matchesDarkMode, setMatchesDarkMode] = useState(false);

  const handleMediaChange = (event: MediaQueryListEvent) => {
    setMatchesDarkMode(event.matches);
  };

  useEffect(() => {
    media.current = window.matchMedia("(prefers-color-scheme: dark)");
    media.current.addEventListener("change", handleMediaChange);
    setMatchesDarkMode(media.current.matches);

    return () => {
      if (media.current)
        media.current.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return matchesDarkMode ? "dark" : "light";
}

interface ThemeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ThemeToggle(props: ThemeToggleProps) {
  const [themeIndex, setThemeIndex] = useState(0);
  const systemTheme = useMediaWatcher();

  const handleToggle = () => {
    if (themeIndex + 1 === themeOptions.length) setThemeIndex(0);
    else setThemeIndex(themeIndex + 1);
  };

  const CurrentIcon = useMemo(() => {
    return themeOptions[themeIndex]!.component;
  }, [themeIndex]);

  useEffect(() => {
    let theme = themeOptions[themeIndex]!.theme;
    if (theme === "system") {
      theme = systemTheme;
    }
    const el = document.querySelector("html");
    if (!el) return;
    el.setAttribute("data-mode", theme);
  }, [systemTheme, themeIndex]);

  return (
    <Button theme={ButtonTheme.Ghost} {...props} onClick={handleToggle}>
      <CurrentIcon />
    </Button>
  );
}
