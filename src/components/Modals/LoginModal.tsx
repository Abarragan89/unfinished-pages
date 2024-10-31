'use client';
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'
import ModalWrapper from "./ModalWrapper";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";


export const LoginModal = () => {

    const params = useSearchParams();

    const showModal = params.get('showModal')

    return (
        <Suspense>
            {showModal === 'login' &&
                <ModalWrapper
                    title='none'
                >

                    <div className='flex justify-center items-center'>
                        {/* Penguin Image */}
                        <Image
                            src={'/images/defaultProfilePic.png'}
                            width={100}
                            height={100}
                            alt='Penguin waving'
                            className='rounded-[10px] mx-5'
                        />
                        <div className='flex flex-col justify-between items-center mx-5 h-full'>
                            {/* Login Button */}
                            <div className="mx-auto w-fit mb-1 flex items-stretch justify-center p-0 rounded-md border border-blue-500">
                                <button
                                    onClick={() => signIn('google')}
                                    type="button"
                                    className="flex items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55 rounded-md text-sm text-center pe-2"
                                >
                                    <FcGoogle size={24} className="mr-2 py-[2px] bg-white rounded-md" />
                                    Sign in with Google
                                </button>
                            </div>
                            <p className='text-[.7rem] text-[var(--dark-text-color)] opacity-40'>VCA emails only</p>
                        </div>
                    </div>


                </ModalWrapper>
            }
        </Suspense>
    )
}

export default LoginModal;
