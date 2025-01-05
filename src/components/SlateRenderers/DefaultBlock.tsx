import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps
export default function DefaultBlock({ children, attributes }: SlateProps) {
    return <p {...attributes}
        className="text-[.975rem] sm:text-[1.05rem]"
    >
        {children}
    </p>
}
