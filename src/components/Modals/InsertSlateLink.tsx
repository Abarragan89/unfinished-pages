"use client";
import ModalWrapper from "./ModalWrapper"
import InputLabelEl from "../FormInputs/InputLabelEl"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface Props {
    addLinkHandler: (url: string, isVideo: boolean) => void;
}

export default function InsertSlateLink({ addLinkHandler }: Props) {

    const router = useRouter();
    const params = useSearchParams();
    const isVideoInParams: string | null = params.get('isVideo')
    const isVideo = isVideoInParams ? true : false;
    const [userText, setUserText] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')

    function handleUserInputChange(userInput: string) {
        setUserText(userInput)
        setErrorMsg('')
    }

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const regex = /^https:\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/;
        // initaill just set it to usertext, will change if it is a video and needs to be extracted from iframe
        let urlLink: string = userText;
        // if a video, need to extract it from iframe
        if (isVideo) {
            // get starting index of embed URL
            const startIndex = userText.indexOf('src="') + 5
            // get ending index of embed URL
            const endIndex = userText.indexOf('"', startIndex + 1)
            // extract embedLink
            urlLink = userText.slice(startIndex, endIndex)
        }
        // chech validity of https link
        if (!regex.test(urlLink)) {
            setErrorMsg('Invalid URL')
            return;
        }  
        // add Link
        if (userText) {
            addLinkHandler(urlLink, isVideo)
            router.back();
        }
    }

    function labelForVideo() {
        return (
            <div>
                <p>Enter Iframe Embed</p>
                <a>See How Here</a>
            </div>
        )
    }

    return (
        <ModalWrapper
            title={isVideo ? 'Add YouTube Video' : 'Add Link'}
            urlParam="addLink"
        >
            <form onSubmit={(e) => submitHandler(e)}>
                <div className="w-[280px] relative">
                    <InputLabelEl
                        userText={userText}
                        handleStateChange={handleUserInputChange}
                        autofocus={true}
                        labelText={isVideo ? 'Enter Iframe' : 'Enter Url'}
                    />
                    {isVideo && <a href="https://www.youtube.com/watch?v=8JUyOwn40SI" rel="noopener noreferrer" target="_blank" className="absolute top-[-2px] right-1 underline text-[.875rem] hover:italic text-[var(--success)]">See how here</a>}
                </div>
                {errorMsg &&
                    <p className="text-center text-red-600 text-[.9rem] mt-2 tracking-wide">{errorMsg}</p>
                }
                <button type="submit" className={`custom-small-btn bg-[var(--off-black)] mx-auto block ${errorMsg ? 'mt-2' : 'mt-4'}`}>
                    {isVideo ?
                        'Add Video'
                        :
                        'Add Link'
                    }
                </button>
            </form>
        </ModalWrapper>
    )
}
