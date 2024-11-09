import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps
export default function NumberedList({ children, attributes }: SlateProps) {
    return (
        <ol
            className="list-decimal ml-[35px]"
            {...attributes}
        >
            {children}
        </ol>
    )
}
