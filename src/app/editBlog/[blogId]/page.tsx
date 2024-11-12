import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import SlateRichText from "@/components/EditBlogUI/SlateRichText"
import EditMetaData from "@/components/EditBlogUI/EditMetaData"
import { Suspense } from 'react'
import { headers } from 'next/headers'
import { prisma } from "../../../../utils/prisma"

export default function editBlog({ params }: { params: { blogId: string } }) {

    const headersList = headers()
    const userId = headersList.get('x-user-id')
    const { blogId } = params;

    // need to check if blog id is part of user Id's 



    return (
        <main className="mt-3">
            <SubheadingTitle title={'Create Blog'} />
            <EditMetaData />
            <Suspense>
                <SlateRichText />
            </Suspense>
        </main>
    )
}

