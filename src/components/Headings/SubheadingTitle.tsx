export default function SubheadingTitle({ title }: { title: string }) {
    return (
        <h2 className="text-center text-[2.05rem] text-[var(--brown-100)] rounded-sm tracking-widest mb-3 custom-title-gradient">{title}</h2>
    )
}
