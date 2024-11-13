"use client"
import { useState } from "react"
import UploadImageInput from "./UploadImageInput";
import InputBlockWrapper from "./InputBlockWrapper";

export default function EditMetaData() {

    const [blogTitle, setBlogTitle] = useState<string>('');
    const [blogTitleCount, setBlogTitleCount] = useState<number>(0);

    const [blogDescription, setBlogDescription] = useState<string>('');
    const [blogDescriptionCount, setBlogDescriptionCount] = useState<number>(0);
    const [isDetailsSavable, setIsDetailsSavable] = useState<boolean>(false);
    const [isDetailsSaving, setIsDetailsSaving] = useState<boolean>(false);

    function handleDetailsTextChange(inputArea: string, e: React.ChangeEvent<HTMLTextAreaElement>) {
        switch (inputArea) {
            case 'title':
                setBlogTitle(e.target.value);
                setBlogTitleCount(e.target.value.length)
                break;
            case 'description':
                setBlogDescription(e.target.value);
                setBlogDescriptionCount(e.target.value.length)
                break;
            default:
                break;
        }
        setIsDetailsSavable(true)
    }

    async function saveDetailsHandler() {
        setIsDetailsSaving(true)
        setTimeout(() => {
            setIsDetailsSaving(false)
            setIsDetailsSavable(false)
        }, 2000)
    }

    return (
        <InputBlockWrapper
            saveHandler={saveDetailsHandler}
            isButtonAble={isDetailsSavable}
            subtitle="Blog Details"
            UIStateTrigger={isDetailsSaving}
        >
            <div className="flex flex-col">
                <div className="flex justify-between mx-1 tracking-wide">
                    <label htmlFor="blog-title" className="text-[.95rem]">Title</label>
                    <p className="text-[.9rem] text-center">{blogTitleCount}/65</p>
                </div>
                <textarea
                    onChange={(e) => handleDetailsTextChange('title', e)}
                    className={"input-browser-reset py-[5px] px-[10px] border-2 border-[var(--gray-300)] text-[1.15rem] font-bold bg-white"}
                    id="blog-title"
                    maxLength={65}
                    required
                    rows={1}
                    cols={30}
                />
            </div>


            <div className="flex flex-col mt-4">
                <div className="flex justify-between mx-1 tracking-wide">
                    <label htmlFor="blog-title" className="text-[.95rem]">Description</label>
                    <p className="text-[.9rem]">{blogDescriptionCount}/150</p>
                </div>
                <textarea
                    onChange={(e) => handleDetailsTextChange('description', e)}
                    className="input-browser-reset py-[5px] px-[10px] border-2 border-[var(--gray-300)] text-[.95rem]"
                    id="blog-title"
                    maxLength={150}
                    required
                    rows={3}
                    cols={30}
                />
            </div>
            <UploadImageInput />
        </InputBlockWrapper>

    )
}
