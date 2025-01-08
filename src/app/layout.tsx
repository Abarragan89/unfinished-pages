import type { Metadata } from "next";
import { bodyFont } from "./fonts";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import { Suspense } from "react";
import { headers } from 'next/headers';
// import Adsense from "@/components/AdSense";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";


export const metadata: Metadata = {
  title: "Unfinished Pages",
  description: "Blog",
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = headers();
  const nonce = headersList.get('x-nonce');
  if (!nonce) return

  return (
    <html lang="en">
      <head>
        {/* <Adsense nonce={nonce} /> */}
        <Suspense fallback={null}>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} nonce={nonce} />
        </Suspense>
      </head>
      <body
        nonce={nonce}
        className={`antialiased text-[var(--off-black)] ${bodyFont.className}`}
      >
        <NextAuthProvider>
          <Suspense>
            <Header />
            {children}
            <CookieBanner nonce={nonce} />
            <Footer />
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
