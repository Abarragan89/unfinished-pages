"use client";
import React, { useCallback, useMemo, useState } from 'react'
import { Editor, Transforms, Element as SlateElement, createEditor, BaseEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'
import Link from 'next/link';

// Component Imports
import CodeBlock from '@/components/SlateRenderers/CodeBlock';
import DefaultBlock from '@/components/SlateRenderers/DefaultBlock';
import Leaf from '@/components/SlateRenderers/Leaf';
import NumberedList from '@/components/SlateRenderers/NumberedList';
import HeadingTwo from '@/components/SlateRenderers/HeadingTwo';
import HeadingOne from '@/components/SlateRenderers/HeadingOne';
import BulletedList from '@/components/SlateRenderers/BulletedList';
import AddImageModal from '@/components/Modals/AddImageModal';

// import Button Icons for ToolBar
import { FaItalic } from "react-icons/fa";
import { FaBold } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaListOl } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";




// Slate Typescript
type CustomElement =
    | { type: 'paragraph'; children: CustomText[] }
    | { type: 'code'; children: CustomText[] }
    | { type: 'numbered-list'; children: { type: 'list-item'; children: CustomText[] }[] }
    | { type: 'list-item'; children: CustomText[] }
    | { type: 'bulleted-list'; children: { type: 'list-item'; children: CustomText[] }[] };

type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

export default function CreateBlog() {
    const LIST_TYPES = ['numbered-list', 'bulleted-list']
    const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
    const [imageURL, setImageUrl] = useState<string>('');
    const [chosenTool, setChosenTool] = useState<string>('')

    const initialValue: Descendant[] = [
        {
            type: 'paragraph',
            children: [{ text: '' }],
        }
    ]

    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const renderElement = useCallback(props => {
        // Aligning was not working, but Decided that I don't need it anyways.
        // let align: string = '';
        // console.log(props.element?.children[0]?.center)
        // if (props.element.children[0].center) {
        //     align = 'center'
        // }
        // if (props.element.children[0].left) {
        //     align = 'left'
        // }
        // if (props.element.children[0].right) {
        //     align = 'right'
        // }
        switch (props.element.type) {
            case 'code':
                return <CodeBlock {...props} />
            case 'numbered-list':
                return <NumberedList {...props} />
            case 'bulleted-list':
                return <BulletedList {...props} />
            case 'list-item':
                return <li {...props.attributes}>{props.children}</li>;
            case 'heading-one':
                return <HeadingOne {...props} />
            case 'heading-two':
                return <HeadingTwo {...props} />
            case 'image':
                return <Image {...props} />
            default:
                return <DefaultBlock {...props} />
        }
    }, []);

    const insertImage = (editor: ReactEditor, url: string) => {
        const image: CustomElement = {
            type: 'image',
            url,
            children: [{ text: '' }], // Images need at least one child to render correctly
        }
        Transforms.insertNodes(editor, image);

        Transforms.insertNodes(editor, {
            type: 'paragraph',
            children: [{ text: '' }],
        })
    }

    // Component to render image elements
    const Image = ({ attributes, children, element }: any) => {
        return (
            <div {...attributes}>
                <div>
                    <img src={(element as CustomElement).url} alt="Slate Image" className='mx-auto' />
                </div>
                {children}
            </div>
        )
    }

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    const toggleBlock = (editor, format: string) => {
        const isActive = isBlockActive(
            editor,
            format,
            TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
        )
        const isList = LIST_TYPES.includes(format)

        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                LIST_TYPES.includes(n.type) &&
                !TEXT_ALIGN_TYPES.includes(format),
            split: true,
        })
        let newProperties: Partial<SlateElement>
        if (TEXT_ALIGN_TYPES.includes(format)) {
            newProperties = {
                align: isActive ? undefined : format,
            }
        } else {
            newProperties = {
                type: isActive ? 'paragraph' : isList ? 'list-item' : format,
            }
        }
        Transforms.setNodes<SlateElement>(editor, newProperties)

        if (!isActive && isList) {
            const block = { type: format, children: [] }
            Transforms.wrapNodes(editor, block)
        }
    }

    const toggleMark = (editor, format) => {
        const isActive = isMarkActive(editor, format)
        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
    }

    const isBlockActive = (editor, format, blockType = 'type') => {
        const { selection } = editor
        if (!selection) return false
        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n[blockType] === format,
            })
        )
        return !!match
    }

    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    }

    const ToolBarButtonStyles = 'w-full py-[1px] px-1'

    return (
        <main className='pt-10'>
            <AddImageModal
                onClickHandler={() => insertImage(editor, imageURL)}
                setImageUrl={setImageUrl}
                editor={editor}
            />
            <section className='w-[80%] mx-auto max-w-[800px]'>
                <Slate
                    editor={editor} initialValue={initialValue}>
                    <div className='flex bg-[var(--gray-100)] rounded-t p-[5px] border border-[var(--gray-600)]'>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'bold' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, 'bold') }}>
                            <FaBold className='mx-auto' />
                        </button>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'italic' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, 'italic') }}>
                            <FaItalic className='mx-auto' />
                        </button>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'underline' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, 'underline') }}>
                            <FaUnderline className='mx-auto' />
                        </button>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'heading-one' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'heading-one') }}>
                            H1
                        </button>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'heading-two' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'heading-two') }}>H2</button>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'numbered-list' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'numbered-list') }}>
                            <FaListOl className='mx-auto' />
                        </button>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'bulleted-list' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'bulleted-list') }}>
                            <FaList className='mx-auto' />
                        </button>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'code' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'code') }}>
                            <div className='flex justify-center'>
                                <p>&lt;</p>
                                <p>&gt;</p>
                            </div>
                        </button>
                        <Link href={"/createBlog/?showModal=addImage"}>
                            <button
                                className={`${ToolBarButtonStyles} ${chosenTool === 'code' ? 'bg-[var(--paper-color)]' : ''}`}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    // insertImage(editor, url)
                                }}>
                                <CiImageOn className='mx-auto' />
                            </button>
                        </Link>
                        <button
                            className={`${ToolBarButtonStyles} ${chosenTool === 'code' ? 'bg-[var(--paper-color)]' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'code') }}>
                            Save
                        </button>
                    </div>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        spellCheck
                        autoFocus
                        className='h-[50vh] border border-[var(--gray-600)] border-t-0 p-[15px] rounded-b focus:outline-none overflow-y-scroll overflow-x-hidden'
                    />
                </Slate>
            </section>
        </main >
    )
}


// To Do:
// 1. Upload Images
    // pressing enter makes another image
// 2. Add hot keys to edit
// 3. Disable Tab in Editor
// 4. finalize Styles
// 5. Add Title input
// 6. Add description Input
// 7. Add keywords (meta tags and searchable)
// 8. Save Data
// 9. Render data on Draft mode
// 10. Render data on Blog page
// 11. Show user their own blogs
// 12 make blogs editable
// 13. TEST
// 14 Make 20 blogs
// 15. Google Ads