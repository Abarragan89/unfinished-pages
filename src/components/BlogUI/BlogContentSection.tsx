import Link from "next/link";
import { BlogContent, BlogDetails, NestedListChildren } from "../../../types/blog";
import Image from "next/image";

export default function BlogContentSection({ blogContent }: { blogContent: BlogContent[] }) {
    return (
        <div className="max-w-[700px] mx-auto leading-9 px-3">
            {/* loop through descendant  */}
            {blogContent.map((block: BlogContent, index: number) => {
                const validChildren = block.children.filter(
                    (blockDetails: BlogDetails) => blockDetails.text?.trim() !== ""
                );
                if (validChildren.length === 0 && block.type !== 'image') return;

                if (block.type === 'paragraph') {
                    return (
                        <p
                            key={index.toString()}
                            className="py-3"
                        >
                            {block.children.map((blockDetails: BlogDetails, subIndex: number) => {
                                console.log('block details', blockDetails)
                                if (blockDetails.type === 'link') {
                                    return (
                                        <Link
                                            href={blockDetails.url as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-[var(--brown-300)] hover:cursor-pointer hover:text-[var(--brown-100)]"
                                        >
                                            {blockDetails.children?.map((linkText) => linkText.text)}
                                        </Link>
                                    )
                                } else {
                                    return (
                                        <span
                                            key={index.toString() + subIndex.toString()}
                                            className={`
                                        ${blockDetails.bold ? 'font-bold' : ''}
                                        ${blockDetails.italic ? 'italic' : ''}
                                        ${blockDetails.underline ? 'underline' : ''}
                                    `}
                                        >
                                            {blockDetails.text}
                                        </span>
                                    )
                                }
                            })}
                        </p>
                    );
                } else if (block.type.includes('list')) {
                    return (
                        block.type === 'numbered-list' ? (
                            <ol key={index.toString()} className="list-decimal ml-[50px] py-3">
                                {block.children.map((blogBlock: BlogDetails, subIndex: number) => (
                                    blogBlock?.children && blogBlock.children.map((listBlockDetails: NestedListChildren, subSubIndex: number) => (
                                        <li
                                            key={index.toString() + subIndex.toString() + subSubIndex.toString()}
                                            className={`
                                                    ${listBlockDetails.bold ? 'font-bold' : ''}
                                                    ${listBlockDetails.italic ? 'italic' : ''}
                                                    ${listBlockDetails.underline ? 'underline' : ''}
                                                `}
                                        >
                                            {listBlockDetails.text}
                                        </li>
                                    ))
                                ))}
                            </ol>
                        ) : (
                            <ul key={index.toString()} className="list-disc ml-[50px] py-3">
                                {block.children.map((blogBlock: BlogDetails, subIndex: number) => (
                                    blogBlock?.children && blogBlock.children.map((listBlockDetails: NestedListChildren, subSubIndex: number) => (
                                        <li
                                            key={index.toString() + subIndex.toString() + subSubIndex.toString()}
                                            className={`
                                                    ${listBlockDetails.bold ? 'font-bold' : ''}
                                                    ${listBlockDetails.italic ? 'italic' : ''}
                                                    ${listBlockDetails.underline ? 'underline' : ''}
                                                `}
                                        >
                                            {listBlockDetails.text}
                                        </li>
                                    ))
                                ))}
                            </ul>
                        )
                    );
                } else if (block.type === 'heading-one') {
                    return (
                        block.children.map((blockDetails: BlogDetails, subIndex: number) => {
                            if (!blockDetails.text) return;
                            return (
                                <h2
                                    key={index.toString() + subIndex.toString()}
                                    className={` text-[1.95rem] py-1 tracking-wide
                                            ${blockDetails.bold ? 'font-bold' : ''}
                                            ${blockDetails.italic ? 'italic' : ''}
                                            ${blockDetails.underline ? 'underline' : ''}
                                        `}
                                >
                                    {blockDetails.text}
                                </h2>
                            )
                        })
                    )
                } else if (block.type === 'heading-two') {
                    return (
                        block.children.map((blockDetails: BlogDetails, subIndex: number) => {
                            if (!blockDetails.text) return;
                            return (
                                <h3
                                    key={index.toString() + subIndex.toString()}
                                    className={`text-[1.65rem] py-1 tracking-wide
                                            ${blockDetails.bold ? 'font-bold' : ''}
                                            ${blockDetails.italic ? 'italic' : ''}
                                            ${blockDetails.underline ? 'underline' : ''}
                                        `}
                                >
                                    {blockDetails.text}
                                </h3>
                            )
                        })
                    )
                } else if (block.type === 'code') {
                    return (
                        <pre key={`code-${index}`} className="overflow-x-auto bg-slate-700 leading-normal p-3 text-[var(--off-white)] text-[14px]">
                            <code>
                                {block.children.map((blockDetails: BlogDetails) => blockDetails.text).join('\n')}
                            </code>
                        </pre>
                    )
                }
                else if (block.type === 'image') {
                    if (block.image) {
                        return (
                            <div key={index.toString()}>
                                <Image
                                    src={block.image.url as string}
                                    width={block.image.width}
                                    height={block.image.height}
                                    alt={block.image.alt}
                                    className="w-full"
                                />
                            </div>
                        )
                    }
                }
                // else if (block.type === 'link') {
                //     return (
                //         <a
                //             key={index.toString()}
                //             className="py-3"
                //             href={block.url}
                //         >
                //             {block.children.map((blockDetails: BlogDetails, subIndex: number) => (
                //                 <span
                //                     key={index.toString() + subIndex.toString()}
                //                     className='text-[var(--brown-300)] underline'
                //                 >
                //                     {blockDetails.text}
                //                 </span>
                //             ))}
                //         </a>
                //     )
                // }
            })}
        </div>
    )
}
