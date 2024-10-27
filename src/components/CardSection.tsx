import React from "react";

export default function CardSection({ children, heading }: { children: React.ReactNode, heading: string }) {
    return (
        <section className="relative z-30 mx-10 mb-10 py-[30px]">
            <h3 className="text-center text-3xl rounded-sm custom-title-gradient mb-5">{heading}</h3>
            <div className=" flex flex-wrap justify-center bg-[var(--gray-200)]">
                {children}
            </div>
        </section>
    )
}
