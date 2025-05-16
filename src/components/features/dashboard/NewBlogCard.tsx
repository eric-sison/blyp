"use client";

import { type FunctionComponent } from "react";
import { PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";

export const NewBlogCard: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div
      role="button"
      className="dark:hover:bg-secondary/40 hover:bg-secondary/50 dark:bg-background flex max-w-80 items-start gap-3 rounded-xl border bg-white p-4 transition-all duration-200 hover:scale-105"
      onClick={() => router.push("/write")}
    >
      <section className="size-10 shrink-0 rounded-full border border-indigo-500/20 bg-indigo-500/10 p-2">
        <PencilLine className="size-full text-indigo-500" />
      </section>

      <section className="space-y-1">
        <p className="font-semibold">Write an article</p>
        <p className="text-primary/80 text-sm">Share your thoughts with the community.</p>
      </section>
    </div>
  );
};
