import { type PropsWithChildren } from "react";
import { ThemeToggler } from "@blyp/components/features/theme/ThemeToggler";
import { auth } from "@blyp/lib/auth";
import { headers } from "next/headers";
import { AvatarDropdown } from "@blyp/components/features/navItems/AvatarDropdown";
import { cn } from "@blyp/lib/utils";
// import Link from "next/link";
// import Image from "next/image";

export default async function ProtectedLayout({ children }: Readonly<PropsWithChildren>) {
  const data = await auth.api.getSession({ headers: await headers() });

  return (
    <div
      className={cn(
        "absolute inset-0",
        "[background-size:20px_20px]",
        "[background-image:radial-gradient(rgba(212,212,212,0.4)_1px,transparent_1px)]",
        "dark:[background-image:radial-gradient(rgba(64,64,64,0.12)_1px,transparent_1px)]",
      )}
    >
      <div className="dark:bg-background pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative h-full w-full">
        <nav className="absolute top-2 flex h-16 w-full items-center justify-end px-10">
          {/* <Link href="/" className="mr-2 flex items-center gap-2 text-xl font-medium">
          <Image src="/blyp_logo.svg" alt="logo" height={35} width={35} />
          <h2>Blyp</h2>
        </Link> */}

          <section className="flex items-center gap-2">
            <ThemeToggler align="end" />
            <AvatarDropdown email={data?.user.email!} name={data?.user.name!} image={data?.user.image!} />
          </section>
        </nav>

        <main className="h-full pt-20">{children}</main>

        {/* <footer className="absolute w-full">
        <div className="dark:bg-secondary/20 bg-secondary/40 flex h-40 flex-col justify-between border-t px-40 py-8">
          <section className="flex items-center justify-between">
            <ul className="flex items-center gap-7">
              <li>
                <Image src="/blyp_logo.svg" alt="logo" height={25} width={25} className="grayscale" />
              </li>

              <li className="text-primary/70 hover:text-primary text-sm font-medium">
                <Link href="/">Home</Link>
              </li>

              <li className="text-primary/70 hover:text-primary text-sm font-medium">
                <Link href="#">Support</Link>
              </li>

              <li className="text-primary/70 hover:text-primary text-sm font-medium">
                <Link href="#">About</Link>
              </li>

              <li className="text-primary/70 hover:text-primary text-sm font-medium">
                <Link href="#">Privacy Policy</Link>
              </li>

              <li className="text-primary/70 hover:text-primary text-sm font-medium">
                <Link href="#">Terms</Link>
              </li>

              <li className="text-primary/70 hover:text-primary text-sm font-medium">
                <Link href="#">Code of Conduct</Link>
              </li>
            </ul>

            <ul className="flex items-center gap-5">
              <li>
                <Link href="#">
                  <Image
                    src="/social/facebook.svg"
                    alt="logo"
                    height={15}
                    width={15}
                    className="dark:invert-50"
                  />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Image src="/social/x.svg" alt="logo" height={15} width={15} className="dark:invert-50" />
                </Link>
              </li>

              <li>
                <Link href="#">
                  <Image
                    src="/social/linkedin.svg"
                    alt="logo"
                    height={15}
                    width={15}
                    className="dark:invert-50"
                  />
                </Link>
              </li>

              <li>
                <Link href="#">
                  <Image
                    src="/social/instagram.svg"
                    alt="logo"
                    height={15}
                    width={15}
                    className="dark:invert-50"
                  />
                </Link>
              </li>

              <li>
                <Link href="#">
                  <Image
                    src="/social/discord.svg"
                    alt="logo"
                    height={15}
                    width={15}
                    className="dark:invert-50"
                  />
                </Link>
              </li>

              <li>
                <Link href="#">
                  <Image
                    src="/social/youtube.svg"
                    alt="logo"
                    height={15}
                    width={15}
                    className="dark:invert-50"
                  />
                </Link>
              </li>
            </ul>
          </section>

          <section className="text-primary/70 text-sm">
            © Blyp {new Date().getFullYear()} — @ericsison.dev
          </section>
        </div>
      </footer> */}
      </div>
    </div>
  );
}
