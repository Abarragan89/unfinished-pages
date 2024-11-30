import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../utils/prisma';

// Route to create a blog with a title, user ID, and date
export async function POST(request: NextRequest) {
    try {
        const { title } = await request.json()
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }
        const newBlog = await prisma.blog.create({
            data: {
                title,
                userId,
            }
        });
        return NextResponse.json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}