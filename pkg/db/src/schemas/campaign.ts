import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const campaignTable = pgTable("campaigns", {
  id: text().primaryKey(),
  name: varchar({ length: 80 }).notNull(),
  active: boolean().default(true).notNull(),
});

export const CreateCampaignSchema = z.object({
  name: z
    .string()
    .max(80, { error: "nome de campanha não pode ter mais que 80 caracteres" })
    .min(10, { error: "nome de campanha não pode ter menos que 10 caracteres" }),
  id: z.string(),
});
export type CreateCampaignSchema = z.infer<typeof CreateCampaignSchema>;

export const UpdateCampaignSchema = z.object({
  active: z.boolean(),
});
export type UpdateCampaignSchema = z.infer<typeof UpdateCampaignSchema>;
