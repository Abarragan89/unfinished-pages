import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

interface Props {
    title?: string;
    description?: string;
    date?: string;
    likeCount: number;
    coverPhotoUrl?: string;
    totalCommentCount: number;
    isPublished?: boolean | null
}

export default function BlogCard({
    title,
    description,
    date,
    likeCount,
    coverPhotoUrl,
    totalCommentCount,
    // will be null for cards that do not belong to authors. Author cards will pass either true or false
    isPublished = null
}: Props) {

    return (
        <div className="embla__slide-inner custom-card-shadows flex-col w-[300px] mx-[20px] pb-2 rounded-sm bg-white">
            {/* Your slide content here */}
            {/* show banner for authors to show published status */}
            {isPublished !== null &&
                isPublished ?
                <p>Published</p>
                :
                <p>Draft</p>
            }
            <Image
                src={coverPhotoUrl ? coverPhotoUrl : "/images/blogs/fillerImg.png"}
                width={320}
                height={180}
                alt="Busts of Greek philosophers"
                className="rounded-t-sm w-full h-full"
            />
            <div className="min-h-[140px]">
                <div className="flex justify-between px-2 pt-1 text-[var(--gray-600)] text-[0.875rem]">
                    <p>{date}</p>
                    <div className="flex">
                        <div className="flex items-center pr-3">
                            <FaRegHeart />
                            <p className="ml-1">{likeCount}</p>
                        </div>
                        <div className="flex items-center">
                            <FiMessageCircle />
                            <p className=" ml-1">{totalCommentCount}</p>
                        </div>
                    </div>
                </div>
                <div className="flex-column justify-between rounded-b-sm p-2 px-3">
                    <h3 className="font-medium text-[var(--brown-500)] text-[1.025rem]">{title}</h3>
                    <p className="mt-2 text-[.9rem]">{description}</p>
                </div>
            </div>
        </div>
    )
}
