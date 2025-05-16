"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@blyp/components/ui/Avatar";
import { Button } from "@blyp/components/ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@blyp/components/ui/Tooltip";
import { SelectUsersSchema } from "@blyp/server/db/schemas/auth";
import { SelectArticlesSchema } from "@blyp/server/db/schemas/blog";
import { load } from "cheerio";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, Clock3, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { z } from "zod";

type ArticleCardProps = {
  article: z.infer<typeof SelectArticlesSchema>;
  author: z.infer<typeof SelectUsersSchema>;
};

export const ArticleCard: FunctionComponent<ArticleCardProps> = ({ article, author }) => {
  const router = useRouter();

  const html = article.content;
  const $ = load(html);

  const firstParagraph = $("p")
    .filter((_, el) => $(el).text().trim() !== "")
    .first()
    .text()
    .trim();

  return (
    <div className="relative h-72 rounded-lg border p-4">
      <header className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src={author.image ?? ""} alt="profile" />
          <AvatarFallback className="bg-indigo-500 text-white">
            {author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <section className="flex w-full items-start justify-between">
          <div className="-space-y-1">
            <p className="font-semibold">{author.name}</p>
            <p className="text-gray-400">{author.email}</p>
          </div>

          <div className="flex items-center gap-1 text-sm tracking-tight text-gray-400">
            <Clock3 className="size-4" />
            {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
          </div>
        </section>
      </header>

      <section className="mt-5 space-y-1">
        <h3 className="line-clamp-2 text-lg">{article.title}</h3>
        <p className="line-clamp-2 text-gray-500 dark:text-gray-400">{firstParagraph}</p>
      </section>

      <footer className="absolute bottom-5 flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              <Bookmark />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bookmark this article</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => router.push(`/blogs/${article.id}`)}>
              <SquareArrowOutUpRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open article</TooltipContent>
        </Tooltip>
      </footer>
    </div>
  );
};
