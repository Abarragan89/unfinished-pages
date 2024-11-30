import Link from "next/link"
import BlogCard from "@/components/Cards/BlogCard"
import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import { HiPencilSquare } from "react-icons/hi2";
import CreateBlog from "@/components/Modals/CreateBlog";
import { prisma } from "../../../../utils/prisma";
import { headers } from 'next/headers'
import { formatDate } from "../../../../utils/formatDate";
import ScrollToTop from "@/components/ScrollToTop";

export default async function page() {
    const headersList = headers()
    const userId = headersList.get('x-user-id')
    const blogs = await prisma.blog.findMany(
        {
            where: { userId: userId as string },
            orderBy: { updatedAt: 'desc' }
        });
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
                {blogs.map((blog) => {
                    return (
                        <Link key={blog.id} href={`/editBlog/${blog.id}`}
                            className="my-[20px]"
                            scroll={true}
                        >
                            <BlogCard
                                id={blog.id}
                                title={blog.title}
                                coverPhotoUrl={blog.coverPhotoUrl as string}
                                description={blog.description as string}
                                date={formatDate(blog.updatedAt.toString())}
                                likeCount={blog.likeCount}
                            />
                        </Link>
                    )
                })}
            </section>
        </main>
    )
}