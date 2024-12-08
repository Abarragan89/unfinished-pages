import { BarLoader } from "react-spinners";

interface Props {
    children: React.ReactNode;
    isButtonAble?: boolean;
    subtitle?: string;
    UIStateTrigger?: boolean;
    showSaveButton?: boolean;
    saveHandler?: () => Promise<void>;
}

export default function InputBlockWrapper({ children, subtitle, isButtonAble, saveHandler, UIStateTrigger, showSaveButton = true }: Props) {
    return (
        <section className="relative max-w-[800px] mx-auto w-[80%] border border-[var(--gray-300)] p-[20px] pb-[30px] sm:px-[35px] pt-[60px] rounded-sm mt-[20px] mb-[50px] bg-[var(--off-white)] custom-low-lifted-shadow">
            <h3
                className="tracking-wider text-[1.15rem] w-fit absolute mx-auto left-0 top-0 text-center rounded-br-[30px] bg-[var(--brown-500)] text-white py-[6px] px-5 border-t-0 border-l-0 custom-low-lifted-shadow"
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
                            color={'white'}
                            width={30}
                            height={2}
                            loading={UIStateTrigger}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        :
                        'Save'
                    }
                </button>
            }
            {children}
        </section>
    )
}
