"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWrapper from "./ModalWrapper";
import axios from "axios";
import { BarLoader } from "react-spinners";

export default function CreateBlog() {
    const router = useRouter();
    const [blogTitle, setBlogTitle] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('')

    async function createBlogHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsCreating(true)
        try {
            const { data } = await axios.post('/api/authorRoutes', {
                title: blogTitle.trim(),
            });
            router.replace(`/editBlog/${data.blog.id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Narrow down to AxiosError type
                setErrorMsg(error.response?.data?.error || 'An unexpected error occurred');
            } else {
                console.error('Unexpected error', error);
                setErrorMsg('An unexpected error occurred');
            }
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <ModalWrapper
            title="Blog Title"
            urlParam="createBlog"
        >
            <form
                onSubmit={isCreating ? undefined : (e) => createBlogHandler(e)}
                className="flex flex-col items-center"
            >
                <div className="flex flex-col">
                    <input
                        onChange={(e) => setBlogTitle(e.target.value)}
                        className="input-browser-reset w-[260px] p-[6px] border-2 border-[var(--brown-500)] text-[.9rem]"
                        id="blog-title"
                        autoFocus
                        maxLength={70}
                        required
                    />
                    <div className="flex justify-between mx-1 text-[.95rem] mt-1">
                        <p className="text-[.9rem] text-[var(--gray-600)] italic">Title can be edited later</p>
                        <p className="text-[var(--brown-500)]">{blogTitle.length}/70</p>
                    </div>
                </div>
                {errorMsg && <p className="text-center text-[var(--danger)] text-[.935rem] mb-[-10px]">{errorMsg}</p>}
                <button
                    type="submit"
                    className="custom-small-btn bg-[var(--off-black)] mt-4 h-[30px]"
                >
                    {isCreating ?
                        <BarLoader
                            width={30}
                            height={2}
                            loading={isCreating}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            className="text-[var(--off-white)]"
                        />
                        :
                        'Create'
                    }
                </button>
            </form>
        </ModalWrapper>
    )
}
