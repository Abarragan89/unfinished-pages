import Image from "next/image"
import SubheadingTitle from "@/components/Headings/SubheadingTitle";
import Link from "next/link";
import { BlogData } from "../../../../types/blog";
import BlogCard from "@/components/Cards/BlogCard";
import CommentSection from "@/components/CommentSection";
import BlogLikeCommentBar from "@/components/BlogUI/BlogLikeCommentBar";
import ScrollToTop from "@/components/ScrollToTop";

export default function Page({ params }: { params: { slug: string } }) {

    const blogData: BlogData[] = [
        {
            id: '1',
            title: 'Boost Your Creativity with These Proven Techniques',
            description: 'Discover insightful tips, expert advice, and the latest trends to elevate your lifestyle, boost productivity, and inspire personal growth!',
            date: 'September 12, 2023',
            likes: 53,
            dislikes: 11,
            pictureURL: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '2',
            title: 'Mastering the Art of Productivity: Tips for Daily Success',
            description: 'Your go-to source for in-depth articles on tech, wellness, and creativity. Explore fresh perspectives and tips for thriving in todays world.!',
            date: 'August 29, 2024',
            likes: 120,
            dislikes: 25,
            pictureURL: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '3',
            title: 'Healthy Living Hacks: Simple Changes for a Better Life',
            description: 'Uncover practical solutions and fresh ideas for work, wellness, and creativity. Join us on a journey to live more inspired, balanced lives.',
            date: 'July 12, 2023',
            likes: 892,
            dislikes: 30,
            pictureURL: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '4',
            title: 'Exploring the Future of AI: Trends and Innovations Ahead',
            description: 'Explore actionable insights and stories across tech, health, and creativity, designed to help you grow, learn, and live with purpose.',
            date: 'Decemeber 25, 2024',
            likes: 2,
            dislikes: 1,
            pictureURL: '/images/topicCardImgs/family.jpg'
        }
    ]

    return (
        <main className="text-[var(--brown-600)] text-[19px] min-h-[100vh] m-[5%] rounded-md">
            <ScrollToTop />
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
            <BlogLikeCommentBar />

            {/* This is the Blog Image */}
            <Image
                src={'/images/blogs/family.jpg'}
                width={700}
                height={394}
                alt="Image of thing, should replace with data"
                className="block mx-auto mb-[25px] md:mb-[40px]"
            />

            {/* This is the blog text */}
            <div className="max-w-[700px] mx-auto leading-9 px-3">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!</p>
            </div>

            {/* Comment Section */}
            <hr className="mt-[50px]" />
            <CommentSection />

            {/* This is the related posts in the same category */}
            <hr className="mt-[50px]" />
            <section className="mt-[30px]">
                <SubheadingTitle title="Related Blogs" />
                <div className="flex flex-wrap justify-around mx-auto mt-[30px] max-w-[1200px]">
                    {blogData.map((blog: BlogData) => {
                        return (
                            <Link key={blog.id} href={`/blog/${blog.title}`} className="embla__slide">
                                <BlogCard
                                    id={blog.id}
                                    title={blog.title}
                                    description={blog.description}
                                    date={blog.date}
                                    likes={blog.likes}
                                    dislikes={blog.dislikes}
                                    pictureURL={blog.pictureURL}
                                />
                            </Link>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}