import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .min(5, { message: "Email field must be at least 5 characters." }),
  password: z.string().min(8, { message: "Password field requires at least 8 characters." }),
});

export const SignUpSchema = z.object({
  name: z.string().min(5, { message: "Name field must be at least 5 characters." }),
  username: z.string().optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .min(5, { message: "Email field must be at least 5 characters." }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100)
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least 1 number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character."),
  agree: z.boolean(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export const ResetPasswordSchema = z
  .object({
    password: SignUpSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });
