import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[var(--black)] text-gray-200 py-5">
            <div className="container mx-auto px-4">
                {/* Logo and Navigation */}
                <div className="flex flex-col md:flex-row items-center justify-around gap-4 md:gap-8">
                    <div className="flex items-center gap-2">
                        <Image src="/images/websiteLogo.png" alt="Company Logo" width={30} height={30} className="rounded-[50px]" />
                        <span className="text-md font-semibold text-[var(--gray-300)]">Unfinished Pages</span>
                    </div>
                    {/* Footer Bottom Text */}
                    <div className="text-center text-[.95rem]">
                        <p>&copy; {new Date().getFullYear()} Unfinished Pages. All rights reserved.</p>
                    </div>
                </div>

                <div className="flex justify-around md:flex-row items-center gap-4 md:gap-8 mt-3">
                    <Link
                        href='/privacyPolicy'
                        className="mx-1 text-[var(--success)] hover:cursor-pointer"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href='/cookiePolicy'
                        className="mx-1 text-[var(--success)] hover:cursor-pointer"
                    >
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
