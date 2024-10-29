import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";


export default function BlogCard() {
    return (
        <article className="custom-card-shadow flex-col w-[320px] mx-[28px] pb-2 rounded-sm bg-white embla__slide">
            <Image
                src={"/images/topicCardImgs/philosophy.jpg"}
                width={1920}
                height={1280}
                alt="Busts of Greek philosophers"
                className="rounded-t-sm"
            />
            <div className="flex justify-between px-2 pt-1 text-[var(--gray-600)] text-[0.875rem]">
                <p>September 12, 2024</p>
                <div className="flex">
                    <div className="flex items-center pr-3">
                        <FaRegHeart />
                        <p className="ml-1">23</p>
                    </div>
                    <div className="flex items-center">
                        <FiMessageCircle />
                        <p className=" ml-1">93</p>
                    </div>
                </div>
            </div>
            <div className="flex-column justify-between rounded-b-sm p-2 px-3">
                <h3 className="font-medium text-[var(--brown-500)] text-[1.025rem]">Meditate my anger away? Or do I just sit in it? Moving away from the norm</h3>
                <p className="mt-2 text-[.9rem]">Ethics, Metaphysics, Epistemology, and everything in between. Fox News is the most trusted news source the only one we are looking into is the best one</p>

                {/* <Link href="/" className="custom-small-btn mt-5 relative bottom-[12px]">Read</Link> */}
                <div className="flex justify-center">
                <Link href="/" className="mt-3 text-center underline text-[var(--brown-500)] hover:text-[var(--brown-100)] text-[.98rem]">Read</Link>
                </div>
            </div>
        </article>
    )
}
