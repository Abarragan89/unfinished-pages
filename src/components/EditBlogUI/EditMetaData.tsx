"use client"
import { useState } from "react"
import UploadImageInput from "./UploadImageInput";
import InputBlockWrapper from "./InputBlockWrapper";
import axios from "axios";

interface Props {
    title: string;
    description: string;
    pictureURL: string;
    blogId: string
}

export default function EditMetaData({ title, description, pictureURL, blogId }: Props) {

    const [blogTitle, setBlogTitle] = useState<string>(title);
    const [blogTitleCount, setBlogTitleCount] = useState<number>(title.length);

    const [blogDescription, setBlogDescription] = useState<string>(description);
    const [blogDescriptionCount, setBlogDescriptionCount] = useState<number>(description.length);
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

        axios({
            method: 'PUT',
            url: `/api/authorRoutes/blog/${blogId}/blogDetails`,
            data: {
                blogTitle,
                blogDescription
            }
        })
            .then(response => {
                console.log('response in front end ', response)
                setIsDetailsSaving(false)
                setIsDetailsSavable(false)
            })
            .catch(error => {
                console.log('error updating blog details', error)
            })
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
                    <p className="text-[.9rem]">{blogDescriptionCount}/150</p>
                </div>
                <textarea
                    onChange={(e) => handleDetailsTextChange('description', e)}
                    className="input-browser-reset py-[5px] px-[10px] border-2 border-[var(--gray-300)] text-[.95rem]"
                    id="blog-title"
                    maxLength={150}
                    required
                    value={blogDescription}
                    rows={3}
                    cols={30}
                />
            </div>
            <UploadImageInput
                blogId={blogId}
                pictureURL={pictureURL}
            />
        </InputBlockWrapper>

    )
}
