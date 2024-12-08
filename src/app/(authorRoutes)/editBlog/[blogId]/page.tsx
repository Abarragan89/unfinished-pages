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
            <div className="mb-[30px]">
                {blogData.isPublished ?
                    <Banner
                        text="Published"
                        color="green"
                        link={`/blog/${cleanTitleForURL(blogData.title)}-${blogData.id}`}
                    />
                    :
                    <Banner
                        text="Draft"
                        color="red"
                    />
                }
            </div>
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
                blogId={blogId as string}
                categories={blogData.categories}
                tags={blogData.tags as string}
            />
            <InputBlockWrapper
                subtitle="Cover Photo"
                showSaveButton={false}
            >
                <UploadImageInput
                    blogId={blogId as string}
                    coverPhotoUrl={blogData.coverPhotoUrl || ""}
                />
            </InputBlockWrapper>
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

