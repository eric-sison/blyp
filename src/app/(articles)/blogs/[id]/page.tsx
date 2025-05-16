import { GoBack } from "@blyp/components/features/editor/GoBack";
import { HtmlRenderer } from "@blyp/components/features/editor/HtmlRenderer";
import { ThemeToggler } from "@blyp/components/features/theme/ThemeToggler";
import { auth } from "@blyp/lib/auth";
import db from "@blyp/server/db/connection";
import { users } from "@blyp/server/db/schemas/auth";
import { articles } from "@blyp/server/db/schemas/blog";
import { PageProps } from "@blyp/utils/page-props";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ReadArticle(props: PageProps<{ id: string }>) {
  const param = await props.params;

  if (!param?.id) {
    redirect("/");
  }

  const data = await auth.api.getSession({ headers: await headers() });

  try {
    const res = await db
      .select()
      .from(articles)
      .innerJoin(users, eq(users.id, articles.authorId))
      .where(eq(articles.id, param.id));

    return (
      <div className="relative my-10 flex h-screen w-full justify-center">
        {data?.session && (
          <div className="absolute top-0 left-50">
            <GoBack />
          </div>
        )}

        <div className="absolute top-0 right-50">
          <ThemeToggler />
        </div>
        <HtmlRenderer
          content={res[0].articles.content}
          title={res[0].articles.title}
          image={res[0].users.image}
          date={res[0].articles.createdAt}
          name={res[0].users.name}
        />
      </div>
    );
  } catch (error) {
    redirect("/");
  }
}
