"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWrapper from "./ModalWrapper";
import axios from "axios";
import { BarLoader } from "react-spinners";

export default function CreateBlog() {
    const router = useRouter();
    const [blogTitle, setBlogTitle] = useState<string>('');
    const [blogTitleCount, setBlogTitleCount] = useState<number>(0);
    const [isCreating, setIsCreating] = useState<boolean>(false)

    async function createBlogHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsCreating(true)
        axios({
            method: 'post',
            url: '/api/authorRoutes',
            data: {
                title: blogTitle.trim()
            }
        })
        .then(({ data }) => {
            setIsCreating(false);
            router.replace(`/editBlog/${data.blog.id}`)
        })
        .catch(error => {
            console.log('error creating blog', error);
        });
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
                        onChange={(e) => { setBlogTitle(e.target.value); setBlogTitleCount(e.target.value.length) }}
                        className="input-browser-reset p-[6px] border border-[var(--brown-500)] text-[.9rem]"
                        id="blog-title"
                        maxLength={65}
                        required
                        rows={1}
                        cols={30}
                    />
                    <div className="flex justify-between mx-1 text-[.95rem]">
                        <p className="text-[.9rem] text-[var(--gray-600)] italic">Title can be edited later</p>
                        <p className="text-[var(--brown-500)]">{blogTitleCount}/65</p>
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
