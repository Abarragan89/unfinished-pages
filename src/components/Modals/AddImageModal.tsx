import ModalWrapper from "./ModalWrapper"
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function AddImageModal({ onClickHandler, setImageUrl }) {

    const router = useRouter();

    function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onClickHandler();
        router.back();
    }

    const params = useSearchParams();
    const showModal = params.get('showModal')

    return (
        <>
            {showModal === "addImage" &&
                <ModalWrapper title="Add Image">
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <input type="text"
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="input-browser-reset text-[.925rem] w-[190px] p-[2px] border border-[var(--brown-500)] text-[.95rem]" placeholder="email" />
                        <button className="custom-small-btn mx-auto mt-5">
                            Insert Image
                        </button>
                    </form>
                </ModalWrapper>
            }
        </>
    )
}
