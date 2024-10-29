import SubheadingTitle from "./Headings/SubheadingTitle"

export default function CardSection({ children, heading }: { children: React.ReactNode, heading: string }) {

    return (
        <section className="max-w-[1180px] w-[100%] mx-auto mt-10 py-3 custom-card-section-shadow rounded-[6px] border border-[var(--gray-300)] bg-[var(--gray-100)]">
            <SubheadingTitle title={heading} />
            <div className=" flex flex-wrap justify-center">
                {children}
            </div>
        </section>
    )
}
