import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../utils/prisma';
import { sendReplyCommentEmail } from '../../../../../../utils/sendingEmails/sendReplyCommentEmail';
import { UserData } from '../../../../../../types/users';

export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const {
            blogId,
            replierId,
            commentOwnerId,
            replierName,
            blogSlug,
            commentText,
            blogTitle
        } = await request.json();

        console.log('commentOwnerId', commentOwnerId)
        console.log('replierId ', replierId)

        const nonUndefinedIds = [commentOwnerId, replierId].filter(id => id !== undefined);


        const [commentors, author, parentCommentOwner] = await Promise.all([
            // Find Commentors minus the author, replier, and owner of parent comment(they get a different email)
            prisma.user.findMany({
                where: {
                    comments: { some: { blogId } },
                    id: { not: { in: nonUndefinedIds } },
                    NOT: {
                        blogs: { some: { id: blogId } }, // Exclude the author of the blog
                    },
                },
                select: {
                    name: true,
                    email: true,
                    id: true,
                    isNotificationsOn: true,
                },
            }),
            // Find Author (only send notification if they weren't the ones that sent it)
            prisma.user.findMany({
                where: {
                    blogs: { some: { id: blogId } },
                    id: { not: replierId },
                },
                select: {
                    name: true,
                    email: true,
                    id: true,
                    isNotificationsOn: true,
                },
            }),
            // Find CommentOwner
            prisma.user.findMany({
                where: { id: commentOwnerId },
                select: {
                    name: true,
                    email: true,
                    id: true,
                    isNotificationsOn: true,
                },
            }),
        ]);


        if (author.length > 0) {
            // @ts-expect-error: Adding custom property to author object
            author[0].isAuthor = true;
        }
        if (parentCommentOwner.length > 0) {
            // @ts-expect-error: Adding custom property to parent object
            parentCommentOwner[0].isParentCommentOwner = true;
        }
        const allUsers: UserData[] = [...author, ...commentors, ...parentCommentOwner];
        const usersToNotify: UserData[] = [];

        // Use a transaction for notification creation
        await prisma.$transaction(async (tx) => {
            for (const user of allUsers) {
                const existingNotification = await tx.notification.findFirst({
                    where: {
                        userId: user.id,
                        blogId,
                        isRead: false,
                    },
                });

                if (!existingNotification) {
                    await tx.notification.create({
                        data: {
                            userId: user.id as string,
                            blogId,
                            url: blogSlug,
                            commentText,
                            message: `New Comments! ${blogTitle}`,
                        },
                    });
                    // Only notify users who don't already have a notification
                    usersToNotify.push(user);
                }
            }
        });

        // filter out users that have notifications set to off
        const usersWithNotificationsOn: UserData[] = usersToNotify.filter(user => user.isNotificationsOn === true)

        // Send emails outside the transaction
        if (usersWithNotificationsOn.length > 0) {
            const blogLink = `${process.env.DOMAIN}/blog/${blogSlug}`;
            sendReplyCommentEmail(
                usersWithNotificationsOn,
                blogLink,
                commentText,
                replierName,
                blogTitle
            );
        }
        return NextResponse.json({ message: 'Comment successfully added' });
    } catch (error) {
        console.error('Error adding notification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}