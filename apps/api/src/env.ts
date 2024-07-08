import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
(await import("dotenv")).config();

export const env = createEnv({
  server: {
    API_PORT: z.preprocess(
      (val) => parseInt(typeof val === "string" ? val : "5000"),
      z.number(),
    ),
    APP_KEY: z.string(),
    DATABASE_URL: z.string().url(),
    ENVIRONMENT: z.enum(["dev", "test", "prod"]).default("prod"),
  },
  runtimeEnv: {
    API_PORT: process.env.API_PORT,
    APP_KEY: process.env.APP_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
});
