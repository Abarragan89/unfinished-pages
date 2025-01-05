interface Props {
    userText: string;
    handleStateChange: (textInput: string) => void;
    autofocus?: boolean;
    characterLimit?: number;
    labelText?: string;
    placeholderText?: string;
}

export default function InputLabelEl({ handleStateChange, userText, autofocus = false, characterLimit, labelText, placeholderText }: Props) {
    return (
        <div className="flex flex-col w-fit mx-auto mt-2 w-full">

            {labelText &&
                <div className="flex justify-between mx-1">
                    <label
                        className="text-[1rem]"
                        htmlFor={labelText}
                    >{labelText}</label>
                    {characterLimit &&
                        <p className="text-[.85rem]">{userText.length}/{characterLimit}</p>
                    }
                </div>
            }
            <input
                type="text"
                id={labelText}
                value={userText}
                placeholder={placeholderText ?? undefined}
                autoFocus={autofocus}
                maxLength={characterLimit ?? undefined}
                onChange={(e) => handleStateChange(e.target.value)}
                className="input-browser-reset text-[1rem] border-2 border-[var(--gray-300)] focus:border-[var(--brown-300)] mx-auto block px-2 py-[3px] w-full"
            />
        </div>
    )
}
