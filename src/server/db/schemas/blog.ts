import { generateCuid } from "@blyp/lib/cuid";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const articles = pgTable("articles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateCuid()),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  subTitle: text("sub_title"),
  content: text("content").notNull(),
  coverPhoto: text("cover_photo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const comments = pgTable("comments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateCuid()),
  commentorId: text("author_id")
    .notNull()
    .references(() => users.id),
  articleId: text("article_id")
    .notNull()
    .references(() => articles.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const CreateArticleSchema = createInsertSchema(articles);
export const SelectArticlesSchema = createSelectSchema(articles);
