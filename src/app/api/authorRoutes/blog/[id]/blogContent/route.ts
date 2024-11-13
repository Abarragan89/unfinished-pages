import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '../../../../../../../utils/prisma';


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id: blogId } = params

        console.log(blogId)
        const blogData = await request.json()

        console.log('blog content ', blogData)
        return NextResponse.json({ message: 'success ' })

    } catch (error) {
        console.log('error ', error)
    }

}
