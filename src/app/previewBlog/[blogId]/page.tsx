import getBlogContent from "@/app/services/getBlogContent"
import { headers } from 'next/headers'
import formatContentToDescendantType from "../../../../utils/formatBlogContent"
import { BlogContent } from "../../../../types/blog"
import { Descendant } from "slate"
import ScrollToTop from "@/components/ScrollToTop"
import BlogMetaDetails from "@/components/BlogUI/BlogMetaDetails"
import BlogLikeCommentBar from "@/components/BlogUI/BlogLikeCommentBar"
import Image from "next/image"

export default async function page({ params }: { params: { blogId: string } }) {

    const headersList = headers()
    const userId = headersList.get('x-user-id')
    const { blogId } = params;

    // Check if user is logged in
    if (!userId) {
        throw new Error('Unauthorized access')
    }
    // Get blog data 
    const blogData = await getBlogContent(userId, blogId);

    // Error finding blog data
    if (!blogData) {
        throw new Error('Could not find blog data')
    }

    const formattedBlogData: Descendant[] = formatContentToDescendantType(blogData.content as BlogContent[])

    return (
        <main className="text-[var(--brown-600)] text-[19px] min-h-[100vh] m-[5%] rounded-md">
            <ScrollToTop />
            <BlogMetaDetails
                title={blogData.title}
                authorName={blogData.user.name as string}
                authorImgURL={blogData.user.image as string}
                coverImgAlt={'Blog cover image'}
                coverImgURL={blogData.pictureURL as string}
                readingLength={blogData.readDuration}
                publishDate={blogData.date.toLocaleDateString('en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                )}
            />

            {/* This will be the likes/comment button bar */}
            <BlogLikeCommentBar />

            {/* This is the Blog Image */}
            <Image
                src={blogData.pictureURL ? blogData.pictureURL : '/images/blogs/fillerImg.png'}
                width={700}
                height={394}
                alt="Image of thing, should replace with data"
                className="block mx-auto mb-[25px] md:mb-[40px]"
                priority
            />

            {/* This is the blog text */}
            <div className="max-w-[700px] mx-auto leading-9 px-3">
                {/* loop through descendant  */}
                {formattedBlogData.map((block) => {
                    if (block.type === 'paragraph') {
                        return (
                            block.children.map((blockDetails) => {
                                if (!blockDetails.text) return;
                                return (
                                    <p
                                        className={`
                                            ${blockDetails.bold ? 'font-bold' : ''}
                                            ${blockDetails.italic ? 'italic' : ''}
                                            ${blockDetails.underline ? 'underline' : ''}
                                        `}
                                    >
                                        {blockDetails.text}
                                    </p>
                                )
                            })
                        )
                    } else if (block.type.includes('list')) {
                        return (
                            <ul
                                className={`${block.type === 'numbered-list' ? 'list-decimal' : 'list-disc'} ml-[50px]`}
                            >
                                {block.children.map((blogBlock) => {
                                    return (
                                        blogBlock.children.map((listBlockDetails) => {
                                            if (!listBlockDetails.text) return;
                                            return (
                                                <li
                                                    className={`
                                                        ${listBlockDetails.bold ? 'font-bold' : ''}
                                                        ${listBlockDetails.italic ? 'italic' : ''}
                                                        ${listBlockDetails.underline ? 'underline' : ''}
                                                    `}
                                                >
                                                    {listBlockDetails.text}
                                                </li>
                                            )
                                        })
                                    )
                                })}
                            </ul>
                        )
                    }
                })}
            </div>
        </main>
    )
}
