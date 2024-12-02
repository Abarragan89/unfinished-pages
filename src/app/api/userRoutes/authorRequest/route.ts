import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

// Route to create a new author request
export async function POST(request: NextRequest) {
    try {
        const { aboutText, whyBlogText, topicsText } = await request.json()
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const authorRequest = await prisma.authorRequest.create({
            data: {
                userId,
                aboutText,
                whyBlogText,
                topicsText
            }
        })

        return NextResponse.json(authorRequest, { status: 200 })

    } catch (error) {
        console.error('Error creating author request ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}

export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const authorRequest = await prisma.authorRequest.findUnique({
            where: { userId: userId }
        })

        return NextResponse.json(authorRequest, { status: 200 })

    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }
        // delete request
        await prisma.authorRequest.delete({
            where: { userId: userId }
        })

        return NextResponse.json({ message: 'success' }, { status: 200 })

    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}

