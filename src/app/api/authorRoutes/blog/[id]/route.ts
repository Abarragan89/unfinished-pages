import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../utils/prisma';

// Route to Publish The Blog
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const { id: blogId } = params
        const { data } = await request.json();

        // Get Blog
        const blogToUpdate = await prisma.blog.findUnique({
            where: { id: blogId },
            select: {
                description: true,
                coverPhotoUrl: true,
                readDuration: true,
            }
        })


        // Check for required fields 
        if (!blogToUpdate?.description) {
            return NextResponse.json({ error: 'Blog Description Required' }, { status: 400 })
        }
        if (!blogToUpdate?.coverPhotoUrl) {
            return NextResponse.json({ error: 'Cover Photo Required' }, { status: 400 })
        }

        // Categorize as a 3 min blog if it is less than a 3 min read.
        if (blogToUpdate.readDuration <= 3) {
            // Then update it. 
            await prisma.blog.update({
                where: { id: blogId },
                data: {
                    categories: {
                        connect: {
                            name: '3-minute-reads',
                            displayName: '3 Minute Reads'
                        },
                    },
                }
            })
        }

        // Then update it. 
        await prisma.blog.update({
            where: { id: blogId },
            data: {
                isPublished: data.isPublished,
                publishedDate: new Date(),
            }
        })
        return NextResponse.json({ message: 'success' })
    } catch (error) {
        console.log('error ', error)
    }
}

// Route to Delete the blog
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = await request.json();
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const { id: blogId } = params

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
