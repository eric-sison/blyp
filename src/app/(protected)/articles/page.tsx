import { ArticlesList } from "@blyp/components/features/authors/ArticlesList";
import { GoBack } from "@blyp/components/features/editor/GoBack";
import { ScrollArea } from "@blyp/components/ui/ScrollArea";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "My Feed",
};

export default function Articles() {
  return (
    <div className="relative h-full w-full px-80 py-4">
      <div className="absolute top-0 left-10">
        <GoBack />
      </div>
      <section className="space-y-5">
        <header className="space-y-1">
          <h1 className="flex items-center gap-2">
            <span className="text-3xl font-semibold">My Feed</span>
          </h1>
          <h3 className="text-primary/70 text-lg">List of all articles that you might want to read</h3>
        </header>
      </section>
      <ArticlesList />
    </div>
  );
}
