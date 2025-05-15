"use client";

import { Separator } from "@blyp/components/ui/Separator";
import { type FunctionComponent } from "react";
import { NoRecentBlogCard } from "./NoRecentBlogCard";

export const YourBlogs: FunctionComponent = () => {
  return (
    <div className="space-y-7">
      <section className="space-y-1">
        <h3 className="text-lg font-semibold">Your blogs</h3>
        <p className="text-primary/50 mb-5 text-lg">Your recently published articles will show up here.</p>
      </section>

      <NoRecentBlogCard />
    </div>
  );
};
