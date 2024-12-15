import React from "react";
import { IoSearchOutline } from "react-icons/io5";

interface Props {
    placeholder: string;
    inputWidth?: string;
    onChangeHandler: (input: string) => Promise<void>;
}

export default function SearchInput({
    placeholder,
    inputWidth,
    onChangeHandler
}: Props
) {
    return (

        <>
            {
                inputWidth === 'full' ?
                    <div className="relative w-[100%]">
                        <IoSearchOutline className="absolute rounded-l-sm pt-[4px] h-[60%] w-[30px] text-[var(--brown-300)]" />
                        <input type="input" onChange={(e) => onChangeHandler(e.target.value)} className="input-browser-reset p-[3px_10px_3px_30px] text-[.95rem] text-center w-full border border-[var(--gray-300)] custom-low-lifted-shadow mb-3 h-[33px]
                        " placeholder={placeholder} />
                    </div>

                    :
                    <div className="relative">
                        <IoSearchOutline className="absolute rounded-l-sm pt-[3px] h-[80%] w-[30px] text-[var(--brown-300)]" />
                        <input type="input" onChange={(e) => onChangeHandler(e.target.value)} className="input-browser-reset p-[3px_10px_3px_30px] text-[.835rem] w-[140px]" placeholder={placeholder} />
                    </div>
            }
        </>

    )
}
