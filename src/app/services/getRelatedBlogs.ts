import { prisma } from "../../../utils/prisma";

export default async function getRelatedBlogs(categories: { name: string; displayName: string }[], blogId: string) {
    try {
        const relatedBlogs = await prisma.blog.findMany({
            where: {
                isPublished: true,
                categories: {
                    some: {
                        name: {
                            in: categories.map((category) => category.name), // Match any category name in the provided array
                        },
                    },
                },
                AND: {
                    NOT: {
                        id: blogId, // Replace this with the ID you want to exclude
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
                readDuration: true,
                categories: true,
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })
        return relatedBlogs;
    } catch (error) {
        console.log('error getting related blogs ', error)
    }
}