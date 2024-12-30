import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '../../../../../../../utils/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const { id: blogId } = params;
        const { content, readDuration } = await request.json();

        // Extract image IDs or URLs from the content JSON
        // @ts-expect-error: no content type yet
        const extractImageIdsFromContent = (content): string[] => {
            const imageIds: string[] = [];
            // @ts-expect-error: no content type yet
            const traverseContent = (items) => {
                for (const item of items) {
                    if (item.type === 'image' && item.image?.id) {
                        imageIds.push(item.image.id);
                    }
                    if (item.children) {
                        traverseContent(item.children);
                    }
                }
            };
            traverseContent(content);
            return imageIds;
        };

        const imageIds = extractImageIdsFromContent(content);


        // Wrap Prisma operations in a transaction
        await prisma.$transaction(async (prisma) => {
            await prisma.blog.update({
                where: { id: blogId },
                data: {
                    content, // Pass the entire JSON object
                    readDuration,
                },
            });

            // Disconnect all current blog-image relationships
            const imagesToDisconnect = await prisma.image.findMany({
                where: { blogs: { some: { id: blogId } } },
            });

            await Promise.all(
                imagesToDisconnect.map((image) =>
                    prisma.image.update({
                        where: { id: image.id },
                        data: { blogs: { disconnect: { id: blogId } } },
                    })
                )
            );

            // Connect new images to the blog
            await Promise.all(
                imageIds.map((imageId) =>
                    prisma.image.update({
                        where: { id: imageId },
                        data: { blogs: { connect: { id: blogId } } },
                    })
                )
            );
        }, { timeout: 15000 });

        // Return success response
        return NextResponse.json({ message: 'success' });
    } catch (error) {
        console.error('Error during blog content update:', error);
        // Return error response
        return NextResponse.json({ error: 'Something went wrong while updating the blog' }, { status: 500 });
    }
}

