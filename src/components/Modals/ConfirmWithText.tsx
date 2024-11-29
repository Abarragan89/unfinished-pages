'use client';
import ModalWrapper from "./ModalWrapper";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

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
                <input
                    type="text"
                    autoFocus
                    onChange={(e) => setUserInput(e.target.value)}
                    className="input-browser-reset w-60 mt-4 py-[5px] px-[10px] border-2 border-[var(--gray-300)] mx-4"
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
