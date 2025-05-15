import env from "@blyp/lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schemas/*.ts",
  out: "./src/server/db/migrations",
  dbCredentials: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME!,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  },
});
