import { serve } from "@hono/node-server";
import { app } from "#server/app";

serve(app, (info) => console.log(`server up @${info.port}`));
