import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getBlogsByCategory(categoryName: string) {
    try {
        const publishedBlogs = await prisma.blog.findMany({
            where: {
                isPublished: true,
                categories: {
                    some: {
                        name: categoryName,
                    },
                },
            },
            select: {
                id: true,
                title: true,
                description: true,
                publishedDate: true,
                coverPhotoUrl: true,
                likeCount: true,
                isPublished: true,
                categories: true,
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
        console.log('error getting blogs by category ', error)
    }
}