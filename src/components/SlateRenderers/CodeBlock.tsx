import React from 'react'

export default function CodeBlock(props: { attributes: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLPreElement> & React.HTMLAttributes<HTMLPreElement>; children: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}
