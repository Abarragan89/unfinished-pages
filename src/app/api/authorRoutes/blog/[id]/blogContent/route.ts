import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id: blogId } = params

        console.log(blogId)
        const content = await request.json()

        // delete all content and redo content
        await prisma.blogContent.deleteMany({
            where: { blogId }
        })


        const createdContents = await Promise.all(

            content.map(async (content: any) => {
                return prisma.blogContent.create({
                    data: {
                        blogId,
                        type: content.type,
                        url: content.url || null,
                        children: {
                            create: content.children.map((child: any) => ({
                                text: child.text || '',
                                bold: child.bold || false,
                                italic: child.italic || false,
                                underline: child.underline || false,
                            })),
                        },
                    },
                    include: {
                        children: true,
                    },
                });
            })
        );


        return NextResponse.json({ message: 'success ' })

    } catch (error) {
        console.log('error ', error)
    }

}
