"use client";
import ModalWrapper from "./ModalWrapper"
import InputLabelEl from "../FormInputs/InputLabelEl"
import { useState } from "react"
import { useRouter } from "next/navigation";

interface Props {
    addAnchorLinkHandler: (url: string) => void;
}

export default function InsertSlateLink({ addAnchorLinkHandler }: Props) {

    const router = useRouter();
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
            addAnchorLinkHandler(userText)
            router.back();
        }
    }


    return (
        <ModalWrapper
            title="Enter URL"
            urlParam="addUrlLink"
        >
            <form onSubmit={(e) => submitHandler(e)}>
                <div className="w-[220px]">
                    <InputLabelEl
                        userText={userText}
                        handleStateChange={handleUserInputChange}
                        autofocus={true}
                        labelText={''}
                    />
                </div>
                {errorMsg &&
                    <p className="text-center text-red-600 text-[.9rem] mt-2 tracking-wide">{errorMsg}</p>
                }
                <button type="submit" className={`custom-small-btn mx-auto block ${errorMsg ? 'mt-2' : 'mt-4'}`}>Add Link</button>
            </form>
        </ModalWrapper>
    )
}
