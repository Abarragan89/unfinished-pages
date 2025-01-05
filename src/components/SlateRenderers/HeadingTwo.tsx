import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps

export default function HeadingTwo({ children, attributes} : SlateProps) {
    return (
        <h2
            {...attributes}
            className="text-[22px] sm:text-[24px]"
        >
            {children}
        </h2>
    )
}
