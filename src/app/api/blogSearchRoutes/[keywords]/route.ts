import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

// Get a Blog by category name 
export async function GET(request: NextRequest, { params }: { params: { keywords: string } }) {
    try {

        // Then update it. 
        const blogs = await prisma.blog.findMany({
            where: {
                isPublished: true, // Filter by published blogs
                OR: [
                    { title: { contains: params.keywords, mode: "insensitive" } },
                    { description: { contains: params.keywords, mode: "insensitive" } },
                    { tags: { contains: params.keywords, mode: "insensitive" } },
                ],
            },
            orderBy: { likeCount: 'desc' },
            take: 10,
            select: {
                id: true,
                title: true,
                description: true,
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
        return NextResponse.json(blogs)
    } catch (error) {
        console.log('error ', error)
    }
}