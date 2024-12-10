'use client';
import ModalWrapper from "./ModalWrapper";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import InputLabelEl from "../FormInputs/InputLabelEl";

interface Props {
    onConfirmHandler: () => Promise<void>;
    confirmText: string;
    urlParamTrigger: string;
    modalTitle: string;
    isLoading: boolean
    btnColor: string;
    btnText: string;
    errorMsg: string;
}

export default function ConfirmWithText({ onConfirmHandler, confirmText, urlParamTrigger, modalTitle, isLoading, btnColor, btnText, errorMsg }: Props) {
    const [userInput, setUserInput] = useState<string>('')
    return (
        <ModalWrapper
            title={modalTitle}
            urlParam={urlParamTrigger}
        >
            <div
                className="flex flex-col items-center"
            >
                <p className="text-center text-[var(--brown-500)] mx-5">Type <span className="text-[var(--danger)] underline">{confirmText}</span> to confirm.</p>

                <InputLabelEl
                    userText={userInput}
                    handleStateChange={setUserInput}
                />
                {errorMsg &&
                    <p
                        className="text-[.9rem] text-center text-[var(--danger)]"
                    >{errorMsg}</p>
                }
                <button
                    className={`custom-small-btn ${btnColor} mt-4 ${userInput === confirmText || isLoading ? '' : 'opacity-50 pointer-events-none'}`}
                    onClick={onConfirmHandler}
                >
                    {isLoading ?
                        <PulseLoader
                            color={'white'}
                            loading={isLoading}
                            size={7}
                            aria-label="Loading Spinner"
                            data-testid="loader"

                        />
                        :
                        btnText
                    }
                </button>
            </div>
        </ModalWrapper>
    )
}
