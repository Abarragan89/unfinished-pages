import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps
export default function HeadingOne({ children, attributes }: SlateProps) {
    return (
        <h1
            {...attributes}
            className="text-[1.8rem] font-[500]"
        >
            {children}
        </h1>
    )
}
