import Navigation from "./Navigation"
import Image from "next/image"

export default function Header() {
    return (
        <header className="flex justify-between px-[20px] py-[10px] align-center bg-[var(--off-black)] custom-header-fadeout">
            <Image
                className="rounded-[50px]"
                src={"/images/websiteLogo.png"}
                width={40}
                height={40}
                alt="company logo"
            />
            <Navigation />
        </header>
    )
}
