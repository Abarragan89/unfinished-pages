import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const { id: blogId } = params
        const { blogTitle: title, blogDescription: description } = await request.json();

        if (!title) {
            return NextResponse.json({ error: 'title is required' })
        }

        const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data: {
                title,
                description
            }
        })

        return NextResponse.json({ message: updatedBlog })
    } catch (error) {
        console.log('error ', error)
    }
}

