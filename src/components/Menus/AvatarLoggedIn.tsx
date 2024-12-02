import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { HiPencilSquare } from "react-icons/hi2";
import { GoSignOut } from "react-icons/go";
import { LuNewspaper } from "react-icons/lu";
import { IoIosNotifications } from "react-icons/io";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Session } from "../../../types/users";
import { signOut } from "next-auth/react"
import BecomeAnAuthor from "../Modals/BecomeAnAuthor";

export default function AvatarLoggedIn({ onClose, sessionData }: { onClose: () => void, sessionData: Session }) {


    const isAdmin = sessionData?.data?.isAdmin;
    const isAuthor = sessionData?.data?.isAuthor;

    const listElStyles = 'mb-2 flex items-center bg-var(--brown-500) text-[.95rem] text-left mb-5 hover:cursor-pointer hover:text-[var(--brown-100)]'
    return (
        <>
            <BecomeAnAuthor
                userId={sessionData.data?.user?.id as string}
            />
            <p className='text-center text-[1.1rem] text-[var(--brown-500)]'>Logged In As:</p>
            <p className='text-center text-[.85rem] text-[var(--gray-700)] mb-2 tracking-tight no-underline'>{sessionData?.data?.user?.email}</p>
            <hr className='border-[var(--gray-500)] mb-4'></hr>
            <ul className="text-center ml-3">
                {isAuthor &&
                    <li className={listElStyles}>
                        <HiPencilSquare size={20} className="text-[var(--brown-300)]" />
                        <Link href='/myBlogs' onClick={onClose} className="ml-3">My Blogs</Link>
                    </li>
                }

                <li className={listElStyles}>
                    <FaHeart size={17} className="text-[var(--brown-300)]" />
                    <Link href='/myBlogs' onClick={onClose} className="ml-3">Saved Blogs</Link>
                </li>


                {/* Admin Only */}
                {isAdmin &&
                    <li className={listElStyles}>
                        <BsPersonPlusFill size={20} className="text-[var(--brown-300)]" />
                        <Link href='/authorRequests' onClick={onClose} className="ml-3">Author Requests</Link>
                    </li>
                }

                {!isAuthor &&
                    <li className={listElStyles}>
                        <LuNewspaper size={20} className="text-[var(--brown-300)]" />
                        <Link href='?showModal=becomeAnAuthor' className="ml-3">Author Request</Link>
                    </li>
                }

                <li className={listElStyles}>
                    <IoIosNotifications size={20} className="text-[var(--brown-300)]" />
                    <Link href='/' onClick={onClose} className="ml-3">Notifications</Link>
                </li>

                <li className={listElStyles}>
                    <IoSettingsSharp size={20} className="text-[var(--brown-300)]" />
                    <Link href='/' onClick={onClose} className="ml-3">Settings</Link>
                </li>

                <li className={listElStyles}>
                    <GoSignOut size={20} />
                    <button onClick={() => signOut({
                        callbackUrl: '/'
                    })} className="ml-3">Sign out</button>
                </li>

            </ul>

            <hr className='mt-4 border-[var(--gray-500)]'></hr>
            <p
                className='text-center mt-2 hover:cursor-pointer hover:text-[var(--brown-100)] text-[var(--gray-700)]'
                onClick={onClose}
            >
                Close</p>
        </>
    )
}
