import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma'


export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) return NextResponse.json({ error: 'user not logged in' }, { status: 403 });

        const userImages = await prisma.image.findMany({
            where: { userId }
        })

        console.log('user images', userImages)
        return NextResponse.json({ userImages }, { status: 200 })
    } catch (error) {
        console.log('error getting user images', error)
    }
}