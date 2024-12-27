import Script from "next/script";

export default function Adsense({ nonce }: { nonce: string }) {
    return (
        <Script
            nonce={nonce}
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
        ></Script>
    );
}