import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getUserSettings(userId: string) {
    const userNotifications = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true, 
            isNotificationsOn: true,

        }
    })
    return userNotifications;
}