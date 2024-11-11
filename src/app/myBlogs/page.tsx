import Link from "next/link"
import BlogCard from "@/components/Cards/BlogCard"
import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import { HiPencilSquare } from "react-icons/hi2";
import CreateBlog from "@/components/Modals/CreateBlog";

export default function page() {

    const blogData = [
        {
            id: '1',
            title: 'Boost Your Creativity with These Proven Techniques',
            description: 'Discover insightful tips, expert advice, and the latest trends to elevate your lifestyle, boost productivity, and inspire personal growth!',
            date: 'September 12, 2023',
            likes: 53,
            dislikes: 11
        },
        {
            id: '2',
            title: 'Mastering the Art of Productivity: Tips for Daily Success',
            description: 'Your go-to source for in-depth articles on tech, wellness, and creativity. Explore fresh perspectives and tips for thriving in todays world.!',
            date: 'August 29, 2024',
            likes: 120,
            dislikes: 25
        },
        {
            id: '3',
            title: 'Healthy Living Hacks: Simple Changes for a Better Life',
            description: 'Uncover practical solutions and fresh ideas for work, wellness, and creativity. Join us on a journey to live more inspired, balanced lives.',
            date: 'July 12, 2023',
            likes: 892,
            dislikes: 30
        },
        {
            id: '4',
            title: 'Exploring the Future of AI: Trends and Innovations Ahead',
            description: 'Explore actionable insights and stories across tech, health, and creativity, designed to help you grow, learn, and live with purpose.',
            date: 'Decemeber 25, 2024',
            likes: 2,
            dislikes: 1
        }
    ]


    return (
        <main className="pt-[30px]">
            <CreateBlog />
            <SubheadingTitle title="My Blogs" />
            <div className="absolute right-[25px] top-[80px]">
                <Link href={'/myBlogs?showModal=createBlog'} className="flex custom-small-btn">
                    <HiPencilSquare size={18} />
                    <span className="ml-2">Write</span>
                </Link>
            </div>
            <section className="flex flex-wrap justify-around max-w-[1200px] mx-auto ">
                {blogData.map((blog) => {
                    return (
                        <Link key={blog.id} href={`/blog/${blog.title}`}
                            className="my-[20px]"
                        >
                            <BlogCard
                                id={blog.id}
                                title={blog.title}
                                description={blog.description}
                                date={blog.date}
                                likes={blog.likes}
                                dislikes={blog.dislikes}
                            />
                        </Link>
                    )
                })}
            </section>
        </main>
    )
}
