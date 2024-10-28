import Link from "next/link";
import Image from "next/image";
import { BlogTopic } from "../../../types/blogtopics";

export default function TopicCard({ title, description, imgSrc }: BlogTopic) {
    return (
        <article className="relative custom-card-shadow flex-col items-center justify-center w-[320px] mx-5 mb-[30px] bg-white rounded-sm border-2 border-[var(--brown-300)] p-[5px]">
            <Image
                src={imgSrc}
                width={1920}
                height={1280}
                alt="Busts of Greek philosophers"
                className="rounded-sm opacity-85"
            />
            <div className=" border-t-0 rounded-b-sm p-4 pt-2">
                <h3 className="uppercase font-medium text-[var(--brown-500)] text-[1.05rem]">{title}</h3>
                <p className="my-2 text-[.9rem]">{description}</p>
                <div className="flex justify-center">
                    <Link href="/" className="custom-small-btn mt-5 absolute bottom-[12px]">View Blogs</Link>
                </div>
            </div>
        </article>
    )
}
