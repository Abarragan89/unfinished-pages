import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getAuthorBlogs(userId: string) {
    const publishedBlogs = await prisma.blog.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            description: true,
            publishedDate: true,
            coverPhotoUrl: true,
            likeCount: true,
            isPublished: true,
            _count: {
                select: {
                    comments: true
                }
            }
        }
    })
    return publishedBlogs;
}