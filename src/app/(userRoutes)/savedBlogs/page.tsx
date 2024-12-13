import Link from "next/link"
import BlogCard from "@/components/Cards/BlogCard"
import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import CreateBlog from "@/components/Modals/CreateBlog";
import { headers } from 'next/headers'
import { BlogData } from "../../../../types/blog";
import ScrollToTop from "@/components/ScrollToTop";
import getUserSavedBlogs from "../../services/getUserSavedBlogs";
import { cleanTitleForURL } from "../../../../utils/stringManipulation";

export default async function page() {
    const headersList = headers()
    const userId = headersList.get('x-user-id')


    if (!userId) {
        throw new Error('No authorized to see this page')
    }

    const blogs = await getUserSavedBlogs(userId) as BlogData[]

    return (
        <main className="pt-[50px] min-h-[100vh]">
            <ScrollToTop />
            <CreateBlog />
            <SubheadingTitle title="Saved Blogs" />
            <section className="flex flex-wrap justify-around max-w-[1200px] mx-auto ">
                {blogs.length > 0 ? blogs.map((blog) => {
                    return (
                        <Link key={blog.id} href={`/blog/${cleanTitleForURL(blog.title as string)}-${blog.id}`}
                            className="my-[20px]"
                            scroll={true}
                        >
                            <BlogCard
                                title={blog.title}
                                description={blog.description}
                                date={blog.date}
                                likeCount={blog.likeCount}
                                coverPhotoUrl={blog.coverPhotoUrl}
                                totalCommentCount={blog?._count?.comments ?? 0}
                                isPublished={blog.isPublished}
                            />
                        </Link>
                    )
                })
                    :
                    <p className="text-center text-[.95rem]">No blogs have been saved</p>
                }
            </section>
        </main>
    )
}