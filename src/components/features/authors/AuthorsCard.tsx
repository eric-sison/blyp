"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@blyp/components/ui/Avatar";
import { Button } from "@blyp/components/ui/Button";
import { SelectUsersSchema } from "@blyp/server/db/schemas/auth";
import { UserPlus } from "lucide-react";
import { type FunctionComponent } from "react";
import { z } from "zod";

type AuthorsCardProps = {
  author: z.infer<typeof SelectUsersSchema>;
};

export const AuthorsCard: FunctionComponent<AuthorsCardProps> = ({ author }) => {
  return (
    <div className="w-[calc(var(--spacing)*120)] rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <Avatar className="size-12">
          <AvatarImage src={author.image ?? ""} />
          <AvatarFallback className="bg-indigo-500 text-xl font-medium text-white">
            {author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full items-center justify-between">
          <section>
            <p className="text-lg">{author.name}</p>
            <p className="text-gray-400">{author.email}</p>
          </section>

          <section>
            <Button variant="outline" size="sm">
              <UserPlus />
              Follow
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};
