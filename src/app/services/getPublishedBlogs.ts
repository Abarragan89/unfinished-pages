import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getPublishedBlogs() {
    try {
        const publishedBlogs = await prisma.blog.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                likeCount: 'desc'
            },
            take: 10,
            select: {
                id: true,
                title: true,
                description: true,
                publishedDate: true,
                coverPhotoUrl: true,
                likeCount: true,
                isPublished: true,
                readDuration: true,
                categories: true,
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })
        return publishedBlogs;
    } catch (error) {
        console.log('error getting all published Blogs', error)
    }
}