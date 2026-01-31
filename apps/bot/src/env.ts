import process from "node:process";
import { cleanEnv, num, str, url } from "envalid";

export const ENV = cleanEnv(process.env, {
  DISCORD_CLIENT_ID: str(),
  DISCORD_CLIENT_TOKEN: str(),
  LOG_LEVEL: str({
    choices: ["trace", "debug", "info", "warn", "error", "fatal"],
    default: "trace",
  }),
  DEV_SERVER: str(),
  CATEGORY: str({ default: "Campanhas de RPG" }),
  URL_API: url({ default: "http://localhost:3000" }),
  URL_SHEET: url({ default: "https://localhost:4000" }),
  SHEET_URL_TIMEOUT: num({ default: 30 }),
});
