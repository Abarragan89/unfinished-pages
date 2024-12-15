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
        const {pictureURL} = await request.json();
        
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