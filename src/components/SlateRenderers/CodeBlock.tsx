import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps

export default function CodeBlock({ attributes, children} : SlateProps) {
    return (
        <pre {...attributes}
            className='bg-slate-700 leading-normal py-[2px] px-[5px] text-[var(--off-white)] text-[14px]'
        >
            <code>{children}</code>
        </pre>
    )
}
