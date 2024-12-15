import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

// Get a Blog by category name 
export async function GET(request: NextRequest, { params }: { params: { keywords: string } }) {
    try {

        // Then update it. 
        const blogs = await prisma.blog.findMany({
            where: {
                isPublished: true, // Filter by published blogs
                categories: {
                    some: {
                        name: params.keywords, // Match the category by ID
                    },
                },
            },
            select: {
                id: true,
                title: true,
                description: true,
                publishedDate: true,
                coverPhotoUrl: true,
                likeCount: true,
                isPublished: true,
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        });
        return NextResponse.json({ message: 'success' })
    } catch (error) {
        console.log('error ', error)
    }
}