"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoIosMail } from "react-icons/io";
import { usePathname } from "next/navigation";

export default function LoginForm() {

    const [userEmail, setUserEmail] = useState<string>('');
    const pathname = usePathname();

    function submitEmailLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        signIn("email", {
            email: userEmail,
            callbackUrl: `${window.location.origin}/${pathname}`
        })
    }

    return (
        <div className='flex justify-center items-center mt-[10px]'>
            <div className='flex flex-col justify-between items-center mx-5 h-full'>
                {/* Login Button */}
                <div className="mx-auto w-fit mb-1 flex items-stretch justify-center p-0 rounded-md border border-blue-500">
                    <button
                        onClick={() => signIn('google', {
                            callbackUrl: `${window.location.origin}/${pathname}`
                        })}
                        type="button"
                        className="flex items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55 rounded-sm text-center text-[.95rem] pe-3 whitespace-nowrap"
                    >
                        <FcGoogle size={30} className="mr-3 bg-white rounded-l-md" />
                        Sign in with Google
                    </button>
                </div>

                <div className="flex items-center my-[8px]">
                    <div className=" border-t border-[var(--gray-500)] w-[60px]"></div>
                    <span className="mx-4 relative text-center text-gray-500">or</span>
                    <div className="border-t border-[var(--gray-500)] w-[60px]"></div>
                </div>
                {/* Login Button For Email */}
                <form>
                    <div className="relative">
                        <input onChange={(e) => setUserEmail(e.target.value)}
                            className="input-browser-reset w-[190px] ps-[40px] py-[2px] border border-[var(--brown-500)] text-[.95rem]" placeholder="email" />
                        <IoIosMail size={34} className="rounded-md absolute top-[-2px] text-[var(--brown-500)]" />
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={(e) => submitEmailLogin(e)}
                            type="submit"
                            className="custom-small-btn bg-[var(--off-black)] mx-auto mt-3"
                        >
                            Send Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
