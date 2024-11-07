import React from 'react'

export default function CodeBlock(props: { attributes: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLPreElement> & React.HTMLAttributes<HTMLPreElement>; children: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) {
    return (
        <pre {...props.attributes}
            className='bg-[var(--gray-500)] py-[2px] px-[5px]'
        >
            <code>{props.children}</code>
        </pre>
    )
}
