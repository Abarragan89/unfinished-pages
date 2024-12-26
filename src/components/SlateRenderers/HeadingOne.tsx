import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps
export default function HeadingOne({ children, attributes }: SlateProps) {
    return (
        <h1
            {...attributes}
            className="text-[1.3rem] sm:text-[1.5rem]"
        >
            {children}
        </h1>
    )
}
