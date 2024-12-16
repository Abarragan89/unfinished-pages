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

        // Search all blogs where the image is used
        const blogsUsingImageInContent = await prisma.blog.findMany({
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

        // need the picture url to see if it is used as a cover photo
        const pictureURL = await prisma.image.findUnique({
            where: { id: imageId },
            select: {
                url: true
            }
        })

        if (!pictureURL?.url) {
            return NextResponse.json({ error: 'image not found' }, { status: 400 })
        }
        const blogsUsingImageAsCover = await prisma.blog.findMany({
            where: {
                coverPhotoUrl: pictureURL!.url
            },
            select: {
                id: true,
                title: true
            }
        })

        const blogsUsingImage = [...blogsUsingImageInContent, ...blogsUsingImageAsCover]
        const uniqueBlogs = Array.from(
            new Map(blogsUsingImage.map(blog => [blog.id, blog])).values()
        );

        // delete it from s3 bucket 


        // if  image is not in use, delete it from Prisma
        if (uniqueBlogs.length === 0) {
            await prisma.image.delete({
                where: { id: imageId }
            })


            return NextResponse.json({ blogs: [] }, { status: 200 });
            // or else, give back the blog titles
        } else {
            return NextResponse.json({ blogs: uniqueBlogs }, { status: 200 });
        }
    } catch (error) {
        console.log('error getting user images', error)
    }
}