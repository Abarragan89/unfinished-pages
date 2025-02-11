"use client"
import { useState } from "react"
import InputBlockWrapper from "./InputBlockWrapper";
import axios from "axios";
import SelectAreaEl from "../FormInputs/SelectAreaEl";
import InputLabelEl from "../FormInputs/InputLabelEl";

interface Props {
    title: string;
    description: string;
    blogId: string;
    categories: { [key: string]: string }[];
    tags: string;
}

export default function EditMetaData({ title, description, blogId, categories, tags }: Props) {

    const [blogTitle, setBlogTitle] = useState<string>(title);
    const [blogDescription, setBlogDescription] = useState<string>(description);
    const [blogTags, setBlogTags] = useState<string>(tags || '');
    const [isDetailsSavable, setIsDetailsSavable] = useState<boolean>(false);
    const [isDetailsSaving, setIsDetailsSaving] = useState<boolean>(false);
    const [blogCategories, setBlogCategories] = useState<{ [key: string]: string }[]>(categories);
    const [errorMessage, setErrorMessage] = useState<string>('');



    async function saveDetailsHandler() {
        try {
            setErrorMessage('')
            setIsDetailsSaving(true);
            await axios.put(`/api/authorRoutes/blog/${blogId}/blogDetails`, {
                blogTitle: blogTitle.trim(),
                blogDescription: blogDescription.trim(),
                blogCategories: blogCategories,
                blogTags: blogTags.trim(),
            });
        } catch (error) {
            console.log('Error updating blog details:', error);
            setErrorMessage('Blog not updated. Please try again.')
        } finally {
            setIsDetailsSaving(false);
            setIsDetailsSavable(false);
        }
    }

    function handleInputStateChange(value: string) {
        setBlogTags(value)
        setIsDetailsSavable(true)
    }

    return (
        <form>
            <InputBlockWrapper
                saveHandler={saveDetailsHandler}
                isButtonAble={isDetailsSavable}
                subtitle="Blog Details"
                UIStateTrigger={isDetailsSaving}
                errorMsg={errorMessage}
            >
                {/* Textarea Input */}
                <div className="flex flex-col mt-5">
                    <div className="flex justify-between mx-1 tracking-wide">
                        <label htmlFor="blog-title" className="text-[1rem]">Title</label>
                        <p className="text-[.9rem] text-center">{blogTitle.length}/70</p>
                    </div>
                    <textarea
                        onChange={(e) => { setBlogTitle(e.target.value); setIsDetailsSavable(true) }}
                        className={"input-browser-reset py-[5px] px-[10px] border-2 border-[var(--gray-300)] text-[1.15rem] font-bold bg-white"}
                        id="blog-title"
                        value={blogTitle}
                        maxLength={70}
                        required
                        rows={1}
                        cols={30}
                    />
                </div>
                {/* Textarea Input */}
                <div className="flex flex-col mt-4">
                    <div className="flex justify-between mx-1 tracking-wide">
                        <label htmlFor="blog-title" className="text-[1rem]">Description</label>
                        <p className="text-[.9rem]">{blogDescription.length}/150</p>
                    </div>
                    <textarea
                        onChange={(e) => { setBlogDescription(e.target.value); setIsDetailsSavable(true) }}
                        className="input-browser-reset py-[5px] px-[10px] border-2 border-[var(--gray-300)] text-[1rem]"
                        id="blog-title"
                        maxLength={150}
                        value={blogDescription}
                        rows={3}
                        cols={30}
                    />
                </div>
                {/* Category Input */}
                <div className="mt-4">
                    <SelectAreaEl
                        toggleSavable={setIsDetailsSavable}
                        blogCategories={blogCategories}
                        setBlogCategories={setBlogCategories}
                    />
                </div>
                {/* Tag Input */}
                <div className="mt-4">
                    <InputLabelEl
                        userText={blogTags}
                        handleStateChange={handleInputStateChange}
                        labelText="Tags"
                        characterLimit={200}
                        placeholderText="finance, first day of school, artificial intelligence, software development, "
                    />
                </div>
            </InputBlockWrapper >
        </form>

    )
}
