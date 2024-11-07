"use client";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper"
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

interface Props {
    onClickHandler: () => void;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
    setImageAlt: React.Dispatch<React.SetStateAction<string>>
}

export default function AddImageModal({ onClickHandler, setImageUrl, setImageAlt }: Props) {
    const [wordCount, setWordCount] = useState<number>(0)
    const router = useRouter();

    function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onClickHandler();
        router.back();
    }

    const params = useSearchParams();
    const showModal = params.get('showModal')

    return (
        <>
            {showModal === "addImage" &&
                <ModalWrapper title="Add Image">
                    <form
                        onSubmit={(e) => onSubmitHandler(e)}
                        className="flex flex-col items-center"
                    >
                        <div className="flex flex-col text-[.875rem] text-[var(--brown-500)]">
                            <label htmlFor="photoURL">Photo URL:</label>
                            <input type="text"
                                id="photoURL"
                                required
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="input-browser-reset text-[.925rem] w-[190px] p-[4px] ps-[10px] border border-[var(--brown-500)] text-[.9rem]" placeholder="https://example.com/298" />
                        </div>

                        <div className="flex flex-col text-[.875rem] text-[var(--brown-500)] mt-3">
                            <label htmlFor="photoAlt">
                                Photo Description
                                <span className="ml-5 text-[.83rem] text-[var(--brown-500)]">{wordCount}/100</span>
                            </label>
                            <input type="text"
                                required
                                maxLength={100}
                                onChange={(e) => { setImageAlt(e.target.value); setWordCount(e.target.value.length) }}
                                className="input-browser-reset text-[.925rem] w-[190px] py-[3px] px-[8px] border border-[var(--brown-500)] text-[.9rem]" placeholder="Photo URL" />
                        </div>
                        <button className="custom-small-btn mx-auto mt-5">
                            Insert Image
                        </button>
                    </form>
                </ModalWrapper>
            }
        </>
    )
}
