import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { BlogData } from "../../../types/blog";

export default function BlogCard({
    title,
    description,
    date,
    likes,
    dislikes,
    pictureURL,
}: BlogData) {
    return (
        <div className="embla__slide-inner custom-card-shadows flex-col w-[300px] mx-[20px] pb-2 rounded-sm bg-white">
            {/* Your slide content here */}
            <Image
                src={pictureURL ? pictureURL : "/images/blogs/fillerImg.png"}
                width={1920}
                height={1280}
                alt="Busts of Greek philosophers"
                className="rounded-t-sm"
            />
            <div className="flex justify-between px-2 pt-1 text-[var(--gray-600)] text-[0.875rem]">
                <p>{date}</p>
                <div className="flex">
                    <div className="flex items-center pr-3">
                        <FaRegHeart />
                        <p className="ml-1">{likes}</p>
                    </div>
                    <div className="flex items-center">
                        <FiMessageCircle />
                        <p className=" ml-1">{dislikes}</p>
                    </div>
                </div>
            </div>
            <div className="flex-column justify-between rounded-b-sm p-2 px-3">
                <h3 className="font-medium text-[var(--brown-500)] text-[1.025rem]">{title}</h3>
                <p className="mt-2 text-[.9rem]">{description}</p>
            </div>
        </div>
    )
}
