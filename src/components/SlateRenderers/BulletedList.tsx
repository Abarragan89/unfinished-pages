import { JSX, ClassAttributes, OlHTMLAttributes, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

export default function BulletedList(props: { attributes: JSX.IntrinsicAttributes & ClassAttributes<HTMLOListElement> & OlHTMLAttributes<HTMLOListElement>; children: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) {
    return (
        <ul  
            className="list-disc ml-[35px]"
        {...props.attributes}
        >
            {props.children}
        </ul>
    )
}
