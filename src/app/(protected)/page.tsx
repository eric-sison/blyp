import { DashboardCards } from "@blyp/components/features/dashboard/DashboardCards";
import { YourBlogs } from "@blyp/components/features/dashboard/YourBlogs";
import { Separator } from "@blyp/components/ui/Separator";
import { auth } from "@blyp/lib/auth";
import { Sparkles } from "lucide-react";
import { type Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Blyp - Dashboard",
};

export default async function HomePage() {
  const data = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="w-full space-y-14 px-80 py-4">
      <section className="space-y-5">
        <header className="space-y-1">
          <h1 className="flex items-center gap-2">
            <span className="text-3xl font-semibold">Overview</span>
            <div className="text flex items-center gap-1 rounded-sm bg-green-500/20 px-1.5 py-1 text-green-700 dark:bg-green-500/70 dark:text-green-200">
              <Sparkles className="size-3" />
              <p className="text-xs font-semibold">Welcome!</p>
            </div>
          </h1>
          <h3 className="text-primary/70 text-lg">Explore features and begin your journey</h3>
        </header>
        <Separator />
      </section>

      <section className="space-y-14">
        <DashboardCards />
        <YourBlogs
          id={data!.user.id!}
          email={data!.user.email!}
          name={data!.user.name!}
          image={data!.user.image ?? ""}
        />
      </section>
    </div>
  );
}
