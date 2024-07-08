import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./index.js";
import path from "path";

console.log(
  "migrations",
  path.resolve(import.meta.dirname, "..", "migrations")
);
console.log("schema", path.resolve(import.meta.dirname, "schema"));

migrate(db, {
  migrationsFolder: path.resolve(import.meta.dirname, "..", "migrations"),
  migrationsSchema: path.resolve(import.meta.dirname, "schema")
});
