import React from 'react'
import Link from 'next/link';
import { IoIosCheckboxOutline } from "react-icons/io";

export default function PhotoRequirements() {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Cover Photo Requirements</p>
            <ul className="text-[.9rem]">
                <li className="my-1 flex items-center">
                    <IoIosCheckboxOutline size={18} className="text-[var(--green-700)] mr-2" />
                    <span className='mr-1'>Format:</span>jpg, png, jpeg, or webp
                </li>
                <li className="my-1 flex items-center">
                    <IoIosCheckboxOutline size={18} className="text-[var(--green-700)] mr-2" />
                    <span className='mr-1'>Sizes:</span>
                    <span>1280 x 720</span> 
                    <span className='mx-1 text-[var(--gray-500)]'>|</span> 
                    <span>1920 x 1080</span> 
                    <span className='mx-1 text-[var(--gray-500)]'>|</span> 
                    <span>2560 x 1440</span>
                </li>
            </ul>

            <p className="font-bold mt-2">Tips</p>
            <ul className="text-[.9rem]">
                <li className="my-1">Find royalty-free images at
                    <Link href="https://pixabay.com/" target="_blank" rel="noopener noreferrer" className="underline inline-block mx-1 text-[var(--success)]">
                        Pixabay
                    </Link>
                </li>

                <li className="my-1">Resize and format images with
                    <Link href="https://canva.com/" target="_blank" rel="noopener noreferrer" className="underline inline-block mx-1 text-[var(--success)]">
                        Canva
                    </Link>
                </li>
            </ul>
        </div>
    )
}
