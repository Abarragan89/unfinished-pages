'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

declare global {
    interface Window {
        dataLayer: [];
    }
}

export default function CookieBanner() {

    const [usersChoice, setUsersChoice] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    function acceptedCookiePolicy() {
        localStorage.setItem('cookieConsent', 'granted')
        setUsersChoice('granted')
    }

    function rejectedCookiePolicy() {
        localStorage.setItem('cookieConsent', 'denied')
        setUsersChoice('denied')
    }

    useEffect(() => {
        setUsersChoice(localStorage.getItem('cookieConsent'));
        setIsLoading(false)
    }, []);

    useEffect(() => {
        if (usersChoice !== null) {
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                    analytics_storage: usersChoice
                })
            }
        }
    }, [usersChoice])

    // only show banner is local storage is loaded and has not yet consented
    if (isLoading || usersChoice !== null) {
        return null
    }

    return (
        <section className="fixed bottom-10 w-[90%] max-w-[490px] right-10 bg-[var(--off-white)] border border-[var(--gray-500)] rounded-md py-4 px-2 custom-low-lifted-shadow">
            <h5 className="text-center text-[1.3rem] text-[var(--brown-500)] font-bold">Our Cookies 🍪</h5>
            <p className="text-center pb-4 text-[.95rem]">By clicking &quot;Accept&quot;, you consent to the use of non-essential cookies. <span className="font-bold">We do not sell, trade, or rent your personal information to others.</span> You can learn more in our
                <Link
                    href='/privacyPolicy'
                    className="mx-1 text-[var(--success)] underline hover:cursor-pointer"
                >
                Privacy Policy
                </Link>
                and 
                <Link
                href='/cookiePolicy'
                className="mx-1 text-[var(--success)] underline hover:cursor-pointer"
                >
                Cookie Policy
                </Link>
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
    )
}
