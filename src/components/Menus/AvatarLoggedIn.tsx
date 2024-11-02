import Link from "next/link";
import { Session } from "../../../types/users";
import { signOut } from "next-auth/react"

export default function AvatarLoggedIn({ onClose, sessionData }: { onClose: () => void, sessionData: Session }) {

    const listElStyles = 'mb-2 bg-var(--brown-500) tracking-wide text-[.95rem]'
    return (
        <>
            <p className='text-center text-[1.1rem] text-[var(--brown-500)]'>Logged In As:</p>
            <p className='text-center text-[.85rem] text-[var(--gray-700)] mb-2 tracking-tight'>{sessionData?.data?.user?.email}</p>
            <hr className='border-[var(--gray-500)] mb-4'></hr>
            <ul className="text-center">
                <li className={listElStyles}>
                    <Link href='/'>Blogs</Link>
                </li>
                <li className={listElStyles}>
                    <Link href='/'>Messages</Link>
                </li>
                <li className={listElStyles}>
                    <Link href='/'>Write</Link>
                </li>
                <li className={listElStyles}>
                    <button onClick={() => signOut()}>Sign out</button>
                </li>
            </ul>

            <hr className='mt-4 border-[var(--gray-500)]'></hr>
            <p
                className='text-center mt-2 hover:cursor-pointer text-[var(--gray-700)]'
                onClick={onClose}
            >
                Close</p>
        </>
    )
}
