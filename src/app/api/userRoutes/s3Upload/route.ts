import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string
    }
})

function getContentType(fileName: string): string {
    const extension = fileName.split('.').pop();
    switch (extension) {
        case 'jpeg':
        case 'jpg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'webp':
            return 'image/webp';
        default:
            return 'application/octet-stream'; // Fallback for unknown types
    }
}

async function uploadFileToS3(file: Buffer, filename: string) {
    const contentType = getContentType(filename);
    const timestampedKey = `${filename}-${Date.now()}`;

    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: timestampedKey,
        Body: file,
        ContentType: contentType
    }

    const command = new PutObjectCommand(s3Params)
    await s3Client.send(command)
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${timestampedKey}`;
    return url;
}

// The POST is fired as soon as a user creates a new blog
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const imageFile = formData.get('file');
        const imageHeight = formData.get('imageHeight') as string;       // pass this data from the edit, 
        const imageWidth = formData.get('imageWidth') as string;
        const imageAlt = formData.get('imageAlt') as string;
        const isCoverImage = formData.get('isCoverImage');
        const booleanIsCoverImage = (isCoverImage === 'true')

        if (!imageFile) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }
        // Get User ID
        const userId = request.headers.get('x-user-id');
        console.log('user id int eh route', userId)

        if (!userId) return NextResponse.json({ error: 'User not logged in' })


        if (imageFile instanceof File) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            // upload it to S3
            const pictureURL = await uploadFileToS3(buffer, imageFile.name)

            // Save image to database and attach to User
            const imageData = await prisma.image.create({
                data: {
                    userId,
                    url: pictureURL,
                    alt: imageAlt,
                    isBlogCover: booleanIsCoverImage,
                    width: parseInt(imageWidth),
                    height: parseInt(imageHeight)
                }
            })

            // return the HTML string returned from s3 Bucket to assign
            return NextResponse.json({ pictureURL, imageData }, { status: 200 })
            // Proceed with buffer processing
        } else {
            throw new Error("Expected file to be a File object");
        }

    } catch (error) {
        console.error('Error uploading photo 123 ', error);
        return NextResponse.json({ error: 'failed to upload image' })
    }
}