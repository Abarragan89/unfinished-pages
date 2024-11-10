"use client";
import React, { useCallback, useMemo, useState } from 'react'
import { Editor, Transforms, Element as SlateElement, Descendant, createEditor, BaseEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor, useSlate } from 'slate-react'
import { withHistory } from 'slate-history'
import Link from 'next/link';
import axios
 from 'axios';
// Component Imports
import CodeBlock from '@/components/SlateRenderers/CodeBlock';
import DefaultBlock from '@/components/SlateRenderers/DefaultBlock';
import Leaf from '@/components/SlateRenderers/Leaf';
import NumberedList from '@/components/SlateRenderers/NumberedList';
import HeadingTwo from '@/components/SlateRenderers/HeadingTwo';
import HeadingOne from '@/components/SlateRenderers/HeadingOne';
import BulletedList from '@/components/SlateRenderers/BulletedList';
import AddImageModal from '@/components/Modals/AddImageModal';
import ImageRender from './SlateRenderers/ImageRender';
// import Button Icons for ToolBar

import { CiImageOn } from "react-icons/ci";
import { BiBold } from "react-icons/bi";
import { RiItalic } from "react-icons/ri";
import { ImUnderline } from "react-icons/im";
import { RiH1 } from "react-icons/ri";
import { RiH2 } from "react-icons/ri";
import { PiListNumbersLight } from "react-icons/pi";
import { RxListBullet } from "react-icons/rx";
import { IoMdCode } from "react-icons/io";


// Slate Typescript
type CustomElement =
    | { type: 'paragraph'; children: CustomText[] }
    | { type: 'image'; children: CustomText[]; url: string }
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

export default function SlateRichText() {
    const LIST_TYPES = ['numbered-list', 'bulleted-list']
    const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
    const [imageURL, setImageUrl] = useState<string>('');
    const [imageAlt, setImageAlt] = useState<string>('');
    const [chosenElement, setChosenElement] = useState<string>('')

    // Create the editor
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);


    // const initialValue = useMemo(
    //     () =>
    //         JSON.parse(localStorage.getItem('content') as string) || [
    //             {
    //                 type: 'paragraph',
    //                 children: [{ text: 'A line of text in a paragraph.' }],
    //             },
    //         ],
    //     []
    // )

    const initialValue: Descendant[] = [
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ]

    const [content, setContent] = useState<Descendant[]>(initialValue); // initialValue is the starting content structure

    // @ts-expect-error: Slate Rich Text Error
    const renderElement = useCallback(props => {
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
                return <ImageRender {...props} />
            default:
                return <DefaultBlock {...props} />
        }
    }, []);

    function withImages(editor: ReactEditor) {
        const { isVoid, insertBreak } = editor;
        // Define images as void elements
        editor.isVoid = element => element.type === 'image' || isVoid(element);

        // Custom behavior for the Enter key after an image
        editor.insertBreak = () => {
            const { selection } = editor;

            if (selection) {
                const [parentNode] = Editor.parent(editor, selection);
                // @ts-expect-error: Slate Rich Text Error
                if (parentNode.type === 'image') {
                    // If the current block is an image, insert a paragraph block below it
                    Transforms.insertNodes(editor, {
                        type: 'paragraph',
                        children: [{ text: '' }],
                    });
                    return;
                }
            }
            // Default break behavior
            insertBreak();
        };

        return editor;
    };

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
    // @ts-expect-error: Slate Rich Text Error
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])
    // @ts-expect-error: Slate Rich Text Error
    const toggleBlock = (editor, format: string) => {
        // set status to change UI change in ToolBar
        if (format === chosenElement) {
            setChosenElement('')
        } else {
            setChosenElement(format)
        }
        // check if it is already active in this format
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
                // @ts-expect-error: Slate Rich Text Error
                align: isActive ? undefined : format,
            }
        } else {
            newProperties = {
                // @ts-expect-error: Slate Rich Text Error
                type: isActive ? 'paragraph' : isList ? 'list-item' : format,
            }
        }
        Transforms.setNodes<SlateElement>(editor, newProperties)

        if (!isActive && isList) {
            const block = { type: format, children: [] }
            // @ts-expect-error: Slate Rich Text Error
            Transforms.wrapNodes(editor, block)
        }
    }
    // @ts-expect-error: Slate Rich Text Error
    const toggleMark = (editor, format) => {
        // check if it is already active in this format
        const isActive = isMarkActive(editor, format)
        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
    }

    // @ts-expect-error: Slate Rich Text Error
    const isBlockActive = (editor, format, blockType = 'type') => {
        const { selection } = editor
        if (!selection) return false
        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    // @ts-expect-error: Slate Rich Text Error
                    n[blockType] === format,
            })
        )
        return !!match
    }
    // @ts-expect-error: Slate Rich Text Error
    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor)
        // @ts-expect-error: Slate Rich Text Error
        return marks ? marks[format] === true : false
    }

    const toolBarButtonStyles = 'p-1 h-[30px] mx-1 opacity-[.4] hover:opacity-[1]'
    const toolBarItemChosen: React.CSSProperties = {
        boxShadow: "0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08)",
        borderRadius: "4px",
        opacity: 1
    };

    function IconEl({ iconType }: { iconType: string }) {
        switch (iconType) {
            case 'bold':
                return <BiBold size={19} />
            case 'italic':
                return <RiItalic size={18} />
            case 'underline':
                return <ImUnderline size={15} />
            case 'heading-one':
                return <RiH1 size={18} />
            case 'heading-two':
                return <RiH2 size={18} />
            case 'numbered-list':
                return <PiListNumbersLight size={22} />
            case 'bulleted-list':
                return <RxListBullet size={22} />
            case 'code':
                return <IoMdCode />

            default:
                return
        }
    }

    function MarkButton({ iconType }: { iconType: string }) {
        // need to useSlate so icons render correctly when clicking on text already formatted bold, etc.
        const editor = useSlate();
        return (
            <button
                className={`${toolBarButtonStyles}`}
                style={isMarkActive(editor, iconType) ? toolBarItemChosen : undefined}
                onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, iconType) }}>
                <IconEl iconType={iconType} />
            </button>
        )
    }
    function BlockButton({ iconType }: { iconType: string }) {
        // need to useSlate so icons render correctly when clicking on text already formatted bold, etc.
        const editor = useSlate();
        return (
            <button
                className={`${toolBarButtonStyles}`}
                style={isBlockActive(editor, iconType) ? toolBarItemChosen : undefined}
                onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, iconType) }}>
                <IconEl iconType={iconType} />
            </button>
        )
    }


    const handleChange = (newValue: Descendant[]) => {
        setContent(newValue); // Save content to state on every change
    };

    const saveContent = async () => {

        console.log('content', content)
        axios({
            method: 'post',
            url: '/api/blogRoutes',
            data: content
        });


        // try {
        //     const response = await fetch('/api/save-content', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(content), // Save JSON representation to the backend
        //     });

        //     if (!response.ok) {
        //         throw new Error('Failed to save content');
        //     }
        //     alert('Content saved successfully!');
        // } catch (error) {
        //     console.error(error);
        //     alert('Error saving content');
        // }
    };



    return (
        <section className='mt-5'>
            <AddImageModal
                onClickHandler={() => insertImage(editor, imageURL)}
                setImageUrl={setImageUrl}
                setImageAlt={setImageAlt}
            />
            <section className='w-[80%] mx-auto max-w-[800px]'>
                <Slate
                    editor={editor} initialValue={content}
                    onChange={handleChange}
                >
                    <menu className='flex justify-between bg-[var(--gray-100)] rounded-t border border-[var(--gray-600)] px-5 py-[10px]'>
                        <div className='flex max-w-[350px] items-center'>
                            <MarkButton iconType="bold" />
                            <MarkButton iconType="italic" />
                            <MarkButton iconType="underline" />
                            <BlockButton iconType="heading-one" />
                            <BlockButton iconType="heading-two" />
                            <BlockButton iconType="numbered-list" />
                            <BlockButton iconType="bulleted-list" />
                            <BlockButton iconType="code" />
                            <Link href={"/createBlog/?showModal=addImage"}
                                className={`${toolBarButtonStyles}`}>
                                <CiImageOn size={20} className='mx-auto' />
                            </Link>
                        </div>
                        <button
                            className='custom-small-btn'
                            onClick={saveContent}
                        >
                            Save
                        </button>
                    </menu>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        spellCheck
                        autoFocus
                        className='h-[50vh] border border-[var(--gray-600)] border-t-0 p-[15px] rounded-b focus:outline-none overflow-y-scroll overflow-x-hidden break-normal'
                        onKeyDown={(event) => {
                            if (event.metaKey || event.ctrlKey) {
                                switch (event.key.toLowerCase()) {
                                    case 'b':
                                        event.preventDefault();
                                        toggleMark(editor, 'bold');
                                        break;
                                    case 'i':
                                        event.preventDefault();
                                        toggleMark(editor, 'italic');
                                        break;
                                    case 'u':
                                        event.preventDefault();
                                        toggleMark(editor, 'underline');
                                        break;
                                    default:
                                        break;
                                }
                            }
                            if (event.key === 'Tab') {
                                event.preventDefault();
                                Transforms.insertText(editor, '    ');
                            }
                        }}
                    />
                </Slate>
            </section>
        </section >
    )
}

// To Do:
// show which tool is chosen (everything except)
// 5. Add Title input
// 6. Add description Input
// 6. add tags or categoies it belongs to
// 7. Add keywords (meta tags and searchable)
// 8. Save Data
// 9. Render data on Draft mode
// 10. Render data on Blog page
// 11. Show user their own blogs
// 12 make blogs editable
// 13. TEST
// 14 Make 20 blogs
// 15. Google Ads