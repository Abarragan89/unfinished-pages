import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import SlateRichText from "@/components/EditBlogUI/SlateRichText"
import EditMetaData from "@/components/EditBlogUI/EditMetaData"
import { Suspense } from 'react'


export default function editBlog() {
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

