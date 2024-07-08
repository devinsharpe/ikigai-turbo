import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ID_LENGTH: z.preprocess(
      (val) => parseInt(typeof val === "string" ? val : "12"),
      z.number()
    ),
    STORAGE_ACCESS: z.string(),
    STORAGE_PORT: z.preprocess(
      (val) => parseInt(typeof val === "string" ? val : "5000"),
      z.number()
    ),
    STORAGE_SECRET: z.string(),
    STORAGE_URL: z.string(),
    REDIS_URL: z.string().url()
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ID_LENGTH: process.env.ID_LENGTH,
    STORAGE_ACCESS: process.env.STORAGE_ACCESS,
    STORAGE_PORT: process.env.STORAGE_PORT,
    STORAGE_SECRET: process.env.STORAGE_SECRET,
    STORAGE_URL: process.env.STORAGE_URL,
    REDIS_URL: process.env.REDIS_URL
  }
});
