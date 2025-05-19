"use client";

import { RichTextEditor } from "@blyp/components/features/editor/RichTextEditor";
import { Button } from "@blyp/components/ui/Button";
import { ScrollArea } from "@blyp/components/ui/ScrollArea";
import { authClient } from "@blyp/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { type FunctionComponent, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "@blyp/components/ui/LoadingSpinner";
import { toast } from "sonner";
import { SuccessToast } from "@blyp/components/ui/SuccessToast";
import { useRouter } from "next/navigation";

export const WriteArticle: FunctionComponent = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  // const [subTitle, setSubTitle] = useState("");

  const { data } = authClient.useSession();
  const router = useRouter();

  const onChange = (content: string) => {
    setContent(content);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-article"],
    mutationFn: async () => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/articles`, {
        content,
        title,
        // subTitle,
        authorId: data?.user.id,
      });

      return res.data;
    },
    onSuccess: () => {
      router.push("/");
      toast.custom(() => (
        <SuccessToast
          title="Article successfully published"
          description="You may now view the article you just published."
        />
      ));
    },
  });

  return (
    <div className="relative flex h-full w-full justify-center overflow-hidden py-5">
      <Link
        href="/"
        className="text-primary/70 hover:text-primary absolute top-7 left-10 flex items-center gap-2 font-medium"
      >
        <ArrowLeft className="size-5" />
        Back to home
      </Link>

      <div className="absolute top-7 right-10 flex items-center justify-between">
        <div className="space-x-2 pr-4">
          <Button
            className="bg-indigo-500 text-white hover:bg-indigo-400"
            disabled={content === "" || title === "" || isPending}
            onClick={() => mutate()}
          >
            {isPending ? <LoadingSpinner /> : "Publish"}
          </Button>
        </div>
      </div>

      <ScrollArea className="h-full max-w-4xl pt-10">
        <div className="mb-2 space-y-4">
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title..."
              className="w-full px-2 py-2 text-4xl font-bold tracking-normal outline-0"
            />
            {/* <input
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Add Subtitle..."
              className="text-primary/70 w-full px-2 py-2 text-2xl font-semibold tracking-wide outline-0"
            /> */}
          </div>
        </div>

        <RichTextEditor content={content} onChange={onChange} />
      </ScrollArea>
    </div>
  );
};
