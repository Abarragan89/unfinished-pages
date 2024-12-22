// import { NextResponse, type NextRequest } from 'next/server';
// import { prisma } from '../../../../../../../utils/prisma';
// import { BlogContent } from '../../../../../../../types/blog';

// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const userId = request.headers.get('x-user-id');
//         if (!userId) {
//             return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
//         }

//         const { id: blogId } = params;
//         const { content, readDuration } = await request.json();

//         // Wrap Prisma operations in a transaction
//         await prisma.$transaction(async (prisma) => {
//             // Delete all content blocks for the blog
//             await prisma.contentBlock.deleteMany({
//                 where: { blogId }
//             });

//             // Create new content blocks
//             await Promise.all(
//                 content.map(async (content: BlogContent, index: number) => {
//                     return prisma.contentBlock.create({
//                         data: {
//                             blogId,
//                             type: content.type, // paragraph, heading, etc.
//                             imageId: content?.image?.id || null,
//                             orderNumber: index,
//                             videoUrl: content.videoUrl || null,
//                             children: {
//                                 create: content.children.map((detail) => ({
//                                     url: detail.url || null,
//                                     text: detail.text || '',
//                                     bold: detail.bold || false,
//                                     italic: detail.italic || false,
//                                     underline: detail.underline || false,
//                                     type: detail.type || null, // list-type or link
//                                     children: detail.children ? {
//                                         create: detail.children.map((item) => ({
//                                             text: item.text || '',
//                                             bold: item.bold || false,
//                                             italic: item.italic || false,
//                                             underline: item.underline || false,
//                                             type: item.type || null, // this is for inline anchor tags in lists
//                                             url: item.url || null,
//                                             children: item.children ? {
//                                                 create: item.children.map((item) => ({
//                                                     text: item.text || '',
//                                                 }))
//                                             } : undefined,
//                                         }))
//                                     } : undefined,
//                                 })),
//                             },
//                         },
//                     });
//                 })
//             );
//             // Update blog readDuration
//             await prisma.blog.update({
//                 where: { id: blogId },
//                 data: {
//                     readDuration
//                 }
//             });
//         },
//         {timeout: 20000}
//     );

//         // Return success response
//         return NextResponse.json({ message: 'success' });
//     } catch (error) {
//         console.error('Error during blog content update:', error);
//         // Return error response
//         return NextResponse.json({ error: 'Something went wrong while updating the blog' }, { status: 500 });
//     }
// }

import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '../../../../../../../utils/prisma';
import { BlogContent } from '../../../../../../../types/blog';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const { id: blogId } = params;
        const { content, readDuration } = await request.json();

        // Wrap Prisma operations in a transaction
        await prisma.$transaction(async (prisma) => {
            // Delete all content blocks for the blog
            await prisma.contentBlock.deleteMany({
                where: { blogId }
            });

            // Create new content blocks
            for (const [index, contentItem] of content.entries()) {
                await prisma.contentBlock.create({
                    data: {
                        blogId,
                        type: contentItem.type, // paragraph, heading, etc.
                        imageId: contentItem?.image?.id || null,
                        orderNumber: index,
                        videoUrl: contentItem.videoUrl || null,
                        children: {
                            create: await Promise.all(
                                // @ts-expect-error: need to find type for nested content children
                                contentItem.children.map(async (detail) => ({
                                    url: detail.url || null,
                                    text: detail.text || '',
                                    bold: detail.bold || false,
                                    italic: detail.italic || false,
                                    underline: detail.underline || false,
                                    type: detail.type || null, // list-type or link
                                    children: detail.children ? {
                                        create: await Promise.all(
                                            // @ts-expect-error: need to find type for nested content children
                                            detail.children.map(async (item) => ({
                                                text: item.text || '',
                                                bold: item.bold || false,
                                                italic: item.italic || false,
                                                underline: item.underline || false,
                                                type: item.type || null, // this is for inline anchor tags in lists
                                                url: item.url || null,
                                                children: item.children ? {
                                                    create: await Promise.all(
                                                        // @ts-expect-error: need to find type for nested content children
                                                        item.children.map(async (child) => ({
                                                            text: child.text || '',
                                                        }))
                                                    ),
                                                } : undefined,
                                            }))
                                        ),
                                    } : undefined,
                                }))
                            ),
                        },
                    },
                });
            }

            // Update blog readDuration
            await prisma.blog.update({
                where: { id: blogId },
                data: {
                    readDuration
                }
            });
        }, { timeout: 20000 });

        // Return success response
        return NextResponse.json({ message: 'success' });
    } catch (error) {
        console.error('Error during blog content update:', error);
        // Return error response
        return NextResponse.json({ error: 'Something went wrong while updating the blog' }, { status: 500 });
    }
}

