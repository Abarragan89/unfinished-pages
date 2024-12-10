import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../utils/prisma';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {

        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const notifications = await prisma.user.findUnique({
            where: {
                id: params.userId
            },
            select: {
                notifications: {
                    select: { id: true }
                }
            }
        })
        return NextResponse.json(notifications, { status: 200 })
    } catch (error) {
        console.log('error gettign notifications ', error)
        return NextResponse.json({ error })
    }
}
