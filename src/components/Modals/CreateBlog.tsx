"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWrapper from "./ModalWrapper";
import axios from "axios";
import { BarLoader } from "react-spinners";

export default function CreateBlog() {
    const router = useRouter();
    const [blogTitle, setBlogTitle] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false)

    async function createBlogHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsCreating(true)
        try {
            const { data } = await axios.post('/api/authorRoutes', {
                title: blogTitle.trim(),
            });

            setIsCreating(false);
            router.replace(`/editBlog/${data.blog.id}`);
        } catch (error) {
            console.error('Error creating blog', error);
        }
    }

    return (
        <ModalWrapper
            title="Give your new blog a title"
            urlParam="createBlog"
        >
            <form
                onSubmit={isCreating ? undefined : (e) => createBlogHandler(e)}
                className="flex flex-col items-center"
            >
                <div className="flex flex-col">
                    <textarea
                        onChange={(e) => setBlogTitle(e.target.value)}
                        className="input-browser-reset p-[6px] border border-[var(--brown-500)] text-[.9rem]"
                        id="blog-title"
                        autoFocus
                        maxLength={65}
                        required
                        rows={1}
                        cols={30}
                    />
                    <div className="flex justify-between mx-1 text-[.95rem]">
                        <p className="text-[.9rem] text-[var(--gray-600)] italic">Title can be edited later</p>
                        <p className="text-[var(--brown-500)]">{blogTitle.length}/65</p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="custom-small-btn mt-4 h-[30px]"
                >
                    {isCreating ?
                        <BarLoader
                            color={'white'}
                            width={30}
                            height={2}
                            loading={isCreating}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        :
                        'Create'
                    }
                </button>
            </form>
        </ModalWrapper>
    )
}
