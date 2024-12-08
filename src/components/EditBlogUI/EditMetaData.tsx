"use client"
import { useState } from "react"
import UploadImageInput from "./UploadImageInput";
import InputBlockWrapper from "./InputBlockWrapper";
import axios from "axios";
import SelectAreaEl from "../FormInputs/SelectAreaEl";

interface Props {
    title: string;
    description: string;
    coverPhotoUrl: string;
    blogId: string;
    categories: { [key: string]: string }[]
}

export default function EditMetaData({ title, description, coverPhotoUrl, blogId, categories }: Props) {

    const [blogTitle, setBlogTitle] = useState<string>(title);
    const [blogDescription, setBlogDescription] = useState<string>(description);
    const [isDetailsSavable, setIsDetailsSavable] = useState<boolean>(false);
    const [isDetailsSaving, setIsDetailsSaving] = useState<boolean>(false);
    const [blogCategories, setBlogCategories] = useState<{ [key: string]: string }[]>(categories)
    
    console.log('blogcategories ', blogCategories)

    async function saveDetailsHandler() {
        console.log('blog categories', blogCategories)
        try {
            setIsDetailsSaving(true);
            await axios.put(`/api/authorRoutes/blog/${blogId}/blogDetails`, {
                blogTitle: blogTitle.trim(),
                blogDescription: blogDescription.trim(),
                blogCategories: blogCategories
            });
            setIsDetailsSaving(false);
            setIsDetailsSavable(false);
        } catch (error) {
            console.log('Error updating blog details:', error);
        }
    }
    return (
        <form>
            <InputBlockWrapper
                saveHandler={saveDetailsHandler}
                isButtonAble={isDetailsSavable}
                subtitle="Blog Details"
                UIStateTrigger={isDetailsSaving}
            >
                <div className="flex flex-col">
                    <div className="flex justify-between mx-1 tracking-wide">
                        <label htmlFor="blog-title" className="text-[.95rem]">Title</label>
                        <p className="text-[.9rem] text-center">{blogTitle.length}/65</p>
                    </div>
                    <textarea
                        onChange={(e) => { setBlogTitle(e.target.value); setIsDetailsSavable(true) }}
                        className={"input-browser-reset py-[5px] px-[10px] border-2 border-[var(--gray-300)] text-[1.15rem] font-bold bg-white"}
                        id="blog-title"
                        value={blogTitle}
                        maxLength={65}
                        required
                        rows={1}
                        cols={30}
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <div className="flex justify-between mx-1 tracking-wide">
                        <label htmlFor="blog-title" className="text-[.95rem]">Description</label>
                        <p className="text-[.9rem]">{blogDescription.length}/150</p>
                    </div>
                    <textarea
                        onChange={(e) => { setBlogDescription(e.target.value); setIsDetailsSavable(true) }}
                        className="input-browser-reset py-[5px] px-[10px] border-2 border-[var(--gray-300)] text-[.95rem]"
                        id="blog-title"
                        maxLength={150}
                        value={blogDescription}
                        rows={3}
                        cols={30}
                    />
                </div>

                <div className="mt-4">
                    <SelectAreaEl
                        toggleSavable={setIsDetailsSavable}
                        blogCategories={blogCategories}
                        setBlogCategories={setBlogCategories}
                    />
                </div>


                <UploadImageInput
                    blogId={blogId}
                    coverPhotoUrl={coverPhotoUrl}
                />
            </InputBlockWrapper >
        </form>

    )
}
