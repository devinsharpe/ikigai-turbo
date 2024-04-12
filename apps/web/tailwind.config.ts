import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import tailwindForms from "@tailwindcss/forms";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.tsx",
    "../../packages/ui/**/*.tsx",
  ],
  presets: [sharedConfig],
  plugins: [tailwindForms()],
};

export default config;
