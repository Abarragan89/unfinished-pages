import Link from "next/link";
import { BlogContent, BlogDetails, NestedListChildren } from "../../../types/blog";
import Image from "next/image";

export default function BlogContentSection({ blogContent }: { blogContent: BlogContent[] }) {
    return (
        <section className="max-w-[700px] mx-auto leading-9 px-3">
            {/* loop through descendant  */}
            {blogContent.map((block: BlogContent, index: number) => {
                const validChildren = block.children.filter(
                    (blockDetails: BlogDetails) => blockDetails.text?.trim() !== ""
                );
                if (validChildren.length === 0 && block.type !== 'image' && block.type !== 'video') return;
                if (block.type === 'paragraph') {
                    return (
                        <p
                            key={index.toString()}
                            className="py-2"
                        >
                            {block.children.map((blockDetails: BlogDetails, subIndex: number) => {
                                if (blockDetails.type === 'link') {
                                    return (
                                        <Link
                                            href={blockDetails.url as string}
                                            key={index.toString() + subIndex.toString()}
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
                            <ol key={index.toString()} className="list-decimal ml-[50px] py-2">
                                {block.children.map((blogBlock: BlogDetails, subIndex: number) => (
                                    blogBlock?.children && blogBlock.children.map((listBlockDetails: NestedListChildren, subSubIndex: number) => {
                                        if (listBlockDetails.text === '' && listBlockDetails.type !== 'link') return;
                                        if (listBlockDetails.type === 'link') {
                                            return (
                                                <li key={index.toString() + subIndex.toString() + subSubIndex.toString()}>
                                                    <Link
                                                        href={listBlockDetails.url as string}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline text-[var(--brown-300)] hover:cursor-pointer hover:text-[var(--brown-100)]"
                                                    >
                                                        {listBlockDetails.children?.map((linkText) => linkText.text)}
                                                    </Link>
                                                </li>
                                            )
                                        } else {
                                            return (
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
                                            )
                                        }
                                    })
                                ))}
                            </ol>
                        ) : (
                            <ul key={index.toString()} className="list-disc ml-[50px] py-2">
                                {block.children.map((blogBlock: BlogDetails, subIndex: number) => (
                                    blogBlock?.children && blogBlock.children.map((listBlockDetails: NestedListChildren, subSubIndex: number) => {
                                        if (listBlockDetails.text === '' && listBlockDetails.type !== 'link') return;
                                        if (listBlockDetails.type === 'link') {
                                            return (
                                                <li key={index.toString() + subIndex.toString() + subSubIndex.toString()}>
                                                    <Link
                                                        href={listBlockDetails.url as string}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline text-[var(--brown-300)] hover:cursor-pointer hover:text-[var(--brown-100)]"
                                                    >
                                                        {listBlockDetails.children?.map((linkText) => linkText.text)}
                                                    </Link>
                                                </li>
                                            )
                                        } else {
                                            return (
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
                                            )
                                        }
                                    })
                                ))}
                            </ul>
                        )
                    );
                } else if (block.type === 'heading-one') {
                    return (
                        <h2
                            key={index.toString()}
                            className="text-[1.95rem] py-3 tracking-wide"
                        >
                            {block.children.map((blockDetails: BlogDetails, subIndex: number) => {
                                if (blockDetails.type === 'link') {
                                    return (
                                        <Link
                                            href={blockDetails.url as string}
                                            key={index.toString() + subIndex.toString()}
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
                        </h2>
                    )
                } else if (block.type === 'heading-two') {
                    return (
                        <h3
                            key={index.toString()}
                            className="text-[1.65rem] py-1 tracking-wide"
                        >
                            {block.children.map((blockDetails: BlogDetails, subIndex: number) => {
                                if (blockDetails.type === 'link') {
                                    return (
                                        <Link
                                            href={blockDetails.url as string}
                                            key={index.toString() + subIndex.toString()}
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
                        </h3>
                    )
                } else if (block.type === 'code') {
                    return (
                        <pre key={`code-${index}`} className="overflow-x-auto bg-slate-700 leading-normal p-2 text-[var(--off-white)] text-[14px]">
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
                } else if (block.type === 'video') {
                    if (block.videoUrl) {
                        return (
                            <div key={index.toString()} className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                                <iframe
                                    src={block.videoUrl}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                ></iframe>
                            </div>

                        )
                    }
                }
            })}
        </section>
    )
}
