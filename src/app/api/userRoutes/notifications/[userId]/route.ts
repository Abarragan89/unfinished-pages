import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../utils/prisma';

// Get all messages marked as unread for Menu
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
                    where: { isRead: false },
                    select: { id: true }
                }
            }
        })
        return NextResponse.json(notifications, { status: 200 })
    } catch (error) {
        console.log('error getting notifications ', error)
        return NextResponse.json({ error })
    }
}

// Mark all user notifications as read
export async function PUT(request: NextRequest) {
    try {

        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const notifications = await prisma.notification.updateMany({
            where: { userId },
            data: { isRead: true }
        })
        return NextResponse.json(notifications, { status: 200 })
    } catch (error) {
        console.log('error marking notifications as read', error)
        return NextResponse.json({ error })
    }
}

// Delete all user notifications
export async function DELETE(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        await prisma.notification.deleteMany({
            where: { userId }
        })
        return NextResponse.json({message: 'notifications deleted'}, { status: 200 })
    } catch (error) {
        console.log('error marking notifications as read', error)
        return NextResponse.json({ error })
    }
}
