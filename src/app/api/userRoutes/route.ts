import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../utils/prisma';
import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string
    }
})

function getS3Key(imageUrl: string): string {
    // Check if the URL is a full S3 URL
    if (imageUrl.includes('.amazonaws.com/')) {
        return imageUrl.split('.amazonaws.com/')[1];
    }
    // If it's already a key (without the full URL)
    return '';
}

// Function to delete a file from S3
async function deleteFilesFromS3(keys: string[]) {
    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Delete: {
            Objects: keys.map((key) => ({ Key: key })),
        },
    };
    const command = new DeleteObjectsCommand(s3Params);
    await s3Client.send(command);
}

// Delete user and all images in s3 bucket
export async function DELETE(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        await prisma.$transaction(async (tx) => {
            // 1. Fetch all images associated with the user
            const userImages = await tx.image.findMany({
                where: { userId },
                select: { url: true },
            });

            // 2. Extract S3 keys for deletion
            const userKeys = userImages
                .map((userImage) => getS3Key(userImage.url))
                .filter((key): key is string => !!key); // Filter out null keys

            // 3. Delete images from S3
            if (userKeys.length > 0) {
                await deleteFilesFromS3(userKeys);
            }

            // 4. Delete the user and associated images from the database
            await tx.image.deleteMany({ where: { userId } });
            await tx.user.delete({ where: { id: userId } });
        });

        return NextResponse.json({ message: 'success' })
    } catch (error) {
        console.log('error ', error)
    }
}