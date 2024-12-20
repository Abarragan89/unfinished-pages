import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../utils/prisma';

// Route to Publish The Blog
export async function PUT(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        await prisma.user.findUnique({ where: { id: userId } })
        const { pictureURL } = await request.json();

        // delete image in user profile, don't need it, just the line
        // put this is automatically save in the s3 upload so i'm just
        // cancelling out that logic
        await prisma.image.deleteMany({
            where: {
                userId: userId,
                alt: 'profile-pic'
            }
        })

        // set new photo in prisma
        await prisma.user.update({
            where: { id: userId },
            data: { image: pictureURL }
        })

        return NextResponse.json({ message: 'success' })
    } catch (error) {
        console.log('error ', error)
    }
}