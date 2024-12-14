"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image"
import { useSession } from "next-auth/react";
import { Session, UserData } from "../../types/users";
import AvatarMenu from "./Menus/AvatarMenu";
import SearchInput from "./FormInputs/SearchInput";
import { FaSortDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import TopicsSubMenu from "./Menus/TopicsSubMenu";


export default function Navigation({ userData }: { userData: UserData | null }) {

    const session: Session = useSession();
    const [showAvatarMenu, setShowAvatarMenu] = useState<boolean>(false);
    const [showTopicsSubMenu, setShowTopicsSubMenu] = useState<boolean>(false);

    const topicsMenuRef = useRef<HTMLLIElement | null>(null);
    const avatarMenuRef = useRef<HTMLLIElement | null>(null);

    const liStyle = "mx-3 text-center text-[.93rem] border-b-[1px] text-[var(--gray-300)] border-transparent hover:cursor-pointer"

    function closeMenu() {
        setShowAvatarMenu(prev => !prev)
    }

    // Handle clicks outside of the menu to close menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                topicsMenuRef.current &&
                !topicsMenuRef.current.contains(event.target as Node)
            ) {
                setShowTopicsSubMenu(false);
            }
            if (
                avatarMenuRef.current &&
                !avatarMenuRef.current.contains(event.target as Node)
            ) {
                setShowAvatarMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="relative z-50">
            <ul className="relative flex w-full justify-between items-center">
                <li
                    ref={topicsMenuRef}
                    className={`${liStyle} flex relative`}
                    onClick={() => setShowTopicsSubMenu(prev => !prev)}
                >
                    <p>Topics</p>
                    {
                        showTopicsSubMenu ?
                            <>
                                <FaCaretUp size={21} className="pb-[3px]" />
                                <TopicsSubMenu />
                            </>
                            :
                            <FaSortDown size={21} className="pb-[3px]" />
                    }
                </li>
                <div className="mx-[15px]">
                    <SearchInput placeholder="Search Blogs" />
                </div>
                <li ref={avatarMenuRef}>
                    <Image
                        className="rounded-[50px] hover:cursor-pointer min-w-[30px]"
                        src={userData?.image ? userData.image : "/images/defaultProfilePic.png"}
                        width={30}
                        height={30}
                        alt={"profile pic of user"}
                        onClick={closeMenu}
                    />
                    {/* Menu when user clicks on Avatar */}
                    {showAvatarMenu &&
                        <AvatarMenu onClose={closeMenu} />
                    }
                </li>
            </ul>
        </nav>
    )
}



