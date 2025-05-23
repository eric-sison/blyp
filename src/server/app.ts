import { Hono } from "hono";
import { healthcheckHandler } from "./routes/healthcheck";
import { articlesHandler } from "./routes/blogs";
import { auth } from "@blyp/lib/auth";
import { cors } from "hono/cors";
import env from "@blyp/lib/env";
import { authorsHandler } from "./routes/authors";

function createApp() {
  const app = new Hono().basePath("/api");

  app.use(
    cors({
      origin: [env.BETTER_AUTH_URL],
      allowMethods: ["POST", "GET", "OPTIONS"],
      maxAge: 600,
      credentials: true,
    }),
  );

  app.on(["POST", "GET"], "/auth/**", (c) => {
    return auth.handler(c.req.raw);
  });

  const routes = [healthcheckHandler, articlesHandler, authorsHandler] as const;

  routes.forEach((route) => app.route("/", route));

  return app;
}

const app = createApp();

export default app;
