"use client";

import { cn } from "@blyp/lib/utils";
import { FileStack, Newspaper, Rss, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent } from "react";

export const ArticleNavigation: FunctionComponent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = searchParams.get("filter");

  return (
    <div>
      <ul className="flex items-center gap-2">
        <li
          className={cn(
            params === "all" && "bg-secondary",
            "hover:bg-secondary flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
          )}
          role="button"
          onClick={() => router.push("/articles?filter=all")}
        >
          <FileStack className="size-5" />
          Feed
        </li>
        <li
          className={cn(
            params === "following" && "bg-secondary",
            "hover:bg-secondary flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
          )}
          role="button"
          onClick={() => router.push("/articles?filter=following")}
        >
          <Users className="size-5" />
          Following
        </li>
      </ul>
    </div>
  );
};
