"use client"
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
    title: string;
    urlParam: string;

}
const ModalWrapper = ({ children, title, urlParam }: Props) => {

    const router = useRouter();
    const params = useSearchParams();
    const showModal = params.get('showModal')

    return (
        <>
            {showModal === urlParam &&
                <div onClick={() => router.back()} className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div onClick={(e) => e.stopPropagation()} className="relative bg-[var(--paper-color)] p-[10px_50px_25px] rounded-md w-[88%] xs:w-fit mb-[100px] animate-dropDown">
                        {title !== 'none' &&
                            <h2 className="text-[1.35rem] font-bold mb-2 text-center text-[var(--brown-500)]">{title}</h2>
                        }
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default ModalWrapper;
