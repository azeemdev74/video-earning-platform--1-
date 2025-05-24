import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashProvider } from "@/components/splash-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rewards Hub Dollar - Watch Videos and Earn Money",
  description:
    "Join thousands of users who earn money by watching videos on our platform. Sign up today and get a $30 bonus instantly!",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async="async"
          data-cfasync="false"
          src="//pl26731117.profitableratecpm.com/d4855d4ae6562c2519da098161534391/invoke.js"
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SplashProvider>{children}</SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
