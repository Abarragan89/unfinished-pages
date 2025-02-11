import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma'


export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) return NextResponse.json({ error: 'user not logged in' }, { status: 403 });

        const userImages = await prisma.image.findMany({
            where: {
                userId,
                alt: { not: 'profile-pic' }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({ userImages }, { status: 200 })
    } catch (error) {
        console.log('error getting user images', error)
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { imageId } = await request.json();
        const userId = request.headers.get('x-user-id');
        if (!userId) return NextResponse.json({ error: 'user not logged in' }, { status: 403 });

        // Check if the image exists
        const image = await prisma.image.findUnique({
            where: { id: imageId },
            select: {
                url: true,
                blogs: {
                    select: { id: true, title: true },
                },
            },
        });

        if (!image) {
            return NextResponse.json({ error: 'image not found' }, { status: 400 });
        }

        // Check if the image is being used as a cover photo
        const blogsUsingImageAsCover = await prisma.blog.findMany({
            where: { coverPhotoUrl: image.url },
            select: { id: true, title: true },
        });

        // Combine results of blogs using the image
        const uniqueBlogs = Array.from(
            new Map(
                [...image.blogs, ...blogsUsingImageAsCover].map((blog) => [blog.id, blog])
            ).values()
        );

        // If the image is not in use, delete it
        if (uniqueBlogs.length === 0) {
            await prisma.image.delete({ where: { id: imageId } });

            // Return success response
            return NextResponse.json({ blogs: [] }, { status: 200 });
        }

        // Return the list of blogs using the image
        return NextResponse.json({ blogs: uniqueBlogs }, { status: 200 });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json(
            { error: 'Something went wrong while deleting the image' },
            { status: 500 }
        );
    }
}
