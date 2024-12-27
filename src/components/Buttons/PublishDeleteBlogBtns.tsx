"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmWithText from "../Modals/ConfirmWithText";
import { useState } from "react";

interface Props {
    userId: string;
    blogId: string;
    setIsPublished: React.Dispatch<React.SetStateAction<boolean>>;
    setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
    isPublished: boolean
}

export default function PublishDeleteBlogBtns({ userId, blogId, setIsPublished, isPublished, setShowConfetti }: Props) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    async function deleteBlog() {
        try {
            setIsLoading(true)
            await axios.delete(`/api/authorRoutes/blog/${blogId}`, {
                data: {
                    userId: userId,
                }
            })
            router.push('/myBlogs')
        } catch (error) {
            console.log('error deleting blog in client', error)
        } finally {
            setIsLoading(false)
        }
    }


    async function togglePublishBlog(isPublished: boolean) {
        try {
            setIsLoading(true)
            const { data } = await axios.put(`/api/authorRoutes/blog/${blogId}`,
                {
                    data: {
                        isPublished: isPublished,
                    },
                },
                {
                    validateStatus: function (status) {
                        return status >= 200 && status < 500;
                    }
                }
            )
            if (data.error) {
                setErrorMsg(data.error)
            } else {
                setIsPublished(isPublished)
                router.back();
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setShowConfetti(isPublished)
                }, 30);
            }
        } catch (error) {
            console.log('error deleting blog in client', error)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <ConfirmWithText
                onConfirmHandler={deleteBlog}
                confirmText="Delete Blog Forever"
                urlParamTrigger={'deleteBlog'}
                modalTitle={'Delete Blog'}
                isLoading={isLoading}
                btnColor="bg-[var(--danger)]"
                btnText="Delete"
                errorMsg={errorMsg}
            />

            <ConfirmWithText
                onConfirmHandler={() => togglePublishBlog(true)}
                confirmText="Publish Blog"
                urlParamTrigger={'publishBlog'}
                modalTitle={'Publish Blog'}
                isLoading={isLoading}
                btnColor="bg-[var(--success)]"
                btnText="Publish"
                errorMsg={errorMsg}
            />

            <ConfirmWithText
                onConfirmHandler={() => togglePublishBlog(false)}
                confirmText="Unpublish Blog"
                urlParamTrigger={'unpublishBlog'}
                modalTitle={'Unpublish Blog'}
                isLoading={isLoading}
                btnColor="bg-[var(--success)]"
                btnText="Unpublish"
                errorMsg={errorMsg}
            />
            <div className="flex justify-center mb-[35px] mt-[-20px]">
                {
                    isPublished ?
                        <Link
                            scroll={false}
                            href={'?showModal=unpublishBlog'}
                            className="custom-small-btn ml-5 bg-[var(--success)] dark:text-white"
                        >Unpublish
                        </Link>
                        :
                        <Link
                            scroll={false}
                            href={'?showModal=publishBlog'}
                            className="custom-small-btn ml-5 bg-[var(--success)]"
                        >Publish
                        </Link>

                }
                <Link
                    scroll={false}
                    href={'?showModal=deleteBlog'}
                    className="custom-small-btn ml-5 bg-[var(--danger)]"
                >Delete
                </Link>
            </div>
        </>
    )
}
