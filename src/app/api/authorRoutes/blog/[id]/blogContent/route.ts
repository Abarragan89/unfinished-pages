import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';
import { BlogContent } from '../../../../../../../types/blog';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }
        const { id: blogId } = params
        const { content, readDuration } = await request.json();

        // delete all content and redo content
        const contentBlocks = await prisma.contentBlock.findMany({
            where: { blogId }
        });

        for (const block of contentBlocks) {
            await prisma.contentBlock.delete({
                where: { id: block.id }
            });
        }

        await Promise.all(
            content.map(async (content: BlogContent, index: number) => {
                return prisma.contentBlock.create({
                    data: {
                        blogId,
                        type: content.type, // paragraph, heading, etc.
                        imageId: content?.image?.id || null,
                        orderNumber: index,
                        videoUrl: content.videoUrl || null,
                        children: {
                            create: content.children.map((detail) => ({
                                url: detail.url || null,
                                text: detail.text || '',
                                bold: detail.bold || false,
                                italic: detail.italic || false,
                                underline: detail.underline || false,
                                type: detail.type || null, // list-type or link
                                children: detail.children ? {
                                    create: detail.children.map((item) => ({
                                        text: item.text || '',
                                        bold: item.bold || false,
                                        italic: item.italic || false,
                                        underline: item.underline || false,
                                        type: item.type || null, // this is for inline anchor tags in lists
                                        url: item.url || null,
                                        children: item.children ? {
                                            create: item.children.map((item) => ({
                                                text: item.text || '',
                                            }))
                                        } : undefined,
                                    }))
                                } : undefined,
                            })),
                        },
                    },
                });
            })
        );
        await prisma.blog.update({
            where: { id: blogId },
            data: {
                readDuration
            }
        })

        return NextResponse.json({ message: 'success' })
    } catch (error) {
        console.log('error ', error)
    }

}
