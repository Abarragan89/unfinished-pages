'use client';
import { useState } from "react";
import { BlogData } from "../../../types/blog";
import Banner from "./Banner";
import { cleanTitleForURL } from "../../../utils/stringManipulation";
import SubheadingTitle from "../Headings/SubheadingTitle";
import Link from "next/link";
import EditMetaData from "./EditMetaData";
import SlateRichText from "./SlateRichText";
import InputBlockWrapper from "./InputBlockWrapper";
import UploadImageInput from "./UploadImageInput";
import PublishDeleteBlogBtns from "../Buttons/PublishDeleteBlogBtns";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function EditBlogClientWrapper({ blogData, blogId, userId }: { blogData: BlogData, blogId: string, userId: string }) {
    const [isPublished, setIsPublished] = useState<boolean>(blogData.isPublished as boolean)
    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    const { width, height } = useWindowSize()

    return (
        <>
            {showConfetti && width && height &&
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={2000}
                    recycle={false}
                    gravity={0.08}
                    tweenDuration={15000}
                
                />
            }
            <div className="mb-[30px]">
                {isPublished ?
                    <Banner
                        text="Published"
                        color="green"
                        link={`/blog/${cleanTitleForURL(blogData.title as string)}-${blogData.id}`}
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
                title={blogData.title as string}
                description={blogData.description || ""}
                blogId={blogId as string}
                categories={blogData.categories as []}
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
                blogContent={blogData.content as unknown as []}
            />
            {/*  Delete and Publish buttons */}
            <PublishDeleteBlogBtns
                userId={userId}
                blogId={blogId}
                setIsPublished={setIsPublished}
                isPublished={isPublished}
                setShowConfetti={setShowConfetti}
            />
        </>
    )
}
