import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps

export default function CodeBlock({ attributes, children} : SlateProps) {
    return (
        <pre {...attributes}
            className='bg-[var(--gray-500)] py-[2px] px-[5px]'
        >
            <code>{children}</code>
        </pre>
    )
}
