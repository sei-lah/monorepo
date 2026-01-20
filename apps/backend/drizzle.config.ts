import "varlock/auto-load";
import { defineConfig } from "drizzle-kit";
import { ENV } from "varlock";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schemas/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
});
