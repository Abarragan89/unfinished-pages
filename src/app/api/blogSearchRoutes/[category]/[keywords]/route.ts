import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../utils/prisma';

// Get a Blog by category name 
export async function GET(request: NextRequest, { params }: { params: { categoryName: string, keywords: string } }) {
    try {

        // Then update it. 
        const blogs = await prisma.blog.findMany({
            where: {
                isPublished: true, // Filter by published blogs
                categories: {
                    some: {
                        name: params.categoryName, // Match the category by name
                    },
                },
                OR: [
                    { title: { contains: params.keywords, mode: "insensitive" } },
                    { description: { contains: params.keywords, mode: "insensitive" } },
                    { tags: { contains: params.keywords, mode: "insensitive" } },
                ],
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
        return NextResponse.json(blogs)
    } catch (error) {
        console.log('error ', error)
    }
}