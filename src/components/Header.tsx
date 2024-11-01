"use client";
import Navigation from "./Navigation"
import Image from "next/image"
import Link from "next/link"
import SearchInput from "./FormInputs/SearchInput"
import { SessionProvider } from "next-auth/react"

export default function Header() {
    return (
        <header className="flex justify-between items-center px-[20px] py-[10px] align-center bg-[var(--off-black)] custom-header-fadeout">
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        className="rounded-[50px] mr-5"
                        src={"/images/websiteLogo.png"}
                        width={40}
                        height={40}
                        alt="company logo"
                        priority
                    />
                </Link>
                <SearchInput />
            </div>
            <SessionProvider>
                <Navigation />
            </SessionProvider>
        </header>
    )
}