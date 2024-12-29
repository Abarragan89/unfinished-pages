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

            // Create new content blocks
            // for (const [index, contentItem] of content.entries()) {
            //     await prisma.contentBlock.create({
            //         data: {
            //             blogId,
            //             type: contentItem.type, // paragraph, heading, etc.
            //             imageId: contentItem?.image?.id || null,
            //             orderNumber: index,
            //             videoUrl: contentItem.videoUrl || null,
            //             children: {
            //                 create: await Promise.all(
            //                     // @ts-expect-error: need to find type for nested content children
            //                     contentItem.children.map(async (detail) => ({
            //                         url: detail.url || null,
            //                         text: detail.text || '',
            //                         bold: detail.bold || false,
            //                         italic: detail.italic || false,
            //                         underline: detail.underline || false,
            //                         type: detail.type || null, // list-type or link
            //                         children: detail.children ? {
            //                             create: await Promise.all(
            //                                 // @ts-expect-error: need to find type for nested content children
            //                                 detail.children.map(async (item) => ({
            //                                     text: item.text || '',
            //                                     bold: item.bold || false,
            //                                     italic: item.italic || false,
            //                                     underline: item.underline || false,
            //                                     type: item.type || null, // this is for inline anchor tags in lists
            //                                     url: item.url || null,
            //                                     children: item.children ? {
            //                                         create: await Promise.all(
            //                                             // @ts-expect-error: need to find type for nested content children
            //                                             item.children.map(async (child) => ({
            //                                                 text: child.text || '',
            //                                             }))
            //                                         ),
            //                                     } : undefined,
            //                                 }))
            //                             ),
            //                         } : undefined,
            //                     }))
            //                 ),
            //             },
            //         },
            //     });
            // }

            // // Update blog readDuration
            // await prisma.blog.update({
            //     where: { id: blogId },
            //     data: {
            //         readDuration
            //     }
            // });
        }, { timeout: 25000 });

        // Return success response
        return NextResponse.json({ message: 'success' });
    } catch (error) {
        console.error('Error during blog content update:', error);
        // Return error response
        return NextResponse.json({ error: 'Something went wrong while updating the blog' }, { status: 500 });
    }
}

