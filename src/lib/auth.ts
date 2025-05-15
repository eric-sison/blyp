import db from "@blyp/server/db/connection";
import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { accounts, sessions, users, verifications } from "@blyp/server/db/schemas/auth";
import { resend } from "./resend";
import env from "./env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      users,
      accounts,
      verifications,
      sessions,
    },
  }),

  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },

  trustedOrigins: [env.BETTER_AUTH_URL],

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [openAPI()],

  advanced: {
    database: {
      generateId: false,
    },
    cookiePrefix: "blyp",
    useSecureCookies: process.env.NODE_ENV === "production" ? true : false,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 mins
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: `blyp Support <${env.RESEND_SENDER_MAIL}>`,
        to: user.email,
        subject: "Reset Password",
        html: `<p>Click this <a href=${url}>link</a> to reset your password.</p>`,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const callbackUrl = new URL(url);
      callbackUrl.searchParams.set("callbackURL", "/on-boarding");

      await resend.emails.send({
        from: `blyp Support <${env.RESEND_SENDER_MAIL}>`,
        to: user.email,
        subject: "Account Verification",
        html: `<p>Click this <a href=${callbackUrl}>link</a> to verify your email.</p>`,
      });
    },
  },
});

export type ServerSession = typeof auth.$Infer.Session;
