"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWrapper from "./ModalWrapper";
import axios from "axios";

export default function CreateBlog() {
    const router = useRouter();
    const [blogTitle, setBlogTitle] = useState<string>('');
    const [blogTitleCount, setBlogTitleCount] = useState<number>(0);

    async function createBlogHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/authorRoutes/blogs',
            data: {
                title: blogTitle.trim()
            }
        })
            .then(({ data }) => {
                console.log('response', data.blog.id);
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
                onSubmit={(e) => createBlogHandler(e)}
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
                    className="custom-small-btn mt-4"
                >
                    Create
                </button>
            </form>
        </ModalWrapper>
    )
}
