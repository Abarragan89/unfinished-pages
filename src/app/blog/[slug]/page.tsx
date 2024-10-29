
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
        <main className="text-[var(--brown-600)] text-[19px] min-h-[100vh] m-[5%] rounded-md">
            <h1 className="max-w-[700px] mx-auto text-[2rem] leading-[2.2rem] md:text-5xl md:leading-[3.5rem] mb-[18px] font-[700]">How do I manage my time? Focus on career or family?</h1>
            {/* author readtime date and author profile pic  */}
            <section className="flex max-w-[700px] mx-auto mb-[40px]">
                <Image
                    src={"/images/defaultProfilePic.png"}
                    width={40}
                    height={40}
                    alt="profile pic of blog author"
                    className="rounded-[50px] w-[40px]"
                />
                <div className="ml-4">
                    <p className="text-[.95rem] leading-5">Anthony Barragan</p>
                    <p className="text-[.95rem] leading-5 text-[var(--gray-500)]">4 min read - July 30th, 2024</p>
                </div>
            </section>
            {/* This will be the likes/comment button bar */}
            <section className="flex items-center mx-auto mb-[40px] justify-between py-[5px] max-w-[700px] my-5 px-4 text-[var(--gray-500)] border-t border-b border-[var(--paper-color)]">
                <div className="flex items-center text-[var(--gray-500)">
                    <IoMdHeartEmpty className="text-[1.5rem] mr-[2px] hover:cursor-pointer" />
                    <p className="mr-5 text-[.95rem]">93</p>
                    <BiMessageRounded className="text-[1.5rem] mr-[2px] hover:cursor-pointer" />
                    <p className="text-[.95rem]">15</p>
                </div>
                <IoShareOutline className="text-[1.55rem] text-[var(--gray-500) hover:cursor-pointer" />
            </section>
            {/* This is the Image */}
            <Image
                src={'/images/blogs/family.png'}
                width={700}
                height={394}
                alt="Image of thing, should replace with data"
                className="block mx-auto mb-[25px] md:mb-[40px]"
            />
            {/* This is the blog text */}
            <div className="max-w-[700px] mx-auto leading-9 px-3">
                <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                5
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'

            </div>

            <hr className="mt-[50px]" />
            {/* This is the related posts in the same category */}
            <section className="mt-[30px]">
                <SubheadingTitle title="Related Blogs" />
                <div className="flex flex-wrap justify-around mx-auto mt-[30px] max-w-[1200px]">
                    {blogTopics.map((topic, index) => (
                        <div className="mb-[30px]" key={index}>
                            <BlogCard />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}