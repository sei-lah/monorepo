import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let db: NodePgDatabase | undefined;

export function getDb(url: string) {
  if (!db) {
    db = drizzle({ client: new Pool({ connectionString: url }) });
  }
  return db;
}
