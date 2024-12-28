import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getAuthorBlogs(userId: string) {
    try {
        const publishedBlogs = await prisma.blog.findMany({
            where: {
                userId
            },
            orderBy: {
                publishedDate: 'desc'
            },
            select: {
                id: true,
                title: true,
                description: true,
                publishedDate: true,
                coverPhotoUrl: true,
                likeCount: true,
                isPublished: true,
                readDuration: true,
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })
        return publishedBlogs;
    } catch (error) {
        console.log('error getting author blogs ', error)
    }
}