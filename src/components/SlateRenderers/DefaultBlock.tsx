import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps
export default function DefaultBlock({ children, attributes }: SlateProps) {
    return <p {...attributes}>{children}</p>
}
