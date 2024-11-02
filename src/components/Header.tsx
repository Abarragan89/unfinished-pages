"use client";
import Navigation from "./Navigation"
import Image from "next/image"
import Link from "next/link"
import SearchInput from './FormInputs/SearchInput'

export default function Header() {
    return (
        <header className="flex justify-between items-center px-[20px] py-[10px] align-center bg-[var(--off-black)] custom-header-fadeout">
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        className="rounded-[50px] mr-5 min-w-[30px]"
                        src={"/images/websiteLogo.png"}
                        width={40}
                        height={40}
                        alt="company logo"
                        priority
                    />
                </Link>
            </div>
            <Navigation />
        </header>
    )
}
