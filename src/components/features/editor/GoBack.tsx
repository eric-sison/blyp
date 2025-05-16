"use client";

import { type FunctionComponent } from "react";
import { Button } from "@blyp/components/ui/Button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const GoBack: FunctionComponent = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" size="sm" onClick={() => router.back()}>
      <ArrowLeft />
      Go back
    </Button>
  );
};
