import { BarLoader } from "react-spinners";

interface Props {
    children: React.ReactNode;
    isButtonAble?: boolean;
    subtitle?: string;
    UIStateTrigger?: boolean;
    showSaveButton?: boolean;
    saveHandler?: () => Promise<void>;
    errorMsg?: string
}

export default function InputBlockWrapper({ children, subtitle, isButtonAble, saveHandler, UIStateTrigger, showSaveButton = true, errorMsg }: Props) {
    return (
        <section className="relative max-w-[800px] mx-auto w-[90%] border border-[var(--gray-300)] p-[20px] pb-[30px] sm:px-[35px] pt-[60px] rounded-sm mt-[20px] mb-[50px] bg-[var(--gray-100)] custom-low-lifted-shadow">
            <h3
                className="tracking-wider text-[1.15rem] w-fit absolute mx-auto left-0 top-0 text-center rounded-br-[30px] bg-[var(--brown-600)] text-white py-[6px] px-5 border-t-0 border-l-0 custom-low-lifted-shadow"
            >
                {subtitle}
            </h3>
            {/* Only show button if it is handling the state change */}
            {showSaveButton &&
                <button
                    type="button"
                    className={`absolute right-[15px] top-[10px] h-[30px] custom-small-btn bg-[var(--off-black)] ${isButtonAble ? '' : 'opacity-[.5] pointer-events-none'}`}
                    onClick={UIStateTrigger ? undefined : saveHandler}
                >
                    {UIStateTrigger ?
                        <BarLoader
                            width={30}
                            height={2}
                            loading={UIStateTrigger}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            className="text-[var(--off-white)]"
                        />
                        :
                        'Save'
                    }
                </button>
            }
            {errorMsg && <p className="text-[var(--danger)] text-[.9rem] absolute top-[40px] right-[15px] bg-red-950 px-2 py-[2px] m-1 rounded-md">{errorMsg}</p>}
            {children}
        </section>
    )
}
