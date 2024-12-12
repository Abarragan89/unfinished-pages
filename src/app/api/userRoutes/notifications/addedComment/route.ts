import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../utils/prisma';
import { UserData } from '../../../../../../types/users';
import { sendAddedCommentEmail } from '../../../../../../utils/sendingEmails/sendAddedCommentEmail';

export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        const { blogId, commentorId, blogSlug, commentorName, commentText, blogTitle } = await request.json();

        // get commentors and author
        const [commentors, author] = await Promise.all([
            // Find Commenters
            prisma.user.findMany({
                where: {
                    comments: { some: { blogId } },
                    id: { not: commentorId }, // don't include the person who commented
                    NOT: {
                        blogs: { some: { id: blogId } }, // Exclude the author of the blog
                    },
                },
                select: {
                    name: true,
                    email: true,
                    id: true,
                },
            }),
            // Find Author
            prisma.user.findMany({
                where: {
                    blogs: { some: { id: blogId } },
                    id: { not: commentorId },
                },
                select: {
                    name: true,
                    email: true,
                    id: true,
                },
            }),
        ]);

        if (author.length > 0) {
            // @ts-expect-error: Adding custom property to author object
            author[0].isAuthor = true;
        }
        const allUsers: UserData[] = [...author, ...commentors];
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
                            message: `New Comments! ${blogTitle}`,
                        },
                    });
                    // Only notify users who don't already have a notification
                    usersToNotify.push(user);
                }
            }
        });

        // // Send emails outside the transaction
        if (usersToNotify.length > 0) {
            const blogLink = `${process.env.DOMAIN}/blog/${blogSlug}`;
            sendAddedCommentEmail(usersToNotify, blogLink, commentorName, commentText, blogTitle);
        }
        return NextResponse.json({ message: 'Comment successfully added' });
    } catch (error) {
        console.error('Error adding notification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}