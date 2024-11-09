import { RenderElementProps } from "slate-react";
import { JSX } from "react";

// Define the type for your component's props
type BulletedListProps = RenderElementProps & {
    // You can add any other custom props specific to your component here if needed
};

export default function BulletedList({ attributes, children }: BulletedListProps) {
    return (
        <ul className="list-disc ml-[35px]" {...attributes}>
            {children}
        </ul>
    );
}
