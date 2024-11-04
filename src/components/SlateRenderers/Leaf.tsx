export default function Leaf(props: any) {
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
