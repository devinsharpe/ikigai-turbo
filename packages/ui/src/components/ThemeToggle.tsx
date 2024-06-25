"use client";

import { ComputerIcon, MoonIcon, SunIcon, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Button, { ButtonTheme } from "./Button";

type Theme = "system" | "light" | "dark";

const themeOptions: {
  theme: Theme;
  component: LucideIcon;
}[] = [
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onToggle?: (theme: Theme) => void | Promise<void>;
}

export default function ThemeToggle(props: ThemeToggleProps) {
  const [themeIndex, setThemeIndex] = useState(0);
  const systemTheme = useMediaWatcher();

  const handleToggle = () => {
    const index = themeIndex + 1 === themeOptions.length ? 0 : themeIndex + 1;
    setThemeIndex(index);
    localStorage.setItem("theme", themeOptions[index]!.theme);
    if (props.onToggle) props.onToggle(themeOptions[index]!.theme);
  };

  const CurrentIcon = useMemo(() => {
    if (themeOptions[themeIndex]) return themeOptions[themeIndex]!.component;
    else return null;
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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme)
      setThemeIndex(
        themeOptions.findIndex((theme) => theme.theme === storedTheme)
      );
  }, []);

  return (
    <Button theme={ButtonTheme.Ghost} {...props} onClick={handleToggle}>
      {CurrentIcon && <CurrentIcon />}
    </Button>
  );
}
