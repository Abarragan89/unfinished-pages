'use client';
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";


export const LoginModal = () => {

    const params = useSearchParams();
    const [userEmail, setUserEmail] = useState<string>('')

    const showModal = params.get('showModal')

    return (
        <>
            {showModal === 'login' &&
                <ModalWrapper
                    title='Join the Conversation'
                >

                    <div className='flex justify-center items-center mt-[10px]'>
                        <div className='flex flex-col justify-between items-center mx-5 h-full'>
                            {/* Login Button */}
                            <div className="mx-auto w-fit mb-1 flex items-stretch justify-center p-0 rounded-md border border-blue-500">
                                <button
                                    onClick={() => signIn('google', {
                                        callbackUrl: "/"
                                    })}
                                    type="button"
                                    className="flex items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55 rounded-sm text-center pe-3"
                                >
                                    <FcGoogle size={30} className="mr-3 bg-white rounded-l-md" />
                                    Sign in with Google
                                </button>
                            </div>

                            <div className="flex items-center my-[15px]">
                                <div className=" border-t border-[var(--gray-500)] w-[60px]"></div>
                                <span className="mx-4 relative text-center text-gray-500">or</span>
                                <div className="border-t border-[var(--gray-500)] w-[60px]"></div>
                            </div>
                            {/* Login Button For Email */}
                            <form>
                                <div className="relative">
                                    <input className="input-browser-reset text-[1.02rem] h-[30px] w-[190px] ps-[35px]" placeholder="email" />
                                    <MdOutlineEmail size={30} className="rounded-md absolute top-0 text-[var(--brown-500)]" />
                                </div>
                                <button
                                    onClick={() => signIn("email", {
                                        email: userEmail,
                                        callbackUrl: "/"

                                    })}
                                    type="submit"
                                    className="custom-small-btn mx-auto mt-3"
                                >
                                    Send Link
                                </button>
                            </form>
                        </div>
                    </div>
                </ModalWrapper>
            }
        </>
    )
}

export default LoginModal;
