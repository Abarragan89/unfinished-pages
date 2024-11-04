
export default function NumberedList(props) {
    return (
        <ol  {...props.attributes}>
            {props.children}
        </ol>
    )
}
