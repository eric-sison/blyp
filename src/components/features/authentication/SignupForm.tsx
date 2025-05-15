"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@blyp/components/ui/Form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@blyp/components/ui/Card";
import { Input } from "@blyp/components/ui/Input";
import { Button } from "@blyp/components/ui/Button";
import { LoadingSpinner } from "@blyp/components/ui/LoadingSpinner";
import { ComponentProps, useState, type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "./auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@blyp/lib/utils";
import { z } from "zod";
import { authClient } from "@blyp/lib/auth-client";
import { toast } from "sonner";
import { Checkbox } from "@blyp/components/ui/Checkbox";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@blyp/components/ui/Label";
import { PasswordInput } from "@blyp/components/ui/PasswordInput";
import Image from "next/image";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@blyp/components/ui/Popover";
import { SuccessToast } from "@blyp/components/ui/SuccessToast";

export const SignupForm: FunctionComponent<ComponentProps<"div">> = ({ className, ...props }) => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const signupForm = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      agree: false,
    },
  });

  const onSubmit = async (info: z.infer<typeof SignUpSchema>) => {
    await authClient.signUp.email(info, {
      onRequest: () => {
        setIsPending(true);
      },
      onSuccess: async () => {
        setIsPending(false);
        signupForm.reset();
        router.push(`/auth/verify-email?email=${info.email}`);

        toast.custom(() => (
          <SuccessToast
            title="Verify email"
            description="A verification link was sent to your email to complete the registration process."
          />
        ));
      },
      onError: (ctx) => {
        setIsPending(false);
        signupForm.resetField("password");
        signupForm.setFocus("password");
        toast.error(ctx.error.message);
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-background shadow-none">
        <CardHeader className="">
          <CardTitle className="flex items-end gap-1">
            <Image src="/blyp_logo.svg" alt="logo" height={30} width={30} />
            <h1 className="text-xl">Create an account</h1>
          </CardTitle>
          <CardDescription>Join our community!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signupForm}>
            <form className="grid gap-6" onSubmit={signupForm.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field, formState }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="name">Full name</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder="John Doe" {...field} />
                      </FormControl>

                      {formState.errors.name ? (
                        <FormMessage className="text-xs" />
                      ) : (
                        <FormDescription className="text-xs">Please indicate your full name.</FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field, formState }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormControl>
                        <Input id="username" placeholder="johndoe" {...field} />
                      </FormControl>

                      {formState.errors.username ? (
                        <FormMessage className="text-xs" />
                      ) : (
                        <FormDescription className="text-xs">Your unique social handle.</FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field, formState }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <FormControl>
                        <Input id="email" placeholder="m@example.com" {...field} />
                      </FormControl>

                      {formState.errors.email ? (
                        <FormMessage className="text-xs" />
                      ) : (
                        <FormDescription className="text-xs">
                          Make sure to use an active email.
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field, formState }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex gap-1.5">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Popover>
                          <PopoverTrigger tabIndex={-1}>
                            <Info className="size-4" />
                            <PopoverContent align="start" className="space-y-2">
                              <ul className="space-y-1">
                                <li>At least 8 characters in length.</li>
                                <li>At least 1 uppercase letter.</li>
                                <li>At least 1 lowercase letter.</li>
                                <li>At least 1 number.</li>
                                <li>At least 1 special character.</li>
                              </ul>
                            </PopoverContent>
                          </PopoverTrigger>
                        </Popover>
                      </div>
                      <FormControl>
                        <PasswordInput id="password" placeholder="At least 8 characters" {...field} />
                      </FormControl>
                      {formState.errors.password ? (
                        <FormMessage className="text-xs" />
                      ) : (
                        <FormDescription className="text-xs">
                          Please choose a strong password.
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-1 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          id="agree"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="aria-invalid:ring-ring/50 dark:aria-invalid:ring-ring/50 aria-invalid:border-input"
                        />
                      </FormControl>
                      <div className="leading-none">
                        <Label htmlFor="agree">
                          I agree to the
                          <Link
                            href="#"
                            className="hover:border-b-primary border-b border-b-transparent pt-0.5"
                          >
                            terms and conditions.
                          </Link>
                        </Label>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isPending || !signupForm.watch("agree")}>
                  {isPending ? <LoadingSpinner className="size-5" /> : <>Signup</>}
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
};
