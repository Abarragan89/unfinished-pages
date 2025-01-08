'use client';
import Link from "next/link";

export default function Banner({ text, color, link }: { text: string, color: string; link?: string }) {
    return (
        <>
            {link ?
                <div className="flex items-center bg-[var(--success-transparent)] relative">
                    <p
                        className={`w-full py-2 text-[1.5rem] text-center opacity-90 text-white font-bold tracking-[4px] text-white custom-banner-text-shadow`}
                    >
                        {text}
                    </p>
                    {link &&
                        <Link
                            href={link}
                            className="absolute text-blue-700 underline right-[4%] text-[.95rem] hover:text-blue-500 active:italic"
                        >
                            Visit Live Blog
                        </Link>
                    }
                </div>
                :
                <p
                    className={`w-full py-2 text-[1.5rem] text-center
                ${color === 'green' ? 'bg-[var(--success-transparent)] ' : 'bg-[var(--danger-transparent)] '}
                opacity-90
                text-white font-bold tracking-[4px] text-white custom-banner-text-shadow`}
                >
                    {text}
                </p>
            }
        </>
    )
}
