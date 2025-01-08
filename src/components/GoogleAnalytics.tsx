'use client';

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
    interface Window {
        gtag: (purpose: string, measure: string, options?: object) => void;
    }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID, nonce }: { GA_MEASUREMENT_ID: string, nonce: string }) {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + searchParams.toString();

        if (typeof window !== 'undefined' && window.gtag) {
            // send a page preview event to google analytics with the url
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: url
            })
        }

    }, [GA_MEASUREMENT_ID, pathname, searchParams])

    return (
        <>
            <Script
                strategy="afterInteractive"
                nonce={nonce}
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
            <Script id="google-analytics" strategy="afterInteractive" nonce={nonce}>
                {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag() { dataLayer.push(arguments); }

                        gtag('js', new Date());

                        gtag('consent', 'default', {
                            'analytics_storage': 'denied'
                        })

                        gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}, {
                            page_path: window.location.pathname
                        });
                `}
            </Script>
        </>
    )
}
