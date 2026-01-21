import { getDb } from "@pkg/db/connection";
import { campaignTable } from "@pkg/db/schemas/campaign";
import { ENV } from "#env";

const db = getDb(ENV.DATABASE_URL);
const result = await db.select().from(campaignTable);

// biome-ignore lint/suspicious/noConsole: example
console.dir(result);
