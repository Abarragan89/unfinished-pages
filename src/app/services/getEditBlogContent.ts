import { prisma } from "../../../utils/prisma";


export default async function getEditBlogContents(userId: string, blogId: string) {
    try {
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
                    orderBy: { orderNumber: 'asc' },
                    select: {
                        type: true,
                        image: {
                            select: {
                                id: true,
                                alt: true,
                                width: true,
                                height: true,
                                url: true,
                                isBlogCover: true
                            }
                        },
                        children: {
                            select: {
                                text: true,
                                bold: true,
                                italic: true,
                                underline: true,
                                url: true,
                                type: true,
                                children: {
                                    select: {
                                        text: true,
                                        bold: true,
                                        underline: true,
                                        italic: true,
                                        type: true,
                                        url: true,
                                        children: {
                                            select: {
                                                text: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                },
            },
        })
        return blogData;
    } catch (error) {
        console.log('error getting blog data', error)
    }

}
