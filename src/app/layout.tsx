import type { Metadata } from "next";
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
        className={`antialiased text-[var(--off-black)]`}
      >
        {children}
      </body>
    </html>
  );
}
