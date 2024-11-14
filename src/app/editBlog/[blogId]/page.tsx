import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import SlateRichText from "@/components/EditBlogUI/SlateRichText"
import EditMetaData from "@/components/EditBlogUI/EditMetaData"
import { Suspense } from 'react'
import { headers } from 'next/headers'
import ScrollToTop from "@/components/ScrollToTop"
import { prisma } from "../../../../utils/prisma"

export default async function editBlog({ params }: { params: { blogId: string } }) {

    const headersList = headers()
    const userId = headersList.get('x-user-id')
    const { blogId } = params;

    if (!userId) {
        throw new Error('Unauthorized access')
    }
    // Get User Blog Ids
    const userBlogsIds: { id: string; }[] = await prisma.blog.findMany({
        where: { userId: userId as string },
        select: { id: true }
    })
    // Check If Owner of Blog
    const isAuthor: boolean = userBlogsIds.some(blog => blog.id === blogId)
    if (!isAuthor) {
        throw new Error('Unauthorized access')
    }

    // Get Data if above checks don't fail
    const blogData = await prisma.blog.findUnique({
        where: { id: blogId },
        select: {
            id: true,
            title: true,
            description: true,
            pictureURL: true,
            content: {
                orderBy: { orderNumber: 'asc'},
                select: {
                    type: true,
                    children: {
                        select: {
                            text: true,
                            bold: true,
                            italic: true,
                            underline: true,
                            type: true,
                            children: { 
                                select: {
                                    text: true,
                                    bold: true,
                                    underline: true,
                                    italic: true,
                                }
                            }
                        }
                    }
                },
            },
        },
    })

    console.log('blog from query ', blogData)
    // Error finding blog data
    if (!blogData) {
        throw new Error('Could not find blog data')
    }

    return (
        <main className="mt-3">
            <Suspense>
                <ScrollToTop />
                <SubheadingTitle title={'Create Blog'} />
                <EditMetaData
                    title={blogData.title}
                    description={blogData.description || ""}
                    pictureURL={blogData.pictureURL || ""}
                    blogId={blogId as string}
                />
                <SlateRichText
                    blogId={blogId as string}
                    blogContent={blogData.content as []}
                />
            </Suspense>
        </main>
    )
}

