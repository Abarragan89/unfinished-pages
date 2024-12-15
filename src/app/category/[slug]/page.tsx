import Image from "next/image"
import Link from "next/link";
import MainHeading from "@/components/Headings/MainHeading";
import { BlogData } from "../../../../types/blog";
import BlogCard from "@/components/Cards/BlogCard";
import ScrollToTop from "@/components/ScrollToTop";
import getBlogsByCategory from "@/app/services/getBlogsByCategory";
import { cleanTitleForURL } from "../../../../utils/stringManipulation";
// import SearchInCategory from "@/components/SearchInCategory";

export default async function Page({ params }: { params: { slug: string } }) {

    const blogsData = await getBlogsByCategory(params.slug) as BlogData[]
    const acceptableSlugs = ['other', 'short-stories', 'diy', 'education-career', 'entertainment-sports', 'family-relationships', 'health-fitness', 'politics-philosophy', 'travel-food', 'business-technology']
    if (!acceptableSlugs.includes(params.slug)) throw new Error('No page available')
        
    return (
        <main className="text-[var(--off-black)] text-[19px] min-h-[100vh] rounded-md">
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
                    <MainHeading title={params.slug.toUpperCase().replace(/-/g, ' & ')} />
                </div>
            </header>
            {/* Search Bar */}
            <div className="my-8 max-w-[500px] w-[80%] mx-auto">
                {/* <SearchInCategory
                    category={params.slug.replace(/-/g, ' & ')}
                /> */}
            </div>
            {/* This is the related posts in the same category */}
            <div className="flex flex-wrap justify-around mx-auto mt-[30px] max-w-[1200px]">
                {blogsData.length > 0 ? blogsData.map((blog) => (
                    <Link key={blog.id} href={`/blog/${cleanTitleForURL(blog.title as string)}-${blog.id}`} className="embla__slide mb-[30px]">
                        <BlogCard
                            title={blog.title}
                            description={blog.description}
                            date={blog.date}
                            likeCount={blog.likeCount}
                            coverPhotoUrl={blog.coverPhotoUrl}
                            totalCommentCount={blog?._count?.comments ?? 0}
                        />
                    </Link>
                ))
                    :
                    <p className="text-center text-[1rem]">This category has no blogs.</p>

                }
            </div>
        </main>
    )
}