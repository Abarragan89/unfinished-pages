import Navigation from "./Navigation"
import Image from "next/image"
import Link from "next/link"
import getUserNavigationData from "@/app/services/getUserNavigationData"
import { UserData } from "../../types/users"
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/auth"

export default async function Header() {

    const session = await getServerSession(authOptions);

    let userData: UserData | null = null;

    // Check if user is logged in
    if (session?.user?.id) {
        userData = await getUserNavigationData(session.user.id) as UserData;
    }

    return (
        <header className="flex justify-between items-center px-[20px] py-[10px] align-center bg-[var(--black)] custom-header-fadeout">
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
