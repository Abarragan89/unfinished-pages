import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
    title: string;

}
const ModalWrapper = ({ children, title }: Props) => {

    const router = useRouter();

    return (
        <div onClick={() => router.back()} className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[var(--paper-color)] p-[25px_50px] rounded-md w-[88%] xs:w-fit mb-[100px] animate-dropDown">
                {title !== 'none' &&
                    <h2 className="text-[1.35rem] font-bold mb-4 text-center text-[var(--brown-500)]">{title}</h2>
                }
                {children}
            </div>
        </div>
    )
}

export default ModalWrapper;
