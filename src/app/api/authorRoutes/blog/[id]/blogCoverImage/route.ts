import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';


// The POST is fired as soon as a user creates a new blog
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 500 });
        }
        
        const { pictureURL } = await request.json();

        if (pictureURL) {
            // set the image url to s3 bucket uplaod
            await prisma.blog.update({
                where: { id: params.id },
                data: { pictureURL }
            })

            return NextResponse.json({ pictureURL }, { status: 200 })
            // Proceed with buffer processing
        } else {
            throw new Error("No URL string provided");
        }

    } catch (error) {
        console.error('Error uploading photo ', error);
        return NextResponse.json({ error: 'failed to upload image' })
    }
}