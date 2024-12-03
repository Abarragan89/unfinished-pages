import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getUserSavedBlogs(userId: string) {


    const savedBlogs = await prisma.blogLike.findMany({
        where: { 
            userId,
            blog: {
                isPublished: true // filter only published blogs at the blog level
            }
        },
        select: {
            blog: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    publishedDate: true,
                    coverPhotoUrl: true,
                    likeCount: true,
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    // to maintain the same strucutre as BlogData[]
    const transformedSavedBlogs = savedBlogs.map((savedBlog) => savedBlog.blog);

    return transformedSavedBlogs;


}