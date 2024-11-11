"use client"
import { useState } from "react"
import UploadImageInput from "./UploadImageInput";

export default function EditMetaData() {

    const [blogTitle, setBlogTitle] = useState<string>('');
    const [blogTitleCount, setBlogTitleCount] = useState<number>(0);

    const [blogDescription, setBlogDescription] = useState<string>('');
    const [blogDescriptionCount, setBlogDescriptionCount] = useState<number>(0);

    const [blogKeywords, setBlogKeywords] = useState<string>('');
    const [blogKeywordsCount, setBlogKeywordsCount] = useState<number>(0);

    const [isDetailsSavable, setIsDetailsSavable] = useState<boolean>(false);

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
            case 'image':
                break;
            default:
                break;
        }
        setIsDetailsSavable(true)
    }

    async function saveDetailsHandler() {
        setIsDetailsSavable(false)
    }

    return (
        <section className="relative max-w-[800px] mx-auto w-[80%] border border-[var(--gray-300)] p-[25px] pt-[60px] rounded-sm my-[40px] bg-[var(--off-white)] custom-low-lifted-shadow">
            <h3
                className="tracking-wider text-[1.15rem] w-fit absolute mx-auto left-0 top-0 text-center rounded-br-[30px] bg-[var(--brown-500)] text-white py-[6px] px-5 border-t-0 border-l-0 custom-low-lifted-shadow"
            >Blog Details
            </h3>
            <button
                className={`absolute right-[15px] top-[10px] custom-small-btn ${isDetailsSavable ? '' : 'opacity-[0.5] pointer-events-none'}`}
                onClick={saveDetailsHandler}
            >
                Save
            </button>
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


            <div className="flex flex-col mt-4">
                {/* <div className="flex justify-between mx-1 tracking-wide">
                    <label htmlFor="blog-title">Keywords</label>
                    <p className="text-[.9rem]">{blogKeywordsCount}/150</p>
                </div>
                <textarea
                    onChange={(e) => { setBlogKeywords(e.target.value); setBlogKeywordsCount(e.target.value.length) }}
                    className="input-browser-reset py-[5px] px-[10px] border border-[var(--brown-500)] text-[.95rem]]"
                    id="blog-title"
                    placeholder="separate each word or phrase with a comma. (eg. teaching, curriculum, fifth grade, etc.)"
                    maxLength={150}
                    required
                    rows={3}
                    cols={30}
                /> */}

            </div>

            <UploadImageInput />

        </section>
    )
}