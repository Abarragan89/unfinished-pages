"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image"
import { UserData } from "../../types/users";
import AvatarMenu from "./Menus/AvatarMenu";
import SearchInput from "./FormInputs/SearchInput";
import { FaSortDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import TopicsSubMenu from "./Menus/TopicsSubMenu";
import axios from "axios";
import { BlogData } from "../../types/blog";
import Link from "next/link";
import { cleanTitleForURL } from "../../utils/stringManipulation";

export default function Navigation({ userData }: { userData: UserData | null }) {

    const [showAvatarMenu, setShowAvatarMenu] = useState<boolean>(false);
    const [showTopicsSubMenu, setShowTopicsSubMenu] = useState<boolean>(false);
    const [searchedBlogs, setSearchedBlogs] = useState<BlogData[]>([])
    const topicsMenuRef = useRef<HTMLLIElement | null>(null);
    const avatarMenuRef = useRef<HTMLLIElement | null>(null);
    const searchedBlogsList = useRef<HTMLUListElement | null>(null);

    const liStyle = "mx-3 text-center text-[.93rem] border-b-[1px] text-[var(--white)] border-transparent hover:cursor-pointer"

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
            if (
                searchedBlogsList.current &&
                !searchedBlogsList.current.contains(event.target as Node)
            ) {
                setSearchedBlogs([])
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function searchBlogByKeyword(input: string) {
        if (!input) {
            setSearchedBlogs([]);
            return;
        }
        try {
            const { data } = await axios.get(`/api/blogSearchRoutes/${input}`)
            setSearchedBlogs(data)
        } catch (error) {
            console.log('error trying to find blogs', error)
        }
    }


    // render the listelements in the search
    function renderSearchedBlogs(blog: BlogData) {
        return (
            <li>
                <Link
                    href={`/blog/${cleanTitleForURL(blog.title as string)}-${blog.id}`}
                    className="flex w-[350px] hover:bg-[var(--off-white)] my-2"
                    onClick={() => setSearchedBlogs([])}
                >
                    <Image
                        src={blog.coverPhotoUrl as string}
                        width={120}
                        height={67}
                        alt="blog cover photo"
                    />
                    <p className="text-[.95rem] w-full px-2 py-1 h-[67px]">{blog.title}</p>
                </Link>
            </li>
        )
    }

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
                <div className="mx-[15px] relative">
                    <SearchInput
                        placeholder="Search Blogs"
                        onChangeHandler={searchBlogByKeyword}
                    />
                    {searchedBlogs.length > 0 &&
                        <ul
                            ref={searchedBlogsList}
                            className='absolute left-[-210px] top-[43px] bg-[--black] rounded-b-md border border-[var(--gray-500)] border-t-0'>
                            {/* make the list items in this render */}
                            {searchedBlogs.map((blog) => renderSearchedBlogs(blog))}
                        </ul>
                    }
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



