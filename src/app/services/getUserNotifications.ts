import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getUserNotifications(userId: string) {
    const userNotifications = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            notifications: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })
    return userNotifications;
}