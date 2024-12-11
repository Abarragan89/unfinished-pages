import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function updateNotificationsAsRead(userId: string) {
    try {
        await prisma.notification.updateMany({
            where: { userId },
            data: { isRead: true }
        })
    } catch (error) {
        console.log('error marking notifications as read', error)
    }
}