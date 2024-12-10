import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const { blogId, commenterId, blogSlug } = await request.json();

        // Find users to notify (author and all other commenters except the current commenter)
        const usersToNotify = await prisma.user.findMany({
            where: {
                OR: [
                    { blogs: { some: { id: blogId } } }, // Blog author
                    { comments: { some: { blogId } } }  // Other commenters
                ],
                id: { not: commenterId }, // Exclude the current commenter
            },
        });

        for (const user of usersToNotify) {
            const existingNotification = await prisma.notification.findFirst({
                where: {
                    userId: user.id,
                    blogId,
                    isRead: false, // Unread notification for the same blog
                },
            });

            // Only create notificaiton and send email if 
            if (!existingNotification) {
                // Create a new notification only if there isn't an unread one
                await prisma.notification.create({
                    data: {
                        userId: user.id,
                        blogId,
                        url: blogSlug,
                        message: `New Comments! ${blogSlug.slice(0, blogSlug.lastIndexOf('-'))}`
                    },
                });
            }
        }
        return NextResponse.json({ message: 'comment sucessfully added' });
    } catch (error) {
        console.log('error adding notification ', error)
        return NextResponse.json({ error });
    }
}
