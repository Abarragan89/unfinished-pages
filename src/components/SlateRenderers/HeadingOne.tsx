import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps
export default function HeadingOne({ children, attributes }: SlateProps) {
    return (
        <h1
            {...attributes}
            className="text-[26px] sm:text-[30px]"
        >
            {children}
        </h1>
    )
}
