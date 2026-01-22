import { Hono } from "hono";
import { campaginsRoute } from "#routes/campaigns";

const app = new Hono();

app.route("campaigns", campaginsRoute);

export { app };
