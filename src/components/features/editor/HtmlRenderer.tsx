"use client";

import { format } from "date-fns";
import { type FunctionComponent } from "react";

type HtmlRendererProps = {
  title: string;
  content: string;
  image: string | null;
  date: Date;
  name: string;
};

export const HtmlRenderer: FunctionComponent<HtmlRendererProps> = ({ content, title, image, date, name }) => {
  return (
    <article className="prose dark:prose-invert prose-img:rounded-full prose-a:text-blue-600">
      <header>
        <h1 className="text-center">{title}</h1>
        <div className="flex flex-col items-center justify-center">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} className="size-12 rounded-full" alt="profile" />
          ) : (
            <div className="mt-10 mb-7 flex size-12 items-center justify-center rounded-full bg-indigo-500 text-2xl font-medium text-white">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex items-center gap-4">
            <span className="block text-gray-400">{name}</span>
            <div className="size-1.5 rounded-full bg-gray-400" />
            <span className="block text-sm text-gray-400">{format(date, "MMM dd, yyyy")}</span>
          </div>
        </div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: content }} className="pb-20 text-justify" />
    </article>
  );
};
