// "use client";
// import React, { useCallback, useMemo, useState } from 'react'
// import { Editor, Transforms, Element as SlateElement, createEditor, BaseEditor, Descendant } from 'slate'
// import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
// import { withHistory } from 'slate-history'
// import Link from 'next/link';

// // Component Imports
// import CodeBlock from '@/components/SlateRenderers/CodeBlock';
// import DefaultBlock from '@/components/SlateRenderers/DefaultBlock';
// import Leaf from '@/components/SlateRenderers/Leaf';
// import NumberedList from '@/components/SlateRenderers/NumberedList';
// import HeadingTwo from '@/components/SlateRenderers/HeadingTwo';
// import HeadingOne from '@/components/SlateRenderers/HeadingOne';
// import BulletedList from '@/components/SlateRenderers/BulletedList';
// import AddImageModal from '@/components/Modals/AddImageModal';
// import Image from '@/components/SlateRenderers/Image';

// // import Button Icons for ToolBar
// import { FaItalic } from "react-icons/fa";
// import { FaBold } from "react-icons/fa";
// import { FaUnderline } from "react-icons/fa";
// import { FaList } from "react-icons/fa";
// import { FaListOl } from "react-icons/fa6";
// import { CiImageOn } from "react-icons/ci";

// // Slate Typescript
// type CustomElement =
//     | { type: 'paragraph'; children: CustomText[] }
//     | { type: 'image'; children: CustomText[]; url: string }
//     | { type: 'code'; children: CustomText[] }
//     | { type: 'numbered-list'; children: { type: 'list-item'; children: CustomText[] }[] }
//     | { type: 'list-item'; children: CustomText[] }
//     | { type: 'bulleted-list'; children: { type: 'list-item'; children: CustomText[] }[] };

// type CustomText = { text: string }

// declare module 'slate' {
//     interface CustomTypes {
//         Editor: BaseEditor & ReactEditor
//         Element: CustomElement
//         Text: CustomText
//     }
// }

// type MarkState = {
//     bold: boolean;
//     italic: boolean;
//     underline: boolean;
// };
// type ElementState = {
//     bold: boolean;
//     italic: boolean;
//     underline: boolean;
// };

// export default function CreateBlog() {
//     const LIST_TYPES = ['numbered-list', 'bulleted-list']
//     const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
//     const [imageURL, setImageUrl] = useState<string>('');
//     const [imageAlt, setImageAlt] = useState<string>('');
//     const [chosenElement, setChosenElement] = useState<string>('')
//     const [chosenMarks, setChosenMarks] = useState<MarkState>({
//         bold: false,
//         italic: false,
//         underline: false
//     })

//     const initialValue = useMemo(
//         () =>
//             JSON.parse(localStorage.getItem('content') as string) || [
//                 {
//                     type: 'paragraph',
//                     children: [{ text: 'A line of text in a paragraph.' }],
//                 },
//             ],
//         []
//     )

//     // Create the editor
//     const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);

//     // @ts-expect-error: Slate Rich Text Error
//     const renderElement = useCallback(props => {
//         switch (props.element.type) {
//             case 'code':
//                 return <CodeBlock {...props} />
//             case 'numbered-list':
//                 return <NumberedList {...props} />
//             case 'bulleted-list':
//                 return <BulletedList {...props} />
//             case 'list-item':
//                 return <li {...props.attributes}>{props.children}</li>;
//             case 'heading-one':
//                 return <HeadingOne {...props} />
//             case 'heading-two':
//                 return <HeadingTwo {...props} />
//             case 'image':
//                 return <Image {...props} />
//             default:
//                 return <DefaultBlock {...props} />
//         }
//     }, []);

//     function withImages(editor: ReactEditor) {
//         const { isVoid, insertBreak } = editor;

//         // Define images as void elements
//         editor.isVoid = element => element.type === 'image' || isVoid(element);

//         // Custom behavior for the Enter key after an image
//         editor.insertBreak = () => {
//             const { selection } = editor;

//             if (selection) {
//                 const [parentNode] = Editor.parent(editor, selection);
//                 // @ts-expect-error: Slate Rich Text Error
//                 if (parentNode.type === 'image') {
//                     // If the current block is an image, insert a paragraph block below it
//                     Transforms.insertNodes(editor, {
//                         type: 'paragraph',
//                         children: [{ text: '' }],
//                     });
//                     return;
//                 }
//             }

//             // Default break behavior
//             insertBreak();
//         };

//         return editor;
//     };

//     const insertImage = (editor: ReactEditor, url: string) => {
//         const image: CustomElement = {
//             type: 'image',
//             url,
//             children: [{ text: '' }], // Images need at least one child to render correctly
//         }
//         Transforms.insertNodes(editor, image);

//         Transforms.insertNodes(editor, {
//             type: 'paragraph',
//             children: [{ text: '' }],
//         })
//     }
//     // @ts-expect-error: Slate Rich Text Error
//     const renderLeaf = useCallback(props => {
//         return <Leaf {...props} />
//     }, [])
//     // @ts-expect-error: Slate Rich Text Error
//     const toggleBlock = (editor, format: string) => {
//         // set status to change UI change in ToolBar
//         format === chosenElement ? setChosenElement('') : setChosenElement(format)
//         // check if it is already active in this format
//         const isActive = isBlockActive(
//             editor,
//             format,
//             TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
//         )
//         const isList = LIST_TYPES.includes(format)

//         Transforms.unwrapNodes(editor, {
//             match: n =>
//                 !Editor.isEditor(n) &&
//                 SlateElement.isElement(n) &&
//                 LIST_TYPES.includes(n.type) &&
//                 !TEXT_ALIGN_TYPES.includes(format),
//             split: true,
//         })
//         let newProperties: Partial<SlateElement>
//         if (TEXT_ALIGN_TYPES.includes(format)) {
//             newProperties = {
//                 // @ts-expect-error: Slate Rich Text Error
//                 align: isActive ? undefined : format,
//             }
//         } else {
//             newProperties = {
//                 // @ts-expect-error: Slate Rich Text Error
//                 type: isActive ? 'paragraph' : isList ? 'list-item' : format,
//             }
//         }
//         Transforms.setNodes<SlateElement>(editor, newProperties)

//         if (!isActive && isList) {
//             const block = { type: format, children: [] }
//             // @ts-expect-error: Slate Rich Text Error
//             Transforms.wrapNodes(editor, block)
//         }
//     }
//     // @ts-expect-error: Slate Rich Text Error
//     const toggleMark = (editor, format) => {
//         setChosenMarks((prev) => ({
//             ...prev, // Spread the previous state
//             // @ts-expect-error: Slate Rich Text Error
//             [format]: !prev[format], // Update the specific property
//         }));

//         // check if it is already active in this format
//         const isActive = isMarkActive(editor, format)
//         if (isActive) {
//             Editor.removeMark(editor, format)
//         } else {
//             Editor.addMark(editor, format, true)
//         }
//     }


//     console.log(chosenMarks)
//     // @ts-expect-error: Slate Rich Text Error
//     const isBlockActive = (editor, format, blockType = 'type') => {
//         const { selection } = editor
//         if (!selection) return false
//         const [match] = Array.from(
//             Editor.nodes(editor, {
//                 at: Editor.unhangRange(editor, selection),
//                 match: n =>
//                     !Editor.isEditor(n) &&
//                     SlateElement.isElement(n) &&
//                     // @ts-expect-error: Slate Rich Text Error
//                     n[blockType] === format,
//             })
//         )
//         return !!match
//     }
//     // @ts-expect-error: Slate Rich Text Error
//     const isMarkActive = (editor, format) => {
//         const marks = Editor.marks(editor)
//         // @ts-expect-error: Slate Rich Text Error
//         return marks ? marks[format] === true : false
//     }

//     const ToolBarButtonStyles = 'w-full p-1 h-[30px]'

//     return (
//         <main className='pt-10'>
//             <AddImageModal
//                 onClickHandler={() => insertImage(editor, imageURL)}
//                 setImageUrl={setImageUrl}
//                 setImageAlt={setImageAlt}
//             />
//             <section className='w-[80%] mx-auto max-w-[800px]'>
//                 <Slate
//                     editor={editor} initialValue={initialValue}
//                     onChange={value => {
//                         const isAstChange = editor.operations.some(
//                             op => 'set_selection' !== op.type
//                         )
//                         if (isAstChange) {
//                             // Save the value to Local Storage.
//                             const content = JSON.stringify(value)
//                             localStorage.setItem('content', content)
//                         }
//                     }}
//                 >
//                     <div className='flex items-center bg-[var(--gray-100)] rounded-t border border-[var(--gray-600)]'>
//                         <button
//                             className={`${ToolBarButtonStyles} ${chosenMarks?.bold ? 'bg-[var(--paper-color)]' : ''} rounded-tl-sm`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, 'bold') }}>
//                             <FaBold className='mx-auto' />
//                         </button>
//                         <button
//                             className={`${ToolBarButtonStyles} ${chosenMarks?.italic ? 'bg-[var(--paper-color)]' : ''}`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, 'italic') }}>
//                             <FaItalic className='mx-auto' />
//                         </button>
//                         <button
//                             className={`${ToolBarButtonStyles} ${chosenMarks?.underline ? 'bg-[var(--paper-color)]' : ''}`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, 'underline') }}>
//                             <FaUnderline className='mx-auto' />
//                         </button>
//                         <button
//                             className={`${ToolBarButtonStyles} ${chosenElement === 'heading-one' ? 'bg-[var(--paper-color)]' : ''}`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'heading-one') }}>
//                             H1
//                         </button>
//                         <button
//                             className={`${ToolBarButtonStyles} ${chosenElement === 'heading-two' ? 'bg-[var(--paper-color)]' : ''}`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'heading-two') }}>H2</button>
//                         <button
//                             className={`${ToolBarButtonStyles} ${chosenElement === 'numbered-list' ? 'bg-[var(--paper-color)]' : ''}`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'numbered-list') }}>
//                             <FaListOl className='mx-auto' />
//                         </button>
//                         <button
//                             className={`${ToolBarButtonStyles} ${chosenElement === 'bulleted-list' ? 'bg-[var(--paper-color)]' : ''}`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'bulleted-list') }}>
//                             <FaList className='mx-auto' />
//                         </button>
//                         <button
//                             className={`${ToolBarButtonStyles} ${chosenElement === 'code' ? 'bg-[var(--paper-color)]' : ''}`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'code') }}>
//                             <div className='flex justify-center'>
//                                 <p>&lt;</p>
//                                 <p>&gt;</p>
//                             </div>
//                         </button>
//                         <Link href={"/createBlog/?showModal=addImage"}
//                             className={`${ToolBarButtonStyles}`}>
//                             <CiImageOn size={20} className='mx-auto' />
//                         </Link>
//                         {/* <button
//                             className={`${ToolBarButtonStyles} ${chosenTool === 'code' ? 'bg-[var(--paper-color)]' : ''}`}
//                             onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'code') }}>
//                             Save
//                         </button> */}
//                     </div>
//                     <Editable
//                         renderElement={renderElement}
//                         renderLeaf={renderLeaf}
//                         spellCheck
//                         autoFocus
//                         className='h-[50vh] border border-[var(--gray-600)] border-t-0 p-[15px] rounded-b focus:outline-none overflow-y-scroll overflow-x-hidden break-normal'
//                         onKeyDown={(event) => {
//                             if (event.metaKey || event.ctrlKey) {
//                                 switch (event.key.toLowerCase()) {
//                                     case 'b':
//                                         event.preventDefault();
//                                         toggleMark(editor, 'bold');
//                                         break;
//                                     case 'i':
//                                         event.preventDefault();
//                                         toggleMark(editor, 'italic');
//                                         break;
//                                     case 'u':
//                                         event.preventDefault();
//                                         toggleMark(editor, 'underline');
//                                         break;
//                                     default:
//                                         break;
//                                 }
//                             }
//                             if (event.key === 'Tab') {
//                                 event.preventDefault();
//                                 Transforms.insertText(editor, '    ');
//                             }
//                         }}
//                     />
//                 </Slate>
//             </section>
//         </main >
//     )
// }


// // To Do:
// // 4. finalize Styles
// // show which tool is chosen (everything except)
// // 5. Add Title input
// // 6. Add description Input
// // 6. add tags or categoies it belongs to
// // 7. Add keywords (meta tags and searchable)
// // 8. Save Data
// // 9. Render data on Draft mode
// // 10. Render data on Blog page
// // 11. Show user their own blogs
// // 12 make blogs editable
// // 13. TEST
// // 14 Make 20 blogs
// // 15. Google Ads


import SubheadingTitle from "@/components/Headings/SubheadingTitle"
import SlateRichText from "@/components/SlateRichText"

export default function CreateBlog() {
    return (
        <main className="mt-3">
            <SubheadingTitle title={'Create Blog'} />
            <SlateRichText />
        </main>
    )
}

