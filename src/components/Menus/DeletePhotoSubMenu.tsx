import { useEffect, useRef } from "react"

interface Props {
    photoId: string;
    onClickHandler: (photoUrl: string, photoId: string) => void;
    closeMenuState: React.Dispatch<React.SetStateAction<string>>;
    photoUrl: string;
}
export default function DeletePhotoSubMenu({ photoUrl, onClickHandler, closeMenuState, photoId }: Props) {

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
    }, [closeMenuState]);
    
    return (
        <menu
            ref={deleteSubMenu}
            className="absolute top-[5px] right-[-30px] z-40 w-fit bg-[var(--off-black)] py-[5px] px-3 rounded-lg text-[.95rem] text-[var(--off-white)]"
        >

            <p
                onClick={() => onClickHandler(photoUrl, photoId)}
                className="hover:cursor-pointer hover:text-[var(--brown-100)]"
            >Delete</p>
        </menu>
    )
}
