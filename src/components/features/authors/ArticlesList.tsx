"use client";

import { SelectArticlesSchema } from "@blyp/server/db/schemas/blog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FunctionComponent } from "react";
import { z } from "zod";
import { ArticleCard } from "./ArticleCard";
import { load } from "cheerio";
import { SelectUsersSchema } from "@blyp/server/db/schemas/auth";

type Result = {
  articles: z.infer<typeof SelectArticlesSchema>;
  users: z.infer<typeof SelectUsersSchema>;
};

export const ArticlesList: FunctionComponent = () => {
  const { data } = useQuery({
    queryKey: ["get-all-articles"],
    queryFn: async () => {
      const res = await axios.get<Result[]>(`${process.env.NEXT_PUBLIC_HOST}/api/articles`);
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-2 items-stretch gap-5 pt-5 pb-40">
      {data?.map(({ articles, users }, index) => {
        return (
          <div key={index}>
            <ArticleCard article={articles} author={users} />
          </div>
        );
      })}
    </div>
  );
};
