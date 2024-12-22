import Link from "next/link"
import BlogCard from "@/components/Cards/BlogCard"
import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import { HiPencilSquare } from "react-icons/hi2";
import CreateBlog from "@/components/Modals/CreateBlog";
import { headers } from 'next/headers'
import { BlogData } from "../../../../types/blog";
import ScrollToTop from "@/components/ScrollToTop";
import getAuthorBlogs from "@/app/services/getAuthorBlogs";
import { formatDate } from "../../../../utils/formatDate";

export default async function page() {
    const headersList = headers()
    const userId = headersList.get('x-user-id')
    const isAuthor = headersList.get('x-is-author') === 'true' ? true : false;


    if (!userId || !isAuthor) {
        throw new Error('No authorized to see this page')
    }

    const blogs = await getAuthorBlogs(userId) as BlogData[]

    return (
        <main className="pt-[50px] min-h-[100vh]">
            <ScrollToTop />
            <CreateBlog />
            <SubheadingTitle title="My Blogs" />
            <div className="absolute right-[25px] top-[80px]">
                <Link href={'/myBlogs?showModal=createBlog'} className="flex items-center custom-small-btn bg-[var(--off-black)]">
                    <HiPencilSquare size={16} />
                    <span className="ml-2">Write</span>
                </Link>
            </div>
            <section className="flex flex-wrap justify-around max-w-[1200px] mx-auto ">
                {blogs.length > 0 ? blogs.map((blog) => {
                    return (
                        <Link key={blog.id} href={`/editBlog/${blog.id}`}
                            className="my-[20px]"
                            scroll={true}
                        >
                            <BlogCard
                                title={blog.title}
                                description={blog.description}
                                date={blog.publishedDate ? formatDate(blog.publishedDate) : ''}
                                likeCount={blog.likeCount}
                                coverPhotoUrl={blog.coverPhotoUrl}
                                totalCommentCount={blog?._count?.comments ?? 0}
                                isPublished={blog.isPublished}
                                readDuration={blog.readDuration}
                            />
                        </Link>
                    )
                }) :
                    <p className="text-center text-[1.05rem]">Write your first blog!</p>
                }
            </section>
        </main>
    )
}