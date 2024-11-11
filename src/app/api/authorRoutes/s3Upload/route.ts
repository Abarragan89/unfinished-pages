import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../utils/prisma';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY as string
    }
})

// The POST is fired as soon as a user creates a new blog
export async function POST(request: NextRequest) {
    try {
        
        



    } catch (error) {
        console.error('Error uploading photo ', error);
        return NextResponse.json({ error: 'failed to upload image' })
    }
}