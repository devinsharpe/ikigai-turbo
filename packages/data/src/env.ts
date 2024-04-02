import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_AUTH_TOKEN: z.string(),
    DATABASE_URL: z.string()
  },
  runtimeEnv: {
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL
  }
});
