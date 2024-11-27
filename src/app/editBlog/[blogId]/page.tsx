import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import SlateRichText from "@/components/EditBlogUI/SlateRichText"
import EditMetaData from "@/components/EditBlogUI/EditMetaData"
import { headers } from 'next/headers'
import ScrollToTop from "@/components/ScrollToTop"
import getEditBlogContents from "@/app/services/getEditBlogContent"
import Link from "next/link"

export default async function editBlog({ params }: { params: { blogId: string } }) {

    const headersList = headers()
    const userId = headersList.get('x-user-id')
    const { blogId } = params;

    // Check if user is logged in
    if (!userId) {
        throw new Error('Unauthorized access')
    }
    // get Blog Data
    const blogData = await getEditBlogContents(userId, blogId)

    // Error finding blog data
    if (!blogData) {
        throw new Error('Could not find blog data')
    }

    return (
        <main className="mt-3">
            <ScrollToTop />
            <SubheadingTitle title={'Create Blog'} />
            <Link href={`/previewBlog/${blogData.id}`}>
                Preview
            </Link>
            <EditMetaData
                title={blogData.title}
                description={blogData.description || ""}
                pictureURL={blogData.pictureURL || ""}
                blogId={blogId as string}
            />
            <SlateRichText
                blogId={blogId as string}
                blogContent={blogData.content as []}
            />
        </main>
    )
}

