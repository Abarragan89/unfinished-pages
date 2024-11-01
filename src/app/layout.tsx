import type { Metadata } from "next";
import { bodyFont } from "./fonts";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/NextAuthProvider";

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
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
