import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[var(--off-black)] text-gray-200 py-8 mt-[60px]">
            <div className="container mx-auto px-4">
                {/* Logo and Navigation */}
                <div className="flex flex-col justify-center md:flex-row items-center justify-between gap-4 md:gap-8">
                    <div className="flex items-center gap-2">
                        <Image src="/images/websiteLogo.png" alt="Company Logo" width={30} height={30} className="rounded-[50px]" />
                        <span className="text-md font-semibold text-[var(--gray-300)]">Unfinished Pages</span>
                    </div>
                    {/* Footer Bottom Text */}
                    <div className="text-center text-[.95rem]">
                        <p>&copy; {new Date().getFullYear()} Unfinished Pages. All rights reserved.</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
