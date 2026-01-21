import { getDb } from "@pkg/db/connection";
import { campaignTable } from "@pkg/db/schemas/campaign";
import { ENV } from "varlock";
import "varlock/auto-load";

const db = getDb(ENV.DATABASE_URL);
const result = await db.select().from(campaignTable);

console.dir(result);
