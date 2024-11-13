import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id: blogId } = params
        const { blogTitle: title, blogDescription: description } = await request.json();

        console.log('description ', description)
        console.log('title ', title)

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


        console.log('updated block', updatedBlog)

        return NextResponse.json({ message: updatedBlog })
    } catch (error) {
        console.log('error ', error)
    }

}