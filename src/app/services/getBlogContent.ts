import { prisma } from "../../../utils/prisma";


export default async function getBlogContent(userId: string, blogId: string) {
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
                date: true,
                likes: true,
                readDuration: true,
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                content: {
                    orderBy: { orderNumber: 'asc' },
                    select: {
                        type: true,
                        url: true,
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
        return blogData;
    } catch (error) {
        console.log('error getting blog data', error)
    }

}
