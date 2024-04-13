import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import tailwindForms from "@tailwindcss/forms";

const config: Pick<Config, "content" | "darkMode" | "presets" | "plugins"> = {
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/layouts/**/*.tsx",
    "../../packages/ui/**/*.tsx",
  ],
  darkMode: ["selector", '[data-mode="dark"]'],
  presets: [sharedConfig],
  plugins: [tailwindForms()],
};

export default config;
