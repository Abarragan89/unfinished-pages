import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
    title: String;

}
const ModalWrapper = ({ children, title }: Props) => {

    const router = useRouter();

    return (
        <div onClick={() => router.back()} className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-gray-200 p-4 rounded-md max-w-md w-full mb-[100px] animate-dropDown">
                {title !== 'none' &&
                    <h2 className="text-[1.35rem] font-bold mb-4 text-center text-[var(--dark-text-color)]">{title}</h2>
                }
                {children}
            </div>
        </div>
    )
}

export default ModalWrapper;
