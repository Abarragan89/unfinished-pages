import Navigation from "./Navigation"
import Image from "next/image"
import Link from "next/link"
import { headers } from 'next/headers'
import getUserNavigationData from "@/app/services/getUserNavigationData"
import { UserData } from "../../types/users"

export default async function Header() {

    const headersList = headers()
    const userId = headersList.get('x-user-id')

    let userData:UserData | null = null;

    // Check if user is logged in
    if (userId) {
        userData = await getUserNavigationData(userId) as UserData;
    }



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
            <Navigation userData={userData} />
        </header>
    )
}
