import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";

import { FaHeart } from "react-icons/fa";

import { FiMessageCircle } from "react-icons/fi";


export default function BlogCard() {
    return (
        <article className="relative custom-card-shadow flex-col items-center justify-center w-[320px] mx-5 mb-[30px] bg-white rounded-sm border border-[var(--brown300)] p-[5px]">
            <Image
                src={"/images/cardImgs/philosophy.jpg"}
                width={1920}
                height={1280}
                alt="Busts of Greek philosophers"
                className="rounded-sm opacity-85"
            />
            <div>
                <FaRegHeart className="text-[var(--)]"/>
                <FaHeart className="text-[var(--brown500)]"/>
                <FiMessageCircle />
            </div>
            <div className=" border-t-0 rounded-b-sm p-4 pt-2">
                <h3 className="uppercase font-medium text-[var(--brown500)] text-[1.05rem]">Philosophy</h3>
                <p className="my-2 text-[.9rem]">Ethics, Metaphysics, Epistemology, and everything in between. Fox News is the most trusted news source</p>
                <div className="flex justify-center">
                    <Link href="/" className="custom-small-btn mt-5">View Blogs</Link>
                </div>
            </div>
        </article>
    )
}
