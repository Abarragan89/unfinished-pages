
export default function MainHeading({ title }: { title: string }) {
    return (
        <h1 className="text-center text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] font-medium rounded-sm py-3 tracking-[10px] bg-[rgba(36,36,36,0.4)] custom-main-heading-pixels text-[var(--paper-color)]">
            {title}</h1>
    )
}
