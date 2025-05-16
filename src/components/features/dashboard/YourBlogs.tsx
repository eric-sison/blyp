"use client";

import { type FunctionComponent } from "react";
import { NoRecentBlogCard } from "./NoRecentBlogCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { SelectArticlesSchema } from "@blyp/server/db/schemas/blog";
import { load } from "cheerio";
import { Avatar, AvatarFallback, AvatarImage } from "@blyp/components/ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import { Clock3, PenLine, SquareArrowOutUpRight } from "lucide-react";
import { Separator } from "@blyp/components/ui/Separator";
import { Button } from "@blyp/components/ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@blyp/components/ui/Tooltip";
import { useRouter } from "next/navigation";

type YourBlogsProps = {
  id: string;
  image?: string;
  name: string;
  email: string;
};

export const YourBlogs: FunctionComponent<YourBlogsProps> = ({ id, image, name, email }) => {
  const router = useRouter();

  const { data: posts } = useQuery({
    queryKey: ["get-all-articles-by-author"],
    queryFn: async () => {
      const res = await axios.get<z.infer<typeof SelectArticlesSchema>[]>(
        `${process.env.NEXT_PUBLIC_HOST}/api/articles/${id}`,
      );

      return res.data;
    },
  });

  return (
    <div className="w-full space-y-7 pb-10">
      <section className="space-y-1">
        <h3 className="text-lg font-semibold">Your blogs</h3>
        <p className="text-primary/50 mb-5 text-lg">Your recently published articles will show up here.</p>
      </section>

      {posts && posts?.length > 0 ? (
        <div className="grid grid-cols-2 gap-7">
          {posts.map((post, index) => {
            const html = post.content;
            const $ = load(html);

            const firstParagraph = $("p")
              .filter((_, el) => $(el).text().trim() !== "")
              .first()
              .text()
              .trim();

            return (
              <div
                key={index}
                className="dark:hover:bg-secondary/20 hover:bg-secondary/50 space-y-5 rounded-lg border p-4 transition-colors"
              >
                <header className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={image} alt="profile" />
                    <AvatarFallback className="bg-indigo-500 text-white">
                      {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <section className="flex w-full items-start justify-between">
                    <div className="-space-y-1">
                      <p className="font-semibold">{name}</p>
                      <p className="text-gray-400">{email}</p>
                    </div>

                    <div className="flex items-center gap-1 text-sm tracking-tight text-gray-400">
                      <Clock3 className="size-4" />
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </div>
                  </section>
                </header>

                <section className="space-y-2">
                  <h3 className="line-clamp-2 text-2xl">{post.title}</h3>
                  <p className="line-clamp-2 text-gray-500 dark:text-gray-400">{firstParagraph}</p>
                </section>

                <Separator />

                <footer className="flex items-center justify-between">
                  <Button variant="outline" className="space-x-4 rounded-full" size="sm">
                    <PenLine />
                    Update
                  </Button>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="secondary" onClick={() => router.push(`/blogs/${post.id}`)}>
                        <SquareArrowOutUpRight />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Open article</TooltipContent>
                  </Tooltip>
                </footer>
              </div>
            );
          })}
        </div>
      ) : (
        <NoRecentBlogCard />
      )}
    </div>
  );
};
