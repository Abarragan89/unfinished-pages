'use client';
import Link from "next/link";

export default function LoginButton({ text }: { text: string }) {
    return (
        <>
            <Link
                href='/?showModal=login'
                title='login'
                className='custom-large-btn'
            >
                {text}
            </Link>
        </>
    )
}
