import { CheckEmailVerification } from "@blyp/components/features/authentication/CheckEmailVerification";
import { type PageProps } from "@blyp/utils/page-props";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function VerifyEmailPage(props: PageProps<unknown, { email: string }>) {
  const searchParams = await props.searchParams;

  if (!searchParams?.email) {
    redirect("/auth/login");
  }

  return <CheckEmailVerification email={searchParams.email} />;
}
