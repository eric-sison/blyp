import { Hono } from "hono";
import db from "../db/connection";
import { users } from "../db/schemas/auth";
import { eq, not } from "drizzle-orm";

export const authorsHandler = new Hono().get("/authors/follow/:id", async (c) => {
  const id = c.req.param("id");

  const res = await db
    .select()
    .from(users)
    .where(not(eq(users.id, id)));
  return c.json(res);
});
