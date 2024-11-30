import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

// Route to create a blog with a title, user ID, and date
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
                user: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                replies: true
            }

        });
        return NextResponse.json({ message: 'Blog created successfully', comment: newComment });
    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}

// This is to like a comment 
export async function PUT(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');

        const { isLiking } = await request.json();
        console.log('likeing ', isLiking)



    } catch (error) {
        console.log('error adding like to comment ', error)
    }

}