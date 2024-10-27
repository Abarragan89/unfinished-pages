import type { Metadata } from "next";
import { bodyFont } from "./fonts";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
