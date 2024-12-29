import { headers } from 'next/headers'
import ScrollToTop from "@/components/ScrollToTop"
import getEditBlogContents from "@/app/services/getEditBlogContent"
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

