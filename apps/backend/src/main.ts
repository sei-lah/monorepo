import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.text("Hello Node.js!"));

// app.get("/daniel", (c) => {
//   const test = true;
//   return c.text(`Hello Daniel, ${test}`);
// });

// app.post("/yolo", async (c) => {
//   const body = await c.req.json();
//   console.dir(body);
//   return c.json({ ok: true });
// });

serve(app, (info) => console.log(`server up @${info.port}`));
