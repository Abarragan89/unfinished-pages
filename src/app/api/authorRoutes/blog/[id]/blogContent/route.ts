import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';
import { BlogContent } from '../../../../../../../types/blog';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id: blogId } = params
        const { content, readDuration } = await request.json()

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
                        type: content.type,
                        url: content.url || null,
                        orderNumber: index,
                        children: {
                            create: content.children.map((detail) => ({
                                text: detail.text || '',
                                bold: detail.bold || false,
                                italic: detail.italic || false,
                                underline: detail.underline || false,
                                type: detail.type === 'list-item' ? detail.type : null, // if it's a list, set the listType
                                children: detail.children ? {
                                    create: detail.children.map((item) => ({
                                        text: item.text || '',
                                        bold: item.bold || false,
                                        italic: item.italic || false,
                                        underline: item.underline || false,
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
    } catch (error) {
        console.log('error ', error)
    }

}
