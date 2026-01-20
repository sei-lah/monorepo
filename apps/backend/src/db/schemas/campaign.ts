import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const campaignTable = pgTable("campaigns", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 80 }).notNull(),
  discord_channel_id: varchar({ length: 255 }).notNull(),
  active: boolean().default(true).notNull(),
});
