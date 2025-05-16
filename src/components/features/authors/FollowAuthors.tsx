"use client";

import { SelectUsersSchema } from "@blyp/server/db/schemas/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type FunctionComponent } from "react";
import { z } from "zod";
import { AuthorsCard } from "./AuthorsCard";
import { authClient } from "@blyp/lib/auth-client";
import { ScrollArea } from "@blyp/components/ui/ScrollArea";

export const FollowAuthors: FunctionComponent = () => {
  const { data } = authClient.useSession();

  const { data: authors } = useQuery({
    queryKey: ["get-authors", data?.user.id],
    queryFn: async () => {
      if (data) {
        const res = await axios.get<z.infer<typeof SelectUsersSchema>[]>(
          `${process.env.NEXT_PUBLIC_HOST}/api/authors/follow/${data.user.id}`,
        );
        return res.data;
      }
    },
    enabled: !!data?.user, // <-- key line
  });

  if (authors) {
    return (
      <ScrollArea className="mb-10 p-4">
        <div className="space-y-4">
          {authors.map((author, index) => (
            <AuthorsCard key={index} author={author} />
          ))}
          {authors.map((author, index) => (
            <AuthorsCard key={index} author={author} />
          ))}
          {authors.map((author, index) => (
            <AuthorsCard key={index} author={author} />
          ))}
          {authors.map((author, index) => (
            <AuthorsCard key={index} author={author} />
          ))}
          {authors.map((author, index) => (
            <AuthorsCard key={index} author={author} />
          ))}
          {authors.map((author, index) => (
            <AuthorsCard key={index} author={author} />
          ))}
          {authors.map((author, index) => (
            <AuthorsCard key={index} author={author} />
          ))}
          {authors.map((author, index) => (
            <AuthorsCard key={index} author={author} />
          ))}
        </div>
      </ScrollArea>
    );
  }
};
