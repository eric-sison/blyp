"use client";

import { useState, type FunctionComponent } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Alert, AlertDescription } from "@blyp/components/ui/Alert";
import { authClient } from "@blyp/lib/auth-client";
import { toast } from "sonner";
import { SuccessToast } from "@blyp/components/ui/SuccessToast";
import Link from "next/link";

type CheckEmailVerificationProps = {
  email: string;
};

export const CheckEmailVerification: FunctionComponent<CheckEmailVerificationProps> = ({ email }) => {
  const [isPending, setIsPending] = useState(false);

  const handleResendVerification = async () => {
    await authClient.sendVerificationEmail(
      {
        email,
        callbackURL: "/",
      },

      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          setIsPending(false);
          toast.custom(() => (
            <SuccessToast
              title="Verify email"
              description="A verification link was sent to your email to complete the registration process."
            />
          ));
        },
        onError: (ctx) => {
          setIsPending(false);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="relative flex h-full flex-col items-center pt-60">
      <Link
        href="/auth/login"
        className="text-primary/50 hover:text-primary absolute top-30 left-96 flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="size-5" />
        Go back to Sign in
      </Link>

      <section className="flex w-96 flex-col items-center gap-4">
        <div className="size-16 rounded-full border border-green-200 bg-green-100/70 p-4 dark:border-none dark:bg-green-50/10">
          <MailCheck className="size-full text-green-500" />
        </div>

        <h1 className="text-3xl tracking-wide">Check your email</h1>
        <p className="text-primary/50 text-center">
          We sent a verification link to your email. Please check to complete your registration process.
        </p>
      </section>
      <section className="absolute top-5">
        <Alert variant="default" className="text-left">
          <AlertDescription>
            If you don&apos;t see the email in your inbox, please check your spam folder or request another
            reset link.
          </AlertDescription>
        </Alert>
      </section>
      <footer className="mt-30">
        Did&apos;t receive email?{" "}
        <button disabled={isPending} onClick={handleResendVerification}>
          {isPending ? (
            <span className="text-primary/50">Resending...</span>
          ) : (
            <span className="text-indigo-500 underline underline-offset-2">Resend</span>
          )}
        </button>
      </footer>
    </div>
  );
};
