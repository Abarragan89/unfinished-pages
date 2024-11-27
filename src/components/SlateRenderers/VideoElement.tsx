import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type SlateProps = RenderElementProps

export default function VideoElement({ attributes, children, element }: SlateProps) {
    return (

        <div {...attributes}>
            {element.type === 'video' &&
                <div contentEditable={false}>
                    <iframe
                        width="500"
                        height="340"
                        src={element.videoUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="mx-auto"
                    ></iframe>
                </div>
            }
            {children}
        </div>
    );
}
