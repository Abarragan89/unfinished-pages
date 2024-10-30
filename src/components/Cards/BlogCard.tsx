import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";


export default function BlogCard() {
    return (
        <Link href={`/blog/${'the only way ot look in the way'.toLowerCase().replace(' ', '-')}`} className="embla__slide">
            <div className="embla__slide-inner custom-card-shadows flex-col w-[300px] mx-[20px] pb-2 rounded-sm bg-white">
                {/* Your slide content here */}
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
                </div>
            </div>
        </Link>
    )
}
