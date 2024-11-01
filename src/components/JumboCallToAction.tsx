"use client";
import Link from "next/link";
import LoginButton from "./Buttons/LoginButton";
import { useSession } from "next-auth/react";
import { Session } from "../../types/users";


export default function JumboCallToAction() {

    const session: Session = useSession();

    return (
        <div className="mt-8 flex justify-between w-[180px]">
            <Link
                href='#featured-blogs'
                title='read'
                className='custom-large-btn'
            >
                Read
            </Link>
            {session?.status === 'unauthenticated' &&
                <LoginButton text="Login" />
            }
        </div>
    )
}
