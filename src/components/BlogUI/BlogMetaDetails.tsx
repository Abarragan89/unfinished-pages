import Image from "next/image"

interface Props {
    title: string;
    coverImgURL: string;
    coverImgAlt: string;
    authorName: string;
    authorImgURL: string;
    readingLength: number;
    publishDate: string;
}

export default function BlogMetaDetails({
    title,
    authorName,
    authorImgURL,
    readingLength,
    publishDate
}: Props) {
    return (
        <>
            <h1 className="max-w-[700px] mx-auto leading-[2.2rem] md:leading-[3.1rem] text-[32px] sm:text-[42px] mb-[18px] font-[700]">{title}</h1>
            {/* author readtime date and author profile pic  */}
            <section className="flex max-w-[700px] mx-auto mb-[25px]">
                <Image
                    src={authorImgURL}
                    width={40}
                    height={40}
                    alt="profile pic of blog author"
                    className="rounded-[50px] w-[40px] border border-[var(--gray-300)]"
                    priority
                />
                <div className="ml-4">
                    <p className="text-[.95rem] leading-5">{authorName}</p>
                    <p className="text-[.95rem] leading-5 text-[var(--gray-500)]">{readingLength} min read - {publishDate}</p>
                </div>
            </section>
        </>
    )
}
