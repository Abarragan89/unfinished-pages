import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../utils/prisma';

// The POST is fired as soon as a user creates a new blog
export async function POST(request: NextRequest) {
    try {

        const newBlog = await prisma.blog.create({
            data: {
                
            }
        });

    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const content = await request.json();
        console.log('conetnt in backend ', content)
    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
    return Response.json(request)
}


