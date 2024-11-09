import { RenderElementProps } from "slate-react";

// Define the type for your component's props
type BulletedListProps = RenderElementProps

export default function BulletedList({ attributes, children }: BulletedListProps) {
    return (
        <ul className="list-disc ml-[35px]" {...attributes}>
            {children}
        </ul>
    );
}
