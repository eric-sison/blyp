import { SignupForm } from "@blyp/components/features/authentication/SignupForm";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default function RegistrationPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignupForm className="w-[calc(var(--spacing)*110)]" />
    </div>
  );
}
