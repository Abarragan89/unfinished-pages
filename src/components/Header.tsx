import Navigation from "./Navigation"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <header className="flex justify-between items-center px-[20px] py-[10px] align-center bg-[var(--off-black)] custom-header-fadeout">
            <Link href="/">
                <Image
                    className="rounded-[50px]"
                    src={"/images/websiteLogo.png"}
                    width={40}
                    height={40}
                    alt="company logo"
                    priority
                />
            </Link>
            <Navigation />
        </header>
    )
}
