import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../utils/prisma';

// Route to Publish The Blog
export async function PUT(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 401 });
        }

        return NextResponse.json({ message: 'success' })
    } catch (error) {
        console.log('error ', error)
    }
}