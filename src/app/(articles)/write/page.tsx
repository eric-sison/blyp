import { WriteArticle } from "@blyp/components/features/editor/WriteArticle";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Write an article",
};

export default function WritePage() {
  return <WriteArticle />;
}
