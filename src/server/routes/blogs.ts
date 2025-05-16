import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { articles, CreateArticleSchema } from "../db/schemas/blog";
import db from "../db/connection";
import { eq } from "drizzle-orm";
import { users } from "../db/schemas/auth";

export const articlesHandler = new Hono()
  .basePath("/articles")
  .get("/", async (c) => {
    const res = await db.select().from(articles).innerJoin(users, eq(users.id, articles.authorId));
    return c.json(res);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const res = await db.select().from(articles).where(eq(articles.authorId, id));

    return c.json(res);
  })
  .post("/", zValidator("json", CreateArticleSchema), async (c) => {
    const article = c.req.valid("json");

    const res = await db.insert(articles).values(article).returning();
    return c.json(res[0]);
  });
