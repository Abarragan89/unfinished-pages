
export default function LgBtn({ text, clickHandler }: { text: string, clickHandler: () => {} }) {
    return (
        <button className={`custom-large-btn`}>{text}</button>
    )
}
