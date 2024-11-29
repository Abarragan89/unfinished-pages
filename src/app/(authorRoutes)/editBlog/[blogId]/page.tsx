import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import SlateRichText from "@/components/EditBlogUI/SlateRichText"
import EditMetaData from "@/components/EditBlogUI/EditMetaData"
import { headers } from 'next/headers'
import ScrollToTop from "@/components/ScrollToTop"
import getEditBlogContents from "@/app/services/getEditBlogContent"
import Link from "next/link"
import PublishDeleteBlogBtns from "@/components/Buttons/PublishDeleteBlogBtns"

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
        <main className="pt-[50px] relative">
            <ScrollToTop />
            <SubheadingTitle title={'Create Blog'} />
            <div className="flex absolute top-[10px] right-[2.5%] pe-2">
                <Link
                    href={`/previewBlog/${blogData.id}`}
                    className="custom-small-btn bg-[var(--off-black)]"
                >
                    Preview
                </Link>
            </div>
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
            {/*  Delete and Publish buttons */}
            <PublishDeleteBlogBtns
                userId={userId}
                blogId={blogId}
                isBlogPublished={blogData.isPublished}
            />
        </main>
    )
}

