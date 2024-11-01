import type { Metadata } from "next";
import { bodyFont } from "./fonts";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: "Unfinished Pages",
  description: "Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased text-[var(--off-black)] ${bodyFont.className}`}
      >
        {/* <SessionProvider> */}
          <Header />
          {children}
          <Footer />
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
