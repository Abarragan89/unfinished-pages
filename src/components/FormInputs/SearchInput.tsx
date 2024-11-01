import React from "react";
import { IoSearchOutline } from "react-icons/io5";


export default function SearchInput({ placeholder }: { placeholder: string }) {
    return (
        <div className="relative">
            <IoSearchOutline className="absolute rounded-l-sm pt-[3px] h-[80%] w-[30px]" />
            <input type="input" className="input-browser-reset p-[3px_10px_3px_30px] text-[.93rem] w-[150px]" placeholder={placeholder} />
        </div>
    )
}
