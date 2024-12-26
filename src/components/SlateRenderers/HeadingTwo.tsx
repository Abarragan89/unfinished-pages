import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps

export default function HeadingTwo({ children, attributes} : SlateProps) {
    return (
        <h2
            {...attributes}
            className="text-[1.2rem] sm:text-[1.3rem]"
        >
            {children}
        </h2>
    )
}
