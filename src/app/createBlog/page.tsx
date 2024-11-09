import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import SlateRichText from "@/components/SlateRichText"
import { Suspense } from 'react'


export default function CreateBlog() {
    return (
        <main className="mt-3">
            <SubheadingTitle title={'Create Blog'} />
            <Suspense>
                <SlateRichText />
            </Suspense>
        </main>
    )
}

