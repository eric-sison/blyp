import { LoginForm } from "@blyp/components/features/authentication/LoginForm";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in to Blyp",
};

export default function LoginPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoginForm className="w-[calc(var(--spacing)*100)]" />
    </div>
  );
}
