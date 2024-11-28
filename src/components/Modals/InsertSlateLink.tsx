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
        if (!regex.test(userText)) {
            setErrorMsg('Invalid URL')
            return;
        }

        if (userText) {
            addLinkHandler(userText, isVideo)
            router.back();
        }
    }


    return (
        <ModalWrapper
            title={isVideo ? 'Add Video' : 'Add Link'}
            urlParam="addLink"
        >
            <form onSubmit={(e) => submitHandler(e)}>
                <div className="w-[220px]">
                    <InputLabelEl
                        userText={userText}
                        handleStateChange={handleUserInputChange}
                        autofocus={true}
                        labelText={'Enter URL'}
                    />
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
