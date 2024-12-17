import Link from "next/link";
import Image from "next/image";
import { BlogTopic } from "../../../types/blogtopics";

export default function TopicCard({ title, description, imgSrc, link, alt }: BlogTopic) {
    return (
        <Link href={link} className="relative flex-col items-center justify-center w-[300px] mx-3 mb-[50px] bg-[var(--off-white)] rounded-sm border border-[var(--gray-300)] custom-card-shadows">
            <Image
                src={imgSrc}
                width={1920}
                height={1280}
                alt={alt}
                className="rounded-t-sm"
            />
            <div className=" border-t-0 rounded-b-sm p-4 pt-2">
                <h3 className="uppercase font-medium text-[var(--brown-500)] text-[1.05rem]">{title}</h3>
                <p className="my-2 text-[.9rem]">{description}</p>
            </div>
        </Link>
    )
}
