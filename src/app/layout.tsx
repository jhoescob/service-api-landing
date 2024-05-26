import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/header/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Service Reservation API",
  description: "This is a landing page for a reservation API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased w-full relative",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="pt-20 pb-[300px] w-full flex  justify-center relative min-h-screen ">
            <div className="w-[90%] md:w-[80%] ">
              {children}
              <Analytics />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
