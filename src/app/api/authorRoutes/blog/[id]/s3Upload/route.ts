import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        // checks here for file format, size, etc.

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }

        if (file instanceof File) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const pictureURL = await uploadFileToS3(buffer, file.name)

            // set the image url to s3 bucket uplaod
            await prisma.blog.update({
                where: { id: params.id },
                data: { pictureURL }
            })

            return NextResponse.json({ pictureURL }, { status: 200 })
            // Proceed with buffer processing
        } else {
            throw new Error("Expected file to be a File object");
        }

    } catch (error) {
        console.error('Error uploading photo ', error);
        return NextResponse.json({ error: 'failed to upload image' })
    }
}