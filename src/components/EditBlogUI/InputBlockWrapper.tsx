
interface Props {
    children: React.ReactNode;
    isButtonAble: boolean;
    subtitle: string;
    saveHandler: () => void;
}


export default function InputBlockWrapper({ children, subtitle, isButtonAble, saveHandler }: Props) {
    return (
        <section className="relative max-w-[800px] mx-auto w-[80%] border border-[var(--gray-300)] p-[25px] pt-[60px] rounded-sm my-[40px] bg-[var(--off-white)] custom-low-lifted-shadow">
            <h3
                className="tracking-wider text-[1.15rem] w-fit absolute mx-auto left-0 top-0 text-center rounded-br-[30px] bg-[var(--brown-500)] text-white py-[6px] px-5 border-t-0 border-l-0 custom-low-lifted-shadow"
            >
                {subtitle}
            </h3>
            <button
                className={`absolute right-[15px] top-[10px] custom-small-btn ${isButtonAble ? '' : 'opacity-[0.5] pointer-events-none'}`}
                onClick={saveHandler}
            >
                Save
            </button>

            {children}
        </section>
    )
}
