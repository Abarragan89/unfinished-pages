import { JSX, ClassAttributes, HTMLAttributes, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

export default function DefaultBlock(props: { attributes: JSX.IntrinsicAttributes & ClassAttributes<HTMLParagraphElement> & HTMLAttributes<HTMLParagraphElement>; children: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) {
    return <p {...props.attributes}>{props.children}</p>
}
