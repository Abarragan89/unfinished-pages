import Image from "next/image"
import MainHeading from "@/components/Headings/MainHeading";
import { BlogData } from "../../../../types/blog";
import { formatDate } from "../../../../utils/formatDate";
import BlogCard from "@/components/Cards/BlogCard";
import ScrollToTop from "@/components/ScrollToTop";

export default function Page({ params }: { params: { slug: string } }) {

    const blogData: BlogData[] = [
        {
            id: '1',
            title: 'Boost Your Creativity with These Proven Techniques',
            description: 'Discover insightful tips, expert advice, and the latest trends to elevate your lifestyle, boost productivity, and inspire personal growth!',
            date: 'September 12, 2023',
            likes: [],
            likeCount: 0,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '2',
            title: 'Mastering the Art of Productivity: Tips for Daily Success',
            description: 'Your go-to source for in-depth articles on tech, wellness, and creativity. Explore fresh perspectives and tips for thriving in todays world.!',
            date: 'August 29, 2024',
            likes: [],
            likeCount: 0,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '3',
            title: 'Healthy Living Hacks: Simple Changes for a Better Life',
            description: 'Uncover practical solutions and fresh ideas for work, wellness, and creativity. Join us on a journey to live more inspired, balanced lives.',
            date: 'July 12, 2023',
            likes: [],
            likeCount: 0,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '4',
            title: 'Exploring the Future of AI: Trends and Innovations Ahead',
            description: 'Explore actionable insights and stories across tech, health, and creativity, designed to help you grow, learn, and live with purpose.',
            date: 'Decemeber 25, 2024',
            likes: [],
            likeCount: 0,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg'
        }
    ]

    return (
        <main className="text-[var(--brown-600)] text-[19px] min-h-[100vh] rounded-md">
            <ScrollToTop />
            <header className="relative">
                <Image
                    src={`/images/categories/${params.slug}.png`}
                    width={1920}
                    height={600}
                    alt="Image of thing, should replace with data"
                    className="opacity-[.9]"
                    priority
                />
                <div className={`absolute top-[33%] w-full`}>
                    <MainHeading title={params.slug.toUpperCase()} />
                </div>
            </header>
            {/* This is the related posts in the same category */}
            <div className="flex flex-wrap justify-around mx-auto mt-[30px] max-w-[1200px]">
                {blogData.map((blog, index) => (
                    <div className="mb-[30px]" key={index}>
                        <BlogCard
                            id={blog.id}
                            title={blog.title}
                            coverPhotoUrl={blog.coverPhotoUrl as string}
                            description={blog.description as string}
                            date={formatDate(blog!.date!.toString())}
                            likes={blog.likes}
                        />
                    </div>
                ))}
            </div>
        </main>
    )
}