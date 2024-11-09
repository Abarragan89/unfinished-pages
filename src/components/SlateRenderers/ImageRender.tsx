import { RenderElementProps } from "slate-react";
import Image from "next/image";

// Define the type for your component's props
type SlateProps = RenderElementProps
// Component to render image elements
export default function ImageRender({ children, attributes, element }: SlateProps) {
    return (
        <div {...attributes}>
            <div>
                {/* @ts-expect-error: Slate Rich Text Error */}
                <Image src={element.url} alt="Slate Image" className='mx-auto' />
            </div>
            {children}
        </div>
    )
}