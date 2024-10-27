import Image from "next/image"

export default function Navigation() {

    const liStyle = "mx-3 text-center text-sm border-b-[1px] text-[var(--gray-300)] border-transparent hover:cursor-pointer hover:text-[var(--brown100)]"

    return (
        <nav>
            <ul className="flex w-full justify-between items-end">
                <li className={liStyle}>Home</li>
                <li className={liStyle}>Write</li>
                <li className={liStyle}>Blogs</li>
                <li className={liStyle}>About</li>
                <li>
                    <Image
                        className="rounded-[50px]"
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
