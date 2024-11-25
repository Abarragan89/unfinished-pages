import { useEffect, useRef } from "react"

interface Props {
    photoId: string;
    onClickHandler: (photoId: string) => void;
    closeMenuState: React.Dispatch<React.SetStateAction<string>>;
}
export default function DeletePhotoSubMenu({ photoId, onClickHandler, closeMenuState }: Props) {

    const deleteSubMenu = useRef<HTMLMenuElement | null>(null);

    // Handle clicks outside of the menu to close menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                deleteSubMenu.current &&
                !deleteSubMenu.current.contains(event.target as Node)
            ) {
                closeMenuState('')
            }
        }
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);
    return (
        <menu
            ref={deleteSubMenu}
            className="absolute top-[5px] right-[-30px] z-40 w-fit bg-[var(--off-black)] py-[5px] px-3 rounded-lg text-[.9rem] text-[var(--off-white)]"
        >

            <p
                onClick={() => onClickHandler(photoId)}
                className="hover:cursor-pointer hover:text-[var(--brown-100)]"
            >Delete</p>
        </menu>
    )
}
