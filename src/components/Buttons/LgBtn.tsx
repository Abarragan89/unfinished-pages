export default function LgBtn({ text, dark }: { text: string, dark?: boolean }) {
    return (
        <button className={`custom-large-btn ${dark ? 'custom-large-btn-dark' : ''}`}>{text}</button>
    )
}
