import { sValidator } from "@hono/standard-validator";
import {
  CreateCampaignSchema,
  campaignTable,
  UpdateCampaignSchema,
} from "@pkg/db/schemas/campaign";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "#server/db";

const campaginsRoute = new Hono();

campaginsRoute.post(
  "",
  sValidator("json", CreateCampaignSchema, (v, ctx) => {
    if (!v.success) {
      ctx.status(400);
      return ctx.json({
        ok: false,
        message: v.error.map((e) => `[${e.path?.toString() ?? ""}]: ${e.message}`).join(", "),
      });
    }
    return;
  }),
  async (ctx) => {
    const content = await ctx.req.json<CreateCampaignSchema>();
    try {
      const existe = await db.select().from(campaignTable).where(eq(campaignTable.id, content.id));
      if (existe.length === 1) {
        ctx.status(409);
        return ctx.json({ ok: false, message: `campanha com id ${content.id} ja existente` });
      }
      await db.insert(campaignTable).values({ name: content.name, id: content.id });
      return ctx.json({ ok: true });
    } catch (_err) {
      ctx.status(502);
      return ctx.json({ ok: false, message: "erro de comunicação com banco de dados" });
    }
  },
);

campaginsRoute.get("", async (ctx) => {
  try {
    const campaigns = await db.select().from(campaignTable);
    return ctx.json(campaigns);
  } catch (_err) {
    ctx.status(502);
    return ctx.json({ ok: false, message: "erro de comunicação com banco de dados" });
  }
});

campaginsRoute.get(":id", async (ctx) => {
  const id = ctx.req.param("id");
  try {
    const campaignSelection = await db.select().from(campaignTable).where(eq(campaignTable.id, id));
    const campaign = campaignSelection[0];
    if (!campaign) {
      ctx.status(404);
      return ctx.json({ ok: false });
    }
    return ctx.json(campaign);
  } catch (_err) {
    ctx.status(502);
    return ctx.json({ ok: false, message: "erro de comunicação com banco de dados" });
  }
});

campaginsRoute.patch(":id", sValidator("json", UpdateCampaignSchema), async (ctx) => {
  const id = ctx.req.param("id");
  const update = await ctx.req.json<UpdateCampaignSchema>();
  try {
    const campaignSelection = await db.select().from(campaignTable).where(eq(campaignTable.id, id));
    const campaign = campaignSelection[0];
    if (!campaign) {
      ctx.status(404);
      return ctx.json({ ok: false, message: `campanha com id ${id} não existe` });
    }
    if (campaign.active && update.active) {
      ctx.status(422);
      return ctx.json({ ok: false, message: `campanha com id ${id} já está ativa` });
    }
    if (!campaign.active) {
      ctx.status(422);
      return ctx.json({
        ok: false,
        message: "campanhas não podem ser alteradas após terem sido concluídas",
      });
    }
    await db.update(campaignTable).set({ active: update.active }).where(eq(campaignTable.id, id));
    return ctx.json({ ok: true });
  } catch (_err) {
    ctx.status(502);
    return ctx.json({ ok: false, message: "erro de comunicação com banco de dados" });
  }
});

export { campaginsRoute };
