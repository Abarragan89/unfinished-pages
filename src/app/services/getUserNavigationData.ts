import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getUserNavigationData(userId: string) {
    const userNotifications = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            image: true
        }
    })
    return userNotifications;
}