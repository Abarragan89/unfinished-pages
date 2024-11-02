
export default function LgBtn({ text, clickHandler }: { text: string, clickHandler: () => void }) {
    return (
        <button className={`custom-large-btn`} onClick={clickHandler}>{text}</button>
    )
}
