import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';

export async function PUT(request: NextRequest) {
    try {
        const { requestResponseText, action, requestId } = await request.json()
        // If declined:
        if (action === 'decline') {
            // set the message
            // the user will acknowledge and this acknowledgement will erase the row
            await prisma.authorRequest.update({
                where: { id: requestId },
                data: { replyMessage: requestResponseText, status: 'declined' }
            })
        }

        // if approved
        if (action === 'approve') {
            // Use a transaction for atomic updates
            await prisma.$transaction(async (tx) => {
                // Update the AuthorRequest and get the userId
                const { userId } = await tx.authorRequest.update({
                    where: { id: requestId },
                    data: { replyMessage: requestResponseText, status: 'approved' },
                    select: { userId: true }, // Only fetch the userId field
                });

                // Update the User to set them as an author
                await tx.user.update({
                    where: { id: userId },
                    data: { isAuthor: true },
                });
            });
        }
        return NextResponse.json({ message: 'success' }, { status: 200 })
        
    } catch (error) {
        console.error('Error saving Blog Content ', error);
        return NextResponse.json({ error: 'failed to parse blog content' })
    }
}