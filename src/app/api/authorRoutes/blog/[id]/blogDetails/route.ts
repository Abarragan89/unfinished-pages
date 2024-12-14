import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const { id: blogId } = params
        const { blogTitle: title, blogDescription: description, blogCategories: categories, blogTags: tags  } = await request.json();

        if (!title) {
            return NextResponse.json({ error: 'title is required' })
        }

        // get current blogs categories so i can disconnect and reset categories
        const updatedBlog = await prisma.$transaction(async (prisma) => {
            // Get the current categories associated with the blog
            const blog = await prisma.blog.findUnique({
                where: { id: blogId },
                select: {
                    categories: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            // Format current categories to use in disconnect
            const disconnectCategories = blog?.categories.map((category) => ({
                name: category.name
            }));

            console.log('disconneted categories ', disconnectCategories)

            // Update the blog and categories
            return await prisma.blog.update({
                where: { id: blogId },
                data: {
                    title,
                    description,
                    tags,
                    categories: {
                        disconnect: disconnectCategories,
                        connect: categories.map((category: { [key: string]: string }) => ({
                            name: category.name,
                            displayName: category.displayName
                        }))
                    }
                }
            });
        });

        return NextResponse.json({ message: updatedBlog })
    } catch (error) {
        console.log('error ', error)
        return NextResponse.json(error)
    }
}

