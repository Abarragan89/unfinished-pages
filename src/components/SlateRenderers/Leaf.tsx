import { RenderLeafProps } from 'slate-react';

interface CustomLeaf {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

export default function Leaf(props: RenderLeafProps & { leaf: CustomLeaf }) {
    return (
        <span
            {...props.attributes}
            style={{
                fontWeight: props.leaf.bold ? 'bold' : 'normal',
                textDecoration: props.leaf.underline ? 'underline' : 'none',
                fontStyle: props.leaf.italic ? 'italic' : 'normal'
            }}
        >
            {props.children}
        </span>
    )
}
