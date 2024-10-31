import Image from "next/image"
import Link from "next/link"
export default function Navigation() {

    const liStyle = "mx-3 text-center text-[.93rem] border-b-[1px] text-[var(--gray-300)] border-transparent hover:cursor-pointer hover:text-[var(--brown-100)]"

    return (
        <nav>
            <ul className="flex w-full justify-between items-center">
                <li className={liStyle}>
                    <Link href={"/"}>
                        Home
                    </Link>
                </li>
                <li className={liStyle}>Write</li>
                <li className={liStyle}>About</li>
                <li>
                    <Image
                        className="rounded-[50px] hover:cursor-pointer"
                        src={"/images/defaultProfilePic.png"}
                        width={30}
                        height={30}
                        alt={"profile pic of user"}
                    />
                </li>
            </ul>
        </nav>
    )
}
