import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "../env.js";

export const client = createClient({
  url: env.DATABASE_URL,
  tls: false
});

export const db = drizzle(client);

export * from "./schema/index.js";
