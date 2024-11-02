import Link from "next/link";
import { LuNewspaper } from "react-icons/lu";
import { HiPencilSquare } from "react-icons/hi2";
import { GoSignOut } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { Session } from "../../../types/users";
import { signOut } from "next-auth/react"

export default function AvatarLoggedIn({ onClose, sessionData }: { onClose: () => void, sessionData: Session }) {

    const listElStyles = 'mb-2 flex items-center bg-var(--brown-500) text-[.95rem] text-left mb-5 hover:cursor-pointer hover:text-[var(--brown-100)]'
    return (
        <>
            <p className='text-center text-[1.1rem] text-[var(--brown-500)]'>Logged In As:</p>
            <p className='text-center text-[.85rem] text-[var(--gray-700)] mb-2 tracking-tight'>{sessionData?.data?.user?.email}</p>
            <hr className='border-[var(--gray-500)] mb-4'></hr>
            <ul className="text-center ml-3">
                <li className={listElStyles}>
                    <LuNewspaper size={20} />
                    <Link href='/' className="ml-3">Blogs</Link>
                </li>
                <li className={listElStyles}>
                    <IoIosNotifications size={20} />
                    <Link href='/' className="ml-3">Notifications</Link>
                </li>
                {/* <li className={listElStyles}>
                    <Link href='/'>Messages</Link>
                </li> */}
                <li className={listElStyles}>
                    <HiPencilSquare size={20} />
                    <Link href='/' className="ml-3">Write</Link>
                </li>
                <li className={listElStyles}>
                    <GoSignOut size={20} />
                    <button onClick={() => signOut()} className="ml-3">Sign out</button>
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
