import { prisma } from "../../../utils/prisma";

// Get info for the blog cards
export default async function getUserNotifications(userId: string) {
    try {
        const userNotifications = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                notifications: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        blog: {
                            select: {
                                title: true
                            }
                        }
                    }
                }
            }
        })
        return userNotifications;
    } catch (error) {
        console.log('error getting user notifications ', error)
    }
}