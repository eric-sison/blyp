import { ThemeToggler } from "@blyp/components/features/theme/ThemeToggler";
import { cn } from "@blyp/lib/utils";
import { type PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div
      className={cn(
        "absolute inset-0",
        "[background-size:20px_20px]",
        "[background-image:radial-gradient(rgba(212,212,212,0.6)_1px,transparent_1px)]",
        "dark:[background-image:radial-gradient(rgba(64,64,64,0.25)_1px,transparent_1px)]",
      )}
    >
      <div className="dark:bg-background pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-20 h-full">
        <div className="absolute top-5 left-5 z-20">
          <ThemeToggler align="start" />
        </div>
        {children}
      </div>
    </div>
  );
}
