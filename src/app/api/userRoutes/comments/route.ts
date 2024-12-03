import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

// Route to create a new comment on a blog
export async function POST(request: NextRequest) {
    try {
        const { text, blogId, } = await request.json()
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }
        const newComment = await prisma.comment.create({
            data: {
                text,
                userId,
                blogId
            },
            select: {
                createdAt: true,
                id: true,
                text: true,
                _count: {
                    select: {replies: true}
                },
                likes: {
                    select: {
                        id: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                replies: true
            }

        });
        return NextResponse.json({ message: 'comment sucessfully added', comment: newComment });
    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}

// This is to like a comment 
export async function PUT(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'You must be logged in' }, { status: 403 });
        }

        const { commentId } = await request.json();
        // Start a transaction
        await prisma.$transaction(async (prisma) => {
            // Check if the user has already liked the comment
            const existingLike = await prisma.commentLike.findUnique({
                where: { userId_commentId: { userId, commentId } }
            });

            if (!existingLike) {
                // Add a new like if not already liked
                await prisma.commentLike.create({
                    data: {
                        userId,
                        commentId
                    }
                });

                // Update the comment's likes
                await prisma.comment.update({
                    where: { id: commentId },
                    data: { likeCount: { increment: 1 } }
                });
            } else if (existingLike) {
                // Remove the like if the user is unliking the comment
                await prisma.commentLike.delete({
                    where: { userId_commentId: { userId, commentId } }
                });

                // Decrement the likes on the comment
                await prisma.comment.update({
                    where: { id: commentId },
                    data: { likeCount: { decrement: 1 } }
                });
            }
        });




        return NextResponse.json({ likeToggled: 'success' }, { status: 200 })
    } catch (error) {
        console.log('error adding like to comment ', error)
    }
}