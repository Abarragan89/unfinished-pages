"use client";
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { Editor, Transforms, Element as SlateElement, Descendant, createEditor, BaseEditor, Range } from 'slate'
import { Slate, Editable, withReact, ReactEditor, useSlate } from 'slate-react'
import { withHistory } from 'slate-history'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import formatContentToDescendantType from '../../../utils/formatBlogContent';
import SideMenu from '../Menus/SideMenu';
import { capitalizeFirstLetter } from '../../../utils/stringManipulation';

// Component Imports
import CodeBlock from '@/components/SlateRenderers/CodeBlock';
import DefaultBlock from '@/components/SlateRenderers/DefaultBlock';
import Leaf from '@/components/SlateRenderers/Leaf';
import NumberedList from '@/components/SlateRenderers/NumberedList';
import HeadingTwo from '@/components/SlateRenderers/HeadingTwo';
import HeadingOne from '@/components/SlateRenderers/HeadingOne';
import BulletedList from '@/components/SlateRenderers/BulletedList';
import ImageRender from '../SlateRenderers/ImageRender';
import InputBlockWrapper from './InputBlockWrapper';
import VideoElement from '../SlateRenderers/VideoElement';


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
import { IoMdLink } from "react-icons/io";
import { UserImage } from '../../../types/users';
import InsertSlateLink from '../Modals/InsertSlateLink';
import { RxVideo } from "react-icons/rx";


// Slate Typescript
type CustomElement =
    | { type: 'paragraph'; children: CustomText[] }
    | { type: 'image'; children: CustomText[]; image: UserImage }
    | { type: 'code'; children: CustomText[] }
    | { type: 'numbered-list'; children: { type: 'list-item'; children: CustomText[] }[] }
    | { type: 'list-item'; children: CustomText[] }
    | { type: 'heading-one'; children: CustomText[] }
    | { type: 'heading-two'; children: CustomText[] }
    | { type: 'bulleted-list'; children: { type: 'list-item'; children: CustomText[] }[] }
    | { type: 'video'; videoUrl: string; children: CustomText[] }
    | { type: 'link'; url: string; children: CustomText[] };

type CustomText = { text: string, bold?: boolean, underline?: boolean, italic?: boolean }


declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

interface Props {
    blogId: string,
    blogContent: []
}

export default function SlateRichText({ blogId, blogContent }: Props) {

    const router = useRouter();
    const pathname = usePathname();
    const LIST_TYPES = ['numbered-list', 'bulleted-list', 'link']
    const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
    const [chosenElement, setChosenElement] = useState<string>('');
    const [isButtonAbled, setIsButtonAbled] = useState<boolean>(false)
    const [isContentSaving, setIsContentSaving] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    // Variables to handle and track autosaving feature
    const AutoSaveInterval = useRef<number | NodeJS.Timeout | null>(null);
    const contentRef = useRef<Descendant[]>([]); // Ref to hold the latest content
    const pendingChangesRef = useRef(false); // Ref to track changes during save

    // Create the editor
    const editor = useMemo(() => withInlines(withImages(withHistory(withReact(createEditor())))), []);

    // Initial node if no content
    const initialValue: Descendant[] = [
        {
            type: "paragraph",
            children: [
                {
                    text: ""
                },
            ]
        }
    ];
    // Set the content to initial node or data from query
    // const [content, setContent] = useState<Descendant[]>(blogContent.length ? formatContentToDescendantType(blogContent) : initialValue);
    const [content, setContent] = useState<Descendant[]>(blogContent ? formatContentToDescendantType(blogContent) : initialValue);


    const getPlainText = (editor: Editor) => {
        return Editor.string(editor, []);
    };

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
                return <li className='py-1' {...props.attributes}>{props.children}</li>;
            case 'heading-one':
                return <HeadingOne {...props} />
            case 'heading-two':
                return <HeadingTwo {...props} />
            case 'image':
                return <ImageRender {...props} />
            case 'link': // Add rendering logic for links
                return (
                    <a className='underline text-[var(--brown-500)] inline' {...props.attributes} href={props.element.url}>
                        {props.children}
                    </a>
                );
            case 'video':
                return <VideoElement {...props} />;
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


    function isLinkActive(editor: ReactEditor) {
        // @ts-expect-error: Slate Rich Text Error
        const [link] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        })
        return !!link
    }

    function unwrapLink(editor: ReactEditor) {
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        })
    }

    function wrapLink(editor: ReactEditor, url: string) {
        if (isLinkActive(editor)) {
            unwrapLink(editor)
        }
        const { selection } = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const link: CustomElement = {
            type: 'link',
            url,
            children: isCollapsed ? [{ text: url }] : [{ text: '' }],
        }

        if (isCollapsed) {
            Transforms.insertNodes(editor, link)
        } else {
            Transforms.wrapNodes(editor, link, { split: true })
            Transforms.collapse(editor, { edge: 'end' })
        }
    }


    function withInlines(editor: ReactEditor) {
        const { isInline, insertText, normalizeNode } = editor

        // this normalization will remove the link element once it is erased
        editor.normalizeNode = ([node, path]) => {
            // @ts-expect-error: Slate Rich Text Error
            if (node.type === 'link' && (!node.children || node.children.length === 0 || node.children[0].text === '')) {
                // Remove the link if it has no text
                Transforms.removeNodes(editor, { at: path });
                return;
            }

            // Run the original normalize function
            normalizeNode([node, path]);
        };

        editor.isInline = element =>
            ['link'].includes(element.type) || isInline(element)

        // check for valid URL string
        const regex = /^https:\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/;

        editor.insertText = text => {
            if (text && regex.test(text)) {
                wrapLink(editor, text)
            } else {
                insertText(text)
            }
        }
        editor.insertData = data => {
            const text = data.getData('text/plain')
            if (text && regex.test(text)) {
                wrapLink(editor, text)
            } else {
                insertText(text)
            }
        }
        return editor
    }

    function insertLink(editor: ReactEditor, url: string) {
        if (editor.selection) {
            wrapLink(editor, url)
        }
    }

    const insertVideo = (editor: ReactEditor, videoUrl: string) => {
        const video: CustomElement = {
            type: 'video',
            videoUrl,
            children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, video);
        Transforms.insertNodes(editor, {
            type: 'paragraph',
            children: [{ text: '' }],
        })
    };

    const insertImage = (image: UserImage) => {
        const imageEl: CustomElement = {
            type: 'image',
            image,
            children: [{ text: '' }], // Images need at least one child to render correctly
        }
        Transforms.insertNodes(editor, imageEl);
        Transforms.insertNodes(editor, {
            type: 'paragraph',
            children: [{ text: '' }],
        })
    }

    // @ts-expect-error: Slate Rich Text Error
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    const toggleBlock = (editor: ReactEditor, format: string) => {
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

    const toolBarButtonStyles = 'p-1 h-[30px] mx-1 opacity-[.6] hover:opacity-[1]'
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
            case 'link':
                return <IoMdLink size={22} />
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
                title={capitalizeFirstLetter(iconType)}
                style={isMarkActive(editor, iconType) ? toolBarItemChosen : undefined}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleMark(editor, iconType)
                }}>
                <IconEl iconType={iconType} />
            </button>
        )
    }

    function addLinkHandler(url: string, isVideo: boolean) {
        if (isVideo) {
            insertVideo(editor, url)
        } else {
            insertLink(editor, url);
        }
    }


    function BlockButton({ iconType }: { iconType: string }) {
        // need to useSlate so icons render correctly when clicking on text already formatted bold, etc.
        const editor = useSlate();
        return (
            <button
                className={`${toolBarButtonStyles}`}
                title={capitalizeFirstLetter(iconType)}
                style={isBlockActive(editor, iconType) ? toolBarItemChosen : undefined}
                onMouseDown={(e) => {
                    if (iconType === 'link' && !isLinkActive(editor)) {
                        router.push(`${pathname}?showModal=addLink`, { scroll: false})
                    } else {
                        e.preventDefault();
                        toggleBlock(editor, iconType)
                    }
                }}>
                <IconEl iconType={iconType} />
            </button>
        )
    }

    const handleChange = (newValue: Descendant[]) => {
        setIsButtonAbled(true);
        setContent(newValue);
        contentRef.current = newValue;

        if (isContentSaving) {
            pendingChangesRef.current = true;// Mark changes as pending if save is in progress
        } else {
            setIsButtonAbled(true); // Enable the button if no save is in progress
        }

        if (AutoSaveInterval.current) {
            clearTimeout(AutoSaveInterval.current); // Clear the existing timeout
        }
        AutoSaveInterval.current = setTimeout(() => {
            if (!isContentSaving) {
                saveContent(); // Only save if not already saving
            }
        }, 5500);
    };

    const saveContent = async () => {
        if (isContentSaving) return;
        setIsContentSaving(true);
        if (AutoSaveInterval.current) {
            clearTimeout(AutoSaveInterval.current); // Clear the timeout before saving
        }
        const wordCount = getPlainText(editor).split(" ").length;
        const wordsPerMinute = 250;
        const readLength = Math.floor(wordCount / wordsPerMinute); // Round up for partial minutes
        const readDuration = readLength === 0 ? 1 : readLength

        try {
            setErrorMessage('')
            await axios.put(`/api/authorRoutes/blog/${blogId}/blogContent`, {
                // need to use ref to get the most updated when saveContent is called in a Timeout for Auto Save
                content: contentRef.current,
                readDuration,
            });
            // After save, check if there were pending changes
            if (pendingChangesRef.current) {
                pendingChangesRef.current = false; // Clear pending changes
                setIsButtonAbled(true); // Keep button enabled for unsaved changes
            } else {
                setIsButtonAbled(false); // Disable button if no pending changes
            }
        } catch (error) {
            console.error("Error saving content:", error);
            setErrorMessage('Blog not updated. Please try again.')
        } finally {
            setIsContentSaving(false); // Ensure this always runs
        }
    };
    // clean up use effect
    useEffect(() => {
        return () => {
            // Cleanup timeout when the component unmounts
            if (AutoSaveInterval.current) {
                clearTimeout(AutoSaveInterval.current);
            }
        };
    }, []);

    return (
        <>
            <SideMenu
                onClickHandler={insertImage}
            />
            <InsertSlateLink
                addLinkHandler={addLinkHandler}
            />

            <InputBlockWrapper
                subtitle='Blog Content'
                saveHandler={saveContent}
                isButtonAble={isButtonAbled}
                UIStateTrigger={isContentSaving}
                errorMsg={errorMessage}
            >
                <section className='w-full mx-auto'>
                    <Slate
                        editor={editor} initialValue={content}
                        onChange={handleChange}
                    >
                        <menu className='flex  justify-between bg-[var(--gray-100)] rounded-t pb-[10px] pt-[15px]'>
                            <div className='flex flex-wrap max-w-[400px] items-center'>
                                <MarkButton iconType="bold" />
                                <MarkButton iconType="italic" />
                                <MarkButton iconType="underline" />
                                <BlockButton iconType="heading-one" />
                                <BlockButton iconType="heading-two" />
                                <BlockButton iconType="numbered-list" />
                                <BlockButton iconType="bulleted-list" />
                                <BlockButton iconType="code" />
                                <BlockButton iconType="link" />
                                <Link href={`${pathname}?sideMenu=addImage`}
                                    title='Image'
                                    scroll={false}
                                    className={`${toolBarButtonStyles}`}>
                                    <CiImageOn size={20} className='mx-auto' />
                                </Link>
                                <Link href={`${pathname}?showModal=addLink&isVideo=true`}
                                    scroll={false}
                                    title='Video'
                                    className={`${toolBarButtonStyles}`}>
                                    <RxVideo size={20} className='mx-auto' />
                                </Link>
                            </div>
                        </menu>
                        <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            spellCheck
                            className='h-[60vh] border-2 border-[var(--gray-300)] p-[15px] rounded-md input-browser-reset focus:outline-[var(--brown-500)] custom-thin-scrollbar overflow-y-auto overflow-x-hidden break-normal bg-[var(--white)]'
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
                                // Handle saving text editor with cmd + s or ctrl + s
                                if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
                                    event.preventDefault(); // Prevent the browser's default save action
                                    saveContent(); // Call your save function
                                }
                            }}
                            // Allow backspace on phone to work
                            onDOMBeforeInput={(event) => {
                                if (event.inputType === 'deleteContentBackward') {
                                    event.preventDefault();
                                    // Check if there is a selection
                                    const { selection } = editor;
                                    if (selection && Range.isCollapsed(selection)) {
                                        // No selection, delete backward by one character
                                        editor.deleteBackward('character');
                                    } else {
                                        // There's a selection, delete it
                                        Transforms.delete(editor);
                                    }
                                }
                            }}
                        />
                    </Slate>
                </section>
            </InputBlockWrapper>
        </>
    )
}