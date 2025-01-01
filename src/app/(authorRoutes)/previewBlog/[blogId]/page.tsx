import getPreviewBlogContent from '@/app/services/getPreviewBlogContent'
import { headers } from 'next/headers'
import formatContentToDescendantType from "../../../../../utils/formatBlogContent"
import { BlogContent } from "../../../../../types/blog"
import { Descendant } from "slate"
import ScrollToTop from "@/components/ScrollToTop"
import BlogMetaDetails from "@/components/BlogUI/BlogMetaDetails"
import BlogLikeCommentBar from "@/components/BlogUI/BlogLikeCommentBar"
import Image from "next/image"
import consolidateCodeBlocks from "../../../../../utils/consolidateCodeBlocks"
import BlogContentSection from "@/components/BlogUI/BlogContentSection"

export default async function page({ params }: { params: { blogId: string } }) {

    const headersList = headers()
    const userId = headersList.get('x-user-id')
    const { blogId } = params;

    // Check if user is logged in
    if (!userId) {
        throw new Error('Unauthorized access')
    }
    // Get blog data 
    const blogData = await getPreviewBlogContent(userId, blogId);

    // Error finding blog data
    if (!blogData) {
        throw new Error('Could not find blog data')
    }

    const consolidatedData: BlogContent[] = consolidateCodeBlocks(blogData.content as unknown as BlogContent[]);

    return (
        <main className="text-[var(--off-black)] text-[19px] min-h-[100vh] mx-[5%] mt-[60px] rounded-md">
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
                isShortStory={blogData?.categories?.some((category) => category.name === 'short-stories')}
            />

            {/* This will be the likes/comment button bar */}
            <BlogLikeCommentBar
                likes={blogData.likes}
                commentCount={blogData._count.comments}
            />

            {/* This is the Blog Image */}
            <Image
                src={blogData.coverPhotoUrl ? blogData.coverPhotoUrl : '/images/blogs/fillerImg.png'}
                width={700}
                height={394}
                alt="Image of thing, should replace with data"
                className="block mx-auto mb-7"
                priority
            />

            {/* This is the blog text */}
            <BlogContentSection
                blogContent={consolidatedData}
            />
        </main>
    )
}
