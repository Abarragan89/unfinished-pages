
import { CiHeart } from "react-icons/ci";
import { BiMessageRounded } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa"; // Solid Heart
import { IoShareOutline } from "react-icons/io5";
import Image from "next/image"
import SubheadingTitle from "@/components/Headings/SubheadingTitle";
import { BlogTopic } from "../../../../types/blogtopics";
import BlogCard from "@/components/Cards/BlogCard";

export default function Page({ params }: { params: { slug: string } }) {

    console.log('slug', params.slug)

    const blogTopics: BlogTopic[] = [
        {
            title: "Philosophy",
            description: "Exploring philosophy\’s big questions, I find myself both the debater and the skeptic, endlessly intrigued.",
            imgSrc: "/images/topicCardImgs/philosophy.jpg",
            alt: "",
            link: ""
        },
        {
            title: "Religion",
            description: "I wrestle with religious ideas, questioning beliefs and unraveling perspectives that shape human meaning.",
            imgSrc: "/images/topicCardImgs/religion.jpg",
            alt: "",
            link: ""
        },
        {
            title: "Family",
            description: "Family life sparks inner debates on tradition, values, and what it truly means to connect and belong.",
            imgSrc: "/images/topicCardImgs/family.jpg",
            alt: "",
            link: ""
        },
        {
            title: "Education",
            description: "I challenge myself on education\’s role, questioning how best we learn, grow, and pass on knowledge.",
            imgSrc: "/images/topicCardImgs/education.jpg",
            alt: "",
            link: ""
        },
        {
            title: "Technology",
            description: "I argue the pros and cons of technology, reflecting on how it shapes us and transforms our daily lives.",
            imgSrc: "/images/topicCardImgs/technology.jpg",
            alt: "",
            link: ""
        },
        {
            title: "Government",
            description: "I find myself questioning the role of government, debating its impact on freedom, justice, and societal well-being.",
            imgSrc: "/images/topicCardImgs/government.jpg",
            alt: "",
            link: ""
        }
    ];

    return (
        <main className="text-[var(--brown-600)] text-[19px] min-h-[100vh] rounded-md">
            <Image
                src={`/images/categories/${params.slug}.png`}
                width={1920}
                height={600}
                alt="Image of thing, should replace with data"
                className="block mx-auto opacity-[.75]"
                priority
            />
            <div className="mt-[20px]">
                <SubheadingTitle title={params.slug.toUpperCase()}/>
            </div>
            {/* This is the related posts in the same category */}
            {/* <section className="mt-[30px]"> */}
            <div className="flex flex-wrap justify-around mx-auto mt-[30px] max-w-[1200px]">
                {blogTopics.map((topic, index) => (
                    <div className="mb-[30px]" key={index}>
                        <BlogCard />
                    </div>
                ))}
            </div>
            {/* </section> */}
        </main>
    )
}