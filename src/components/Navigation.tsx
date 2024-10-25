import Image from "next/image"

export default function Navigation() {

    const liStyle = "w-[80px] hover:cursor-pointer"

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
