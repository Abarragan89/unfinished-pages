import Link from "next/link"
import BlogCard from "@/components/Cards/BlogCard"
import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import { HiPencilSquare } from "react-icons/hi2";
import CreateBlog from "@/components/Modals/CreateBlog";
import { prisma } from "../../../utils/prisma";
import { headers } from 'next/headers'
import { formatDate } from "../../../utils/formatDate";

export default async function page() {
    const headersList = headers()
    const userId = headersList.get('x-user-id')

    const blogs = await prisma.blog.findMany({ where: { userId: userId as string } });

    return (
        <main className="pt-[30px]">
            <CreateBlog />
            <SubheadingTitle title="My Blogs" />
            <div className="absolute right-[25px] top-[80px]">
                <Link href={'/myBlogs?showModal=createBlog'} className="flex items-center custom-small-btn">
                    <HiPencilSquare size={16} />
                    <span className="ml-2">Write</span>
                </Link>
            </div>
            <section className="flex flex-wrap justify-around max-w-[1200px] mx-auto ">
                {blogs.map((blog) => {
                    return (
                        <Link key={blog.id} href={`/editBlog/${blog.id}`}
                            className="my-[20px]"
                        >
                            <BlogCard
                                id={blog.id}
                                title={blog.title}
                                pictureURL={blog.pictureURL as string}
                                description={blog.description as string}
                                date={formatDate(blog.date.toString())}
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


// TODO
// get create blog handler to move to edit page
// add icon spinner to button
// create edit page and render data
// complete form to edit all blog data (title, description, keywords, categories or tags) 
// add a-tags in rich text editor
// add videos in rich text editor
// publish button in edit page
// start using SWR or React Query
// 8. Save Data
// 9. Render data on Draft mode
// 10. Render data on Blog page
// 11. Show user their own blogs
// 12 make blogs editable
// 13. TEST
// 14 Make 20 blogs
// 15. Google Ads
