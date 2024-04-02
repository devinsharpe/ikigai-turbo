import { migrate } from "drizzle-orm/libsql/migrator";
import db from "./index.js";

migrate(db, {
  migrationsFolder: "./migrations/",
  migrationsSchema: "./schema/*"
});
