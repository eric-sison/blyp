"use client";

import { FileType2 } from "lucide-react";
import { type FunctionComponent } from "react";

export const NoRecentBlogCard: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl p-7">
      <section className="flex flex-col items-center gap-2">
        <FileType2 className="dark:text-muted size-20 text-gray-200" />
        <p className="dark:text-muted text-2xl font-bold text-gray-200 select-none">No recent articles</p>
      </section>
    </div>
  );
};
