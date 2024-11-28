import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../utils/prisma';

// The POST is fired as soon as a user CREATES a new blog
export async function POST(request: NextRequest) {
    try {
        const { title } = await request.json()
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 500 });
        }
        const newBlog = await prisma.blog.create({
            data: {
                title,
                userId,
                date: new Date()
            }
        });
        return NextResponse.json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { userId, blogId } = await request.json();
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 500 });
        }

        // Get User Blog Ids
        const userBlogsIds: { id: string; }[] = await prisma.blog.findMany({
            where: { userId: userId as string },
            select: { id: true }
        })
        // Check If Owner of Blog
        const isAuthor: boolean = userBlogsIds.some(blog => blog.id === blogId)
        if (!isAuthor) {
            return NextResponse.json({ error: 'blog is now owned by user' }, { status: 400 })
        }

        // delete blog once checks are passed
        await prisma.blog.delete({
            where: { id: blogId }
        })

        return NextResponse.json({ message: 'deleted' }, { status: 200 })

    } catch (error) {
        console.log('error deleting blog', error)
    }
}



