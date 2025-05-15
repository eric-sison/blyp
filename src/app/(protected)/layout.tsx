import { MainNav } from "@blyp/components/features/navigation/MainNav";
import { type PropsWithChildren } from "react";

export default function ProtectedLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="h-full w-full">
      <MainNav />
      {children}
    </div>
  );
}
