import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

// Route to create a new comment on a blog
export async function POST(request: NextRequest) {
    try {
        const { text, blogId, commentId } = await request.json()
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }
        const newComment = await prisma.comment.create({
            data: {
                text,
                userId,
                blogId,
                parentId: commentId
            },
            select: {
                createdAt: true,
                id: true,
                text: true,
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