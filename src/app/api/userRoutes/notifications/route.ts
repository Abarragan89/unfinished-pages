import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';
import { sendNotificationEmail } from '../../../../../utils/sendNotificationEmail';
import { UserData } from '../../../../../types/users';

// export async function POST(request: NextRequest) {
//     try {
//         const userId = request.headers.get('x-user-id');
//         if (!userId) {
//             return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
//         }

//         const { blogId, commenterId, blogSlug } = await request.json();

//         // Find users to notify (author and all other commenters except the current commenter)
//         const commenters = await prisma.user.findMany({
//             where: {
//                 comments: { some: { blogId } },
//                 id: { not: commenterId }, // Exclude the current commenter
//                 // I can select the is notifications on, or check to see if the last time they got an email was 24 hours ago
//             },
//             select: {
//                 name: true,
//                 email: true,
//                 id: true,
//                 // notificationSettings: true
//             }
//         });

//         // Find Author
//         const author = await prisma.user.findMany({
//             where: { blogs: { some: { id: blogId } } },
//             select: {
//                 name: true,
//                 email: true,
//                 id: true,
//                 // notificationSettings: true
//             }
//         });

//         // add this property to author to 
//         // @ts-expect-error: adding is author value
//         author[0].isAuthor = true

//         const allUsers: UserData[] = [...author, ...commenters];
//         //  I need to filter to only users who don't already have a notificaiton on the blog
//         const usersToNotify: UserData[] = [];

//         for (const user of allUsers) {
//             const existingNotification = await prisma.notification.findFirst({
//                 where: {
//                     userId: user.id,
//                     blogId,
//                     isRead: false, // Unread notification for the same blog
//                 },
//             });

//             // Only create notificaiton and send email if 
//             if (!existingNotification) {
//                 // Create a new notification only if there isn't an unread one
//                 await prisma.notification.create({
//                     data: {
//                         userId: user.id as string,
//                         blogId,
//                         url: blogSlug,
//                         message: `New Comments! ${blogSlug.slice(0, blogSlug.lastIndexOf('-'))}`
//                     },
//                 });
//                 usersToNotify.push(user)
//             }
//         }
//         // Send Email to all users who don't already have a notificaiton on the blog
//         const blogLink = `${process.env.DOMAIN}/blog/${blogSlug}`
//         await sendNotificationEmail(usersToNotify, blogLink);

//         return NextResponse.json({ message: 'comment sucessfully added' });
//     } catch (error) {
//         console.log('error adding notification ', error)
//         return NextResponse.json({ error });
//     }
// }


export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }
        const { blogId, commenterId, blogSlug } = await request.json();
        const [commenters, author] = await Promise.all([
            // Find Commenters
            prisma.user.findMany({
                where: {
                    comments: { some: { blogId } },
                    id: { not: commenterId },
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
                    id: { not: commenterId },
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
        const allUsers: UserData[] = [...author, ...commenters];
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
                            message: `New Comments! ${blogSlug.slice(0, blogSlug.lastIndexOf('-'))}`,
                        },
                    });
                    // Only notify users who don't already have a notification
                    usersToNotify.push(user);
                }
            }
        });

        // Send emails outside the transaction
        if (usersToNotify.length > 0) {
            const blogLink = `${process.env.DOMAIN}/blog/${blogSlug}`;
            await sendNotificationEmail(usersToNotify, blogLink);
        }
        return NextResponse.json({ message: 'Comment successfully added' });
    } catch (error) {
        console.error('Error adding notification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}