import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import SlateRichText from "@/components/EditBlogUI/SlateRichText"
import EditMetaData from "@/components/EditBlogUI/EditMetaData"
import { headers } from 'next/headers'
import ScrollToTop from "@/components/ScrollToTop"
import getEditBlogContents from "@/app/services/getEditBlogContent"
import Link from "next/link"
import PublishDeleteBlogBtns from "@/components/Buttons/PublishDeleteBlogBtns"
import Banner from "@/components/EditBlogUI/Banner"
import { cleanTitleForURL } from "../../../../../utils/stringManipulation"
import UploadImageInput from "@/components/EditBlogUI/UploadImageInput"
import InputBlockWrapper from "@/components/EditBlogUI/InputBlockWrapper"
import EditBlogClientWrapper from "@/components/EditBlogUI/EditBlogClientWrapper"
import { BlogData } from "../../../../../types/blog"

export default async function editBlog({ params }: { params: { blogId: string } }) {

    const headersList = headers()
    const userId = headersList.get('x-user-id')
    const { blogId } = params;

    // Check if user is logged in
    if (!userId) {
        throw new Error('Unauthorized access')
    }

    // get Blog Data
    const blogData = await getEditBlogContents(userId, blogId) as unknown as BlogData

    // Error finding blog data
    if (!blogData) {
        throw new Error('Could not find blog data')
    }

    return (
        <main className="pt-[50px] relative">
            <ScrollToTop />
            <EditBlogClientWrapper 
                blogData={blogData}
                blogId={blogId}
                userId={userId}
            />
        </main>
    )
}

