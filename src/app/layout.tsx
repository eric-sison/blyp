import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@blyp/components/providers/ThemeProvider";
import { Toaster } from "@blyp/components/ui/Sonner";
import "./globals.css";
import { TooltipProvider } from "@blyp/components/ui/Tooltip";
import { ReactQueryProvider } from "@blyp/components/providers/ReactQueryClient";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blyp",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <ReactQueryProvider>
          {/* prettier-ignore */}
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem 
            disableTransitionOnChange
        >
          <TooltipProvider>
            <main className="h-screen w-screen overflow-x-hidden">{children}</main>
          </TooltipProvider>
          <Toaster position="top-right" />
        </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
