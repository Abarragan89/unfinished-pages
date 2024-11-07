import { JSX, ClassAttributes, HTMLAttributes, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

// Component to render image elements
export default function Image(props: { attributes: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; element: { url: string | undefined; }; children: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) {
    return (
        <div {...props.attributes}>
            <div>
                <img src={props.element.url} alt="Slate Image" className='mx-auto' />
            </div>
            {props.children}
        </div>
    )
}