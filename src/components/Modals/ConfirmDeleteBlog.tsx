'use client';
import ModalWrapper from "./ModalWrapper";
import { useState } from "react";

interface Props {
    deleteBlogHandler: () => {}
}

export default function ConfirmDeleteBlog({ deleteBlogHandler }: Props) {
    const [confirmText, setConfirmText] = useState<string>('')
    return (
        <ModalWrapper
            title="Delete Blog"
            urlParam="deleteBlog"
        >
            <div
                className="flex flex-col items-center"
            >
                <p className="text-center text-[var(--brown-500)] mx-5">Type <span className="text-[var(--danger)] underline">Delete Blog Forever</span> to confirm.</p>
                <input
                    type="text"
                    autoFocus
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="input-browser-reset w-60 mt-4 py-[5px] px-[10px] border-2 border-[var(--gray-300)]"
                />
                <button
                    className={`custom-small-btn bg-[var(--danger)] mt-4 ${confirmText === 'Delete Blog Forever' ? '' : 'opacity-50 pointer-events-none'}`}
                    onClick={deleteBlogHandler}
                >Delete</button>
            </div>
        </ModalWrapper>
    )
}
