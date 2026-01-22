import { getDb } from "@pkg/db/connection";
import { ENV } from "#env";

export const db = getDb(ENV.DATABASE_URL);
