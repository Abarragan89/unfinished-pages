import { JSX, ClassAttributes, HTMLAttributes, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";


export default function HeadingOne(props: { attributes: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>; children: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) {
    return (
        <h1
            {...props.attributes}
            className="text-[2rem] font-[500]"
        >
            {props.children}
        </h1>
    )
}
