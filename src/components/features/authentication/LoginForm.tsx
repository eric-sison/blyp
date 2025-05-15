"use client";

import { type ComponentPropsWithoutRef, type FunctionComponent, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@blyp/components/ui/Form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@blyp/components/ui/Card";
import { LoadingSpinner } from "@blyp/components/ui/LoadingSpinner";
import { Button } from "@blyp/components/ui/Button";
import { PasswordInput } from "@blyp/components/ui/PasswordInput";
import { Input } from "@blyp/components/ui/Input";
import { LoginSchema } from "./auth-schema";
import { GoogleLogo } from "./GoogleLogo";
import { GithubLogo } from "./GithubLogo";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@blyp/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@blyp/lib/utils";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { ErrorToast } from "@blyp/components/ui/ErrorToast";

export const LoginForm: FunctionComponent<ComponentPropsWithoutRef<"div">> = ({ className, ...props }) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: z.infer<typeof LoginSchema>) => {
    await authClient.signIn.email(credentials, {
      onRequest: () => {
        setIsPending(true);
      },
      onSuccess: () => {
        setIsPending(false);
        router.push("/");
      },
      onError: (ctx) => {
        setIsPending(false);
        loginForm.resetField("password");
        loginForm.setFocus("password");

        toast.custom(() => (
          <ErrorToast
            title={ctx.error.message}
            description="  Make sure you have the correct credentials, or that your account has already been verified."
          />
        ));
      },
    });
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider: provider,
      scopes: ["openid", "profile", "email"],
      callbackURL: "/",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-background rounded-2xl shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-1">
            <Image src="/blyp_logo.svg" alt="logo" height={40} width={40} />
          </CardTitle>
          <CardDescription>Welcome to Blyp!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form className="grid gap-6" onSubmit={loginForm.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignIn("google")}
                >
                  <GoogleLogo />
                  Continue with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignIn("github")}
                >
                  <GithubLogo className="dark:invert" />
                  Continue with Github
                </Button>
              </div>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <FormControl>
                        <Input id="email" placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          tabIndex={-1}
                          href="/auth/forgot-password"
                          className="ml-auto text-xs underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput id="password" placeholder="At least 8 characters" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <LoadingSpinner className="size-5" /> : <>Login</>}
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account yet?{" "}
                <Link href="/auth/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <footer className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs tracking-wide text-balance">
        By logging in or signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </footer>
    </div>
  );
};
