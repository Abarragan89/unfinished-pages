import { prisma } from "../../../utils/prisma";


export default async function getEditBlogContents(userId: string, blogId: string) {
    try {
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
                tags: true,
                isPublished: true,
                categories: {
                    select: { name: true, displayName: true }
                },
                coverPhotoUrl: true,
                content: true,
            },
        })
        return blogData;
    } catch (error) {
        console.log('error getting blog data', error)
    }

}
