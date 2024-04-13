"use client";

import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

export enum ButtonTheme {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
  Outline = "outline",
  Ghost = "ghost",
  Link = "link"
}

export enum ButtonSize {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Icon = "icon"
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: ButtonSize;
  theme?: ButtonTheme;
}

const ButtonThemeStyles = {
  base: "inline-flex gap-2 rounded relative focus:outline-none focus:ring data-[loading=true]:text-transparent",
  [ButtonTheme.Primary]: {
    base: "bg-black dark:bg-white text-white dark:text-zinc-800 shadow-inner drop-shadow ",
    hover: "hover:bg-zinc-900 dark:hover:bg-zinc-100",
    focus:
      "focus:bg-zinc-800 dark:focus:bg-zinc-200 focus:ring-zinc-800/50 dark:focus:ring-white/50",
    loading: "text-white dark:text-zinc-800"
  },
  [ButtonTheme.Secondary]: {
    base: "bg-zinc-400 dark:bg-zinc-600 text-zinc-800 dark:text-zinc-200 shadow-inner drop-shadow ",
    hover: "hover:bg-zinc-500 dark:hover:bg-zinc-700",
    focus:
      "focus:bg-zinc-200 dark:focus:bg-zinc-200 focus:ring-zinc-800/50 dark:focus:ring-white/50",
    loading: "text-zinc-800 dark:text-zinc-200"
  },
  [ButtonTheme.Danger]: {
    base: "bg-black dark:bg-white text-white dark:text-zinc-800 shadow-inner drop-shadow ",
    hover: "hover:bg-zinc-200 dark:hover:bg-zinc-800",
    focus:
      "focus:bg-zinc-200 dark:focus:bg-zinc-200 focus:ring-zinc-800/50 dark:focus:ring-white/50",
    loading: "text-white dark:text-zinc-800"
  },
  [ButtonTheme.Outline]: {
    base: "border border-zinc-300 dark:border-zinc-400",
    hover:
      "hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500",
    focus:
      "focus:bg-zinc-100 dark:focus:bg-zinc-700 focus:ring-zinc-800/25 dark:focus:ring-white/50",
    loading: "text-zinc-800 dark:text-zinc-200"
  },
  [ButtonTheme.Ghost]: {
    base: "",
    hover:
      "hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500",
    focus:
      "focus:bg-zinc-100 dark:focus:bg-zinc-700 focus:ring-zinc-800/25 dark:focus:ring-white/50",
    loading: "text-zinc-800 dark:text-zinc-200"
  },
  [ButtonTheme.Link]: {
    base: "bg-black dark:bg-white text-white dark:text-zinc-800 shadow-inner drop-shadow ",
    hover: "hover:bg-zinc-200 dark:hover:bg-zinc-800",
    focus:
      "focus:bg-zinc-200 dark:focus:bg-zinc-200 focus:ring-zinc-800/50 dark:focus:ring-white/50",
    loading: "text-zinc-800 dark:text-zinc-200"
  },
  [ButtonSize.Sm]: "px-2 py-1",
  [ButtonSize.Md]: "px-3 py-2",
  [ButtonSize.Lg]: "px-4 py-3",
  [ButtonSize.Icon]: "h-10 w-10 items-center justify-center"
};

export default function Button({
  className = "",
  loading = false,
  size = ButtonSize.Md,
  theme = ButtonTheme.Primary,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        ButtonThemeStyles.base,
        ButtonThemeStyles[theme].base,
        ButtonThemeStyles[theme].hover,
        ButtonThemeStyles[theme].focus,
        ButtonThemeStyles[size],
        className
      )}
      data-loading={loading}
    >
      <span>{children}</span>
      {loading && (
        <Spinner
          className={twMerge(
            "absolute left-50 top-50",
            ButtonThemeStyles[theme].loading
          )}
        />
      )}
    </button>
  );
}
