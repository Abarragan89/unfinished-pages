import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

// This is to like a comment 
export async function PUT(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'You must be logged in' }, { status: 403 });
        }

        const { blogId } = await request.json();
        // Start a transaction
        await prisma.$transaction(async (prisma) => {
            // Check if the user has already liked the comment
            const existingLike = await prisma.blogLike.findUnique({
                where: { userId_blogId: { userId, blogId } }
            });

            if (!existingLike) {
                // Add a new like if not already liked
                await prisma.blogLike.create({
                    data: {
                        userId,
                        blogId
                    }
                });

                // Update the comment's likes
                await prisma.blog.update({
                    where: { id: blogId },
                    data: { likeCount: { increment: 1 } }
                });
            } else if (existingLike) {
                // Remove the like if the user is unliking the comment
                await prisma.blogLike.delete({
                    where: { userId_blogId: { userId, blogId } }
                });

                // Decrement the likes on the comment
                await prisma.blog.update({
                    where: { id: blogId },
                    data: { likeCount: { decrement: 1 } }
                });
            }
        });


        return NextResponse.json({ likeToggled: 'success' }, { status: 200 })
    } catch (error) {
        console.log('error adding like to comment ', error)
    }
}