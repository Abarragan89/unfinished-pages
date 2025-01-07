'use client';
import { useState, useEffect } from "react";

declare global {
    interface Window {
        dataLayer: [];
    }
}

export default function CookieBanner({ nonce }: { nonce: string }) {

    const [usersChoice, setUsersChoice] = useState<string | null>('')

    function acceptedCookiePolicy() {
        localStorage.setItem('cookieConsent', 'true')
        setUsersChoice('true')
    }

    function rejectedCookiePolicy() {
        localStorage.setItem('cookieConsent', 'false')
        setUsersChoice('false')
    }

    useEffect(() => {
        setUsersChoice(localStorage.getItem('cookieConsent'));
    }, []);

    useEffect(() => {
        // If they consent, then run google analytics
        if (usersChoice === 'true') {
            window.dataLayer = window.dataLayer || [];
            // @ts-expect-error: dataLayer coming from  google analytics
            function gtag() { dataLayer.push(...arguments); }
            // @ts-expect-error: dataLayer coming from  google analytics
            gtag('js', new Date());
            // @ts-expect-error: dataLayer coming from  google analytics
            gtag('config', `G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`);
        }

    }, [usersChoice])

    return (
        <>
            {!usersChoice &&
                <section className="fixed bottom-10 w-[90%] max-w-[550px] right-10 bg-[var(--off-white)] border border-[--gray-500] rounded-md p-4 custom-low-lifted-shadow">
                    <h5 className="text-center text-[1.3rem] pb-1 text-[var(--brown-500)]">We Use Cookies</h5>
                    <p className="text-center pb-4 text-[.95rem]">We use cookies to enhance your experience. By clicking &quot;Accept&quot;, you consent to the use of non-essential cookies. You can learn more in our
                        [Privacy Policy]
                        and
                        [Cookie Policy].
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={rejectedCookiePolicy}
                            className="custom-small-btn bg-[var(--gray-500)] mr-4 opacity-80"
                        >Decline</button>
                        <button
                            onClick={acceptedCookiePolicy}
                            className="custom-small-btn bg-[var(--off-black)] ml-4 bg-[var(--success)]"
                        >Accept</button>
                    </div>
                </section>
            }
        </>
    )
}
