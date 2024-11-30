import Image from "next/image"
import SubheadingTitle from "@/components/Headings/SubheadingTitle";
import Link from "next/link";
import { BlogData } from "../../../../types/blog";
import BlogCard from "@/components/Cards/BlogCard";
import CommentSection from "@/components/CommentSection";
import getBlogData from "@/app/services/getBlogData";
import formatContentToDescendantType from "../../../../utils/formatBlogContent"
import { BlogContent } from "../../../../types/blog"
import { Descendant } from "slate"
import ScrollToTop from "@/components/ScrollToTop"
import BlogMetaDetails from "@/components/BlogUI/BlogMetaDetails"
import BlogLikeCommentBar from "@/components/BlogUI/BlogLikeCommentBar"
import consolidateCodeBlocks from "../../../../utils/consolidateCodeBlocks"
import BlogContentSection from "@/components/BlogUI/BlogContentSection"
import { Metadata } from 'next';


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;
    const blogId = slug.split('-').pop() as string;

    // Fetch blog data
    const blogData = await getBlogData(blogId);

    if (!blogData) {
        return {
            title: 'Blog Not Found',
            description: 'The requested blog could not be found.',
        };
    }

    return {
        title: blogData.title,
        description: blogData.description || 'Read this amazing blog!',
        openGraph: {
            type: 'article',
            title: blogData.title,
            description: blogData.description as string,
            url: `https://www.unfinishedpages.com/blog/${blogData.title.replace(/ /g, '-')}-${blogData.id}`,
            images: blogData.coverPhotoUrl ? [blogData.coverPhotoUrl] : undefined,
            siteName: 'Unfinished Pages',
            publishedTime: blogData.publishedDate.toISOString(),
        },
        twitter: {
            card: 'summary_large_image',
            title: blogData.title,
            description: blogData.description as string,
            images: blogData.coverPhotoUrl ? [blogData.coverPhotoUrl] : undefined,
        },
        alternates: {
            canonical: `https://www.unfinishedpages.com/blog/${blogData.title.replace(/ /g, '-')}-${blogData.id}`
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

export default async function Page({ params }: { params: { slug: string } }) {

    const blogDataRelated: BlogData[] = [
        {
            id: '1',
            title: 'Boost Your Creativity with These Proven Techniques',
            description: 'Discover insightful tips, expert advice, and the latest trends to elevate your lifestyle, boost productivity, and inspire personal growth!',
            date: 'September 12, 2023',
            likes: 53,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '2',
            title: 'Mastering the Art of Productivity: Tips for Daily Success',
            description: 'Your go-to source for in-depth articles on tech, wellness, and creativity. Explore fresh perspectives and tips for thriving in todays world.!',
            date: 'August 29, 2024',
            likes: 120,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '3',
            title: 'Healthy Living Hacks: Simple Changes for a Better Life',
            description: 'Uncover practical solutions and fresh ideas for work, wellness, and creativity. Join us on a journey to live more inspired, balanced lives.',
            date: 'July 12, 2023',
            likes: 892,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg'
        },
        {
            id: '4',
            title: 'Exploring the Future of AI: Trends and Innovations Ahead',
            description: 'Explore actionable insights and stories across tech, health, and creativity, designed to help you grow, learn, and live with purpose.',
            date: 'Decemeber 25, 2024',
            likes: 2,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg'
        }
    ]

    const { slug } = params;
    const blogId = slug.split('-').pop() as string;

    // Get blog data 
    const blogData = await getBlogData(blogId);

    // Error finding blog data
    if (!blogData) {
        throw new Error('Could not find blog data')
    }

    const formattedBlogData: Descendant[] = formatContentToDescendantType(blogData.content as BlogContent[])

    const consolidatedData: BlogContent[] = consolidateCodeBlocks(formattedBlogData as BlogContent[]);

    return (
        <main className="text-[var(--brown-600)] text-[19px] min-h-[100vh] m-[5%] rounded-md">
            <ScrollToTop />
            <BlogMetaDetails
                title={blogData.title}
                authorName={blogData.user.name as string}
                authorImgURL={blogData.user.image as string}
                coverImgAlt={'Blog cover image'}
                coverImgURL={blogData.coverPhotoUrl as string}
                readingLength={blogData.readDuration}
                publishDate={blogData.date.toLocaleDateString('en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                )}
            />

            {/* This will be the likes/comment button bar */}
            <BlogLikeCommentBar
                likes={blogData.likes}


            />

            {/* This is the Blog Image */}
            <Image
                src={blogData.coverPhotoUrl as string}
                width={700}
                height={394}
                alt={blogData.coverPhotoAlt as string}
                className="block mx-auto mb-[25px] md:mb-[40px]"
            />

            {/* This is the blog text */}
            <BlogContentSection
                blogContent={consolidatedData}
            />

            {/* Comment Section */}
            <hr className="mt-[50px]" />
            <CommentSection />

            {/* This is the related posts in the same category */}
            <hr className="mt-[50px]" />
            <section className="mt-[30px]">
                <SubheadingTitle title="Related Blogs" />
                <div className="flex flex-wrap justify-around mx-auto mt-[30px] max-w-[1200px]">
                    {blogDataRelated.map((blog: BlogData) => {
                        return (
                            <Link key={blog.id} href={`/blog/${blog.title}`} className="embla__slide">
                                <BlogCard
                                    id={blog.id}
                                    title={blog.title}
                                    description={blog.description}
                                    date={blog.date}
                                    likes={blog.likes}
                                    coverPhotoUrl={blog.coverPhotoUrl}
                                />
                            </Link>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}