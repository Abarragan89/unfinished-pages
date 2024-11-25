import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma'


export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) return NextResponse.json({ error: 'user not logged in' }, { status: 403 });

        const userImages = await prisma.image.findMany({
            where: { userId }
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

        // Search all blogs where the image is used
        const blogsUsingImage = await prisma.blog.findMany({
            where: {
                content: {
                    some: {
                        type: 'image',
                        imageId: imageId,
                    },
                },
            },
            select: {
                id: true,
                title: true,
            },
        });

        // if  image is not in use, delete it
        if (blogsUsingImage.length === 0) {
            await prisma.image.delete({
                where: { id: imageId }
            })
            return NextResponse.json({ blogs: [] }, { status: 200 });
            // or else, give back the blog titles
        } else {
            return NextResponse.json({ blogs: blogsUsingImage }, { status: 200 });
        }
    } catch (error) {
        console.log('error getting user images', error)
    }
}