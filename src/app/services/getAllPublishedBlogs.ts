import { prisma } from "../../../utils/prisma";

// Get blog data for sitemap
export default async function getAllPublishedBlogs() {
    try {
        const publishedBlogs = await prisma.blog.findMany({
            where: {
                isPublished: true
            },
            select: {
                id: true,
                title: true,
                updatedAt: true
            }
        })
        return publishedBlogs;
    } catch (error) {
        console.log('error getting all published Blogs', error)
    }
}