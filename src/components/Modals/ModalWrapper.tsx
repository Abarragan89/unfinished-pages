"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    children: React.ReactNode;
    title: string;
    urlParam: string;

}
const ModalWrapper = ({ children, title, urlParam }: Props) => {

    const router = useRouter();
    const [isBackdropClick, setIsBackdropClick] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setIsBackdropClick(true);
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (isBackdropClick && e.currentTarget === e.target) {
            router.back();
        }
        setIsBackdropClick(false);
    };

    const params = useSearchParams();
    const showModal = params.get('showModal')

    return (
        <>
            {showModal === urlParam &&
                <div
                    // onClick={() => router.back()}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}

                    className="z-[999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-[75%]">
                    <div onClick={(e) => e.stopPropagation()} className="relative bg-[var(--paper-color)] p-[10px_25px_25px] rounded-md w-[92%] xs:w-fit mb-[100px] animate-dropDown max-w-[430px]">
                        {title !== 'none' &&
                            <h2 className="text-[1.35rem] font-bold mb-2 text-center text-[var(--off-black)]">{title}</h2>
                        }
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default ModalWrapper;
