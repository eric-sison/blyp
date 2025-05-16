"use client";

import { type FunctionComponent } from "react";
import { BookCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export const ArticleFeedCard: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div
      role="button"
      className="dark:hover:bg-secondary/40 hover:bg-secondary/50 dark:bg-background flex max-w-80 items-start gap-3 rounded-xl border bg-white p-4 transition-all duration-200 hover:scale-105"
      onClick={() => router.push("/articles?filter=all")}
    >
      <section className="size-10 shrink-0 rounded-full border border-rose-500/20 bg-rose-500/10 p-2">
        <BookCheck className="size-full text-rose-500" />
      </section>

      <section className="space-y-1">
        <p className="font-semibold">Read articles</p>
        <p className="text-primary/80 text-sm">Stay updated with the latest posts and trends.</p>
      </section>
    </div>
  );
};
