export default function Footer() {
    return (
        <footer className="bg-[var(--off-black)] text-gray-200 py-8 mt-[60px]">
            <div className="container mx-auto px-4">
                {/* Logo and Navigation */}
                <div className="flex flex-col justify-center md:flex-row items-center justify-between gap-4 md:gap-8">
                    <div className="flex items-center gap-2">
                        <img src="/images/websiteLogo.png" alt="Company Logo" className="w-10 h-10 rounded-[50px]" />
                        <span className="text-xl font-semibold text-[var(--gray-300)]">Unfinished Pages</span>
                    </div>
                    {/* Footer Bottom Text */}
                    <div className="text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} Unfinished Pages. All rights reserved.</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
