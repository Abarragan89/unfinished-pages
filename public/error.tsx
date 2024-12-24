'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import SubheadingTitle from '@/components/Headings/SubheadingTitle'

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    const router = useRouter();
    return (
        <div className='min-h-[100vh] flex flex-col justify-center items-center bg-[var(--off-white)]'>
            {/* <h2>Something went wrong!</h2> */}
            <SubheadingTitle 
                title='Oops, Something went wrong!'
            />
            <div className='flex'>
                <button
                    className='custom-small-btn bg-[var(--off-black)] mt-5 mx-3'
                    onClick={
                        () => router.back()
                    }
                >
                    Go Back
                </button>

                <button
                    className='custom-small-btn bg-[var(--off-black)] mt-5 mx-3'
                    onClick={
                        () => signOut({ callbackUrl: '/' })
                    }
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}