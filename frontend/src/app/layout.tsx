import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import {cn} from '../lib/utils'
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner"

const fontSans = FontSans({
  subsets: ['latin'],
  variable:"--font-sans"
})

export const metadata: Metadata = {
  title: "Chatinger",
  description: "To chatting quick as possible without any login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <Toaster richColors={true} duration={3000}/>
        {children}
        </body>
      </SessionProvider>
    </html>
  );
}
