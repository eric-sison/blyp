"use client";

import { type FunctionComponent } from "react";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export const FollowCard: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div
      role="button"
      className="dark:hover:bg-secondary/40 hover:bg-secondary/50 dark:bg-background flex max-w-80 items-start gap-3 rounded-xl border bg-white p-4 transition-all duration-200 hover:scale-105"
      onClick={() => router.push("/authors")}
    >
      <section className="size-10 shrink-0 rounded-full border border-amber-500/20 bg-amber-500/10 p-2">
        <UserPlus className="size-full text-amber-500" />
      </section>

      <section className="space-y-1">
        <p className="font-semibold">Follow other authors</p>
        <p className="text-primary/80 text-sm">Follow other authors to grow your community.</p>
      </section>
    </div>
  );
};
