"use client";

import { FunctionComponent } from "react";
import { NewBlogCard } from "./NewBlogCard";
import { FollowCard } from "./FollowCard";
import { ArticleFeedCard } from "./ArticleFeedCard";

export const DashboardCards: FunctionComponent = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Build your community</h3>
      <div className="mt-4 space-y-16">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <ArticleFeedCard />
          </div>

          <div className="col-span-1">
            <NewBlogCard />
          </div>

          <div className="col-span-1">
            <FollowCard />
          </div>
        </div>
      </div>
    </div>
  );
};
