import { defineConfig } from "drizzle-kit";
import { ENV } from "./env.ts";

export default defineConfig({
  out: "./src/migrations",
  schema: "./src/schemas/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
});
