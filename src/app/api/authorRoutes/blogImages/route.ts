import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma'


export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) return NextResponse.json({ error: 'user not logged in' }, { status: 403 });

        const userImages = await prisma.image.findMany({
            where: { userId }
        })

        return NextResponse.json({ userImages }, { status: 200 })
    } catch (error) {
        console.log('error getting user images', error)
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { imageId } = await request.json();
        const userId = request.headers.get('x-user-id');
        if (!userId) return NextResponse.json({ error: 'user not logged in' }, { status: 403 });

        const userImages = await prisma.image.delete({
            where: { id: imageId }
        })

        console.log('data in delte route ', imageId)
        console.log('data in delte route ', typeof imageId)

        return NextResponse.json({ message: 'yes' }, { status: 200 })
    } catch (error) {
        console.log('error getting user images', error)
    }
}