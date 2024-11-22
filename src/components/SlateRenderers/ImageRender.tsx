import { RenderElementProps } from "slate-react";
import Image from "next/image";

// Define the type for your component's props
type SlateProps = RenderElementProps
// Component to render image elements
export default function ImageRender({ attributes, element }: SlateProps) {
    return (
        <div {...attributes}>
            {element.type === 'image' && (
                <Image
                    src={element.image.url}
                    alt={element.image.alt}
                    className="mx-auto"
                    width={element.image.width}
                    height={element.image.height}
                />
            )}
        </div>
    )
}