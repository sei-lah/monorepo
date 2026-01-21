import process from "node:process";
import { cleanEnv, str } from "envalid";

export const ENV = cleanEnv(process.env, {
  DATABASE_URL: str({ default: "postgres://postgres:postgres@localhost:5432/api" }),
});
