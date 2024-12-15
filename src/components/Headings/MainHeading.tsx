
export default function MainHeading({ title }: { title: string }) {
    return (
        <h1 className="text-center text-[1.4rem] sm:text-[2.5rem] lg:text-[3rem] font-medium rounded-sm py-3 tracking-[2px] sm:tracking-[5px] bg-[rgba(36,36,36,0.4)] custom-main-heading-pixels text-[var(--white)]">
            {title}</h1>
    )
}
