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
import { Comment } from "../../../../types/comment";
import { cleanTitleForURL } from "../../../../utils/stringManipulation";
import getRelatedBlogs from "@/app/services/getRelatedBlogs";
import { formatDate } from "../../../../utils/formatDate";

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
            url: `https://www.unfinishedpages.com/blog/${cleanTitleForURL(blogData.title)}-${blogData.id}`,
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
            canonical: `https://www.unfinishedpages.com/blog/${cleanTitleForURL(blogData.title)}-${blogData.id}`
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
            likes: [],
            likeCount: 0,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg',
            comments: []
        },
        {
            id: '2',
            title: 'Mastering the Art of Productivity: Tips for Daily Success',
            description: 'Your go-to source for in-depth articles on tech, wellness, and creativity. Explore fresh perspectives and tips for thriving in todays world.!',
            date: 'August 29, 2024',
            likes: [],
            likeCount: 0,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg',
            comments: []
        },
        {
            id: '3',
            title: 'Healthy Living Hacks: Simple Changes for a Better Life',
            description: 'Uncover practical solutions and fresh ideas for work, wellness, and creativity. Join us on a journey to live more inspired, balanced lives.',
            date: 'July 12, 2023',
            likes: [],
            likeCount: 0,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg',
            comments: []
        },
        {
            id: '4',
            title: 'Exploring the Future of AI: Trends and Innovations Ahead',
            description: 'Explore actionable insights and stories across tech, health, and creativity, designed to help you grow, learn, and live with purpose.',
            date: 'Decemeber 25, 2024',
            likes: [],
            likeCount: 0,
            coverPhotoUrl: '/images/topicCardImgs/family.jpg',
            comments: []
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

    // get related blog data
    const relatedBlogs = await getRelatedBlogs(blogData.categories, blogId) as unknown as BlogData[]
    const formattedBlogData: Descendant[] = formatContentToDescendantType(blogData.content as BlogContent[])
    const consolidatedData: BlogContent[] = consolidateCodeBlocks(formattedBlogData as BlogContent[]);

    return (
        <main className="text-[var(--off-black)] text-[19px] min-h-[100vh] mx-[5%] my-[40px] rounded-md">
            <ScrollToTop />
            <BlogMetaDetails
                title={blogData.title}
                authorName={blogData.user.name as string}
                authorImgURL={blogData.user.image as string}
                coverImgAlt={'Blog cover image'}
                coverImgURL={blogData.coverPhotoUrl as string}
                readingLength={blogData.readDuration}
                publishDate={blogData.updatedAt.toLocaleDateString('en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                )}
            />

            {/* This will be the likes/comment button bar */}
            <BlogLikeCommentBar
                likes={blogData.likes}
                blogId={blogData.id}
                commentCount={blogData._count.comments}
                // These props are only for live sites for the share options
                blogUrl={`https://www.unfinishedpages.com/blog/${cleanTitleForURL(blogData.title)}-${blogId}`}
                blogDescription={blogData.description as string}
                blogTitle={blogData.title}
                blogCoverPhotoUrl={blogData.coverPhotoUrl as string}

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
            <hr className="mt-[50px] max-w-[700px] mx-auto" />
            <CommentSection
                blogId={blogData.id}
                blogTitle={blogData.title}
                blogComments={blogData.comments as Comment[]}
            />

            {/* This is the related posts in the same category */}
            <hr className="mt-[50px] max-w-[700px] mx-auto" />
            <section className="mt-[30px]">
                <SubheadingTitle title="Related Blogs" />
                <div className="flex flex-wrap justify-around mx-auto mt-[30px] max-w-[700px]">
                    {relatedBlogs && relatedBlogs.map((blog: BlogData) => {
                        return (
                            <Link key={blog.id} href={`/blog/${cleanTitleForURL(blog.title as string)}-${blog.id}`} className="my-5">
                                <BlogCard
                                    title={blog.title}
                                    description={blog.description}
                                    date={blog.publishedDate ? formatDate(blog.publishedDate) : ''}
                                    likeCount={blog.likeCount}
                                    coverPhotoUrl={blog.coverPhotoUrl}
                                    totalCommentCount={4}
                                    readDuration={blog.readDuration}
                                />
                            </Link>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}