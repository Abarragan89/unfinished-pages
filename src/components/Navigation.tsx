import Image from "next/image"

export default function Navigation() {

    const liStyle = "mx-3 text-center text-sm border-b-[1px] text-white border-transparent hover:cursor-pointer hover:border-gray-800"

    return (
        <nav>
            <ul className="flex w-full justify-between items-center">
                <li className={liStyle}>Sign Up</li>
                <li className={liStyle}>Sign In</li>
                <li>
                    <Image
                        className="rounded-[50px]"
                        src={"/images/defaultProfilePic.png"}
                        width={35}
                        height={35}
                        alt={"profile pic of user"}
                    />
                </li>
            </ul>
        </nav>
    )
}
