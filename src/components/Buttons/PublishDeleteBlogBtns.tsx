"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmDeleteBlog from "../Modals/ConfirmDeleteBlog";

interface Props {
    userId: string;
    blogId: string;
}

export default function PublishDeleteBlogBtns({ userId, blogId }: Props) {
    const router = useRouter();

    async function deleteBlog() {
        try {
            await axios.delete('/api/authorRoutes', {
                data: {
                    userId: userId,
                    blogId: blogId,
                }
            })
            router.push('/myBlogs')
        } catch (error) {
            console.log('error deleting blog in client', error)
        }
    }

    return (
        <>
            <ConfirmDeleteBlog 
                deleteBlogHandler={deleteBlog}
            />
            <div className="flex justify-center">
                <button
                    className="custom-small-btn ml-5 bg-[var(--success)]"
                >Publish</button>
                <Link
                    href={'?showModal=deleteBlog'}
                    className="custom-small-btn ml-5 bg-[var(--danger)]"
                >Delete
                </Link>
            </div>
        </>
    )
}
