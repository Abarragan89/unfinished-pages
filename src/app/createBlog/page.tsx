"use client";
// Import React dependencies.
import React, { useState, useCallback } from 'react'
// Import the Slate editor factory.
import { Editor, Transforms, Element, createEditor, leaf } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

// Component Imports
import CodeBlock from '@/components/SlateRenderers/CodeBlock';
import DefaultBlock from '@/components/SlateRenderers/DefaultBlock';
import Leaf from '@/components/SlateRenderers/Leaf';
import NumberedList from '@/components/SlateRenderers/NumberedList';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}


export default function CreateBlog() {

    const initialValue: Descendant[] = [
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ]

    const [editor] = useState(() => withReact(createEditor()))

    const renderElement = useCallback(props => {
        console.log(props.element.type)
        switch (props.element.type) {
            case 'code':
                return <CodeBlock {...props} />
            case 'numbered-list':
                return <NumberedList {...props} />
            default:
                return <DefaultBlock {...props} />
        }
    }, []);

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])


    // Define our own custom set of helpers.
    const CustomEditor = {
        isBoldMarkActive(editor) {
            const marks = Editor.marks(editor)
            return marks ? marks.bold === true : false
        },
        isItalicMarkActive(editor) {
            const marks = Editor.marks(editor)
            return marks ? marks.italic === true : false
        },
        isUnderlineMarkActive(editor) {
            const marks = Editor.marks(editor)
            return marks ? marks.underline === true : false
        },

        isCodeBlockActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code',
            })
            return !!match
        },

        isNumberedListActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'numbered-list',
            })
            return !!match
        },

        toggleBoldMark(editor) {
            const isActive = CustomEditor.isBoldMarkActive(editor)
            if (isActive) {
                Editor.removeMark(editor, 'bold')
            } else {
                Editor.addMark(editor, 'bold', true)
            }
        },

        toggleItalicMark(editor) {
            const isActive = CustomEditor.isItalicMarkActive(editor)
            if (isActive) {
                Editor.removeMark(editor, 'italic')
            } else {
                Editor.addMark(editor, 'italic', true)
            }
        },

        toggleUnderlineMark(editor) {
            const isActive = CustomEditor.isUnderlineMarkActive(editor)
            if (isActive) {
                Editor.removeMark(editor, 'underline')
            } else {
                Editor.addMark(editor, 'underline', true)
            }
        },

        toggleCodeBlock(editor) {
            const isActive = CustomEditor.isCodeBlockActive(editor)
            Transforms.setNodes(
                editor,
                { type: isActive ? null : 'code' },
                { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
            )
        },
        toggleNumberedListBlock(editor) {
            const isActive = CustomEditor.isNumberedListActive(editor)
            console.log('numbered list ', isActive)
            Transforms.setNodes(
                editor,
                { type: isActive ? null : 'numbered-list' },
                { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
            )
        },
    }

    return (
        <>
            <button onClick={() => CustomEditor.toggleCodeBlock(editor)}>Code</button>
            <button onClick={() => CustomEditor.toggleBoldMark(editor)}>Bold</button>
            <button onClick={() => CustomEditor.toggleItalicMark(editor)}>Italic</button>
            <button onClick={() => CustomEditor.toggleUnderlineMark(editor)}>Underline</button>
            <button onClick={() => CustomEditor.toggleNumberedListBlock(editor)}>Numbered-list</button>
            <Slate editor={editor} initialValue={initialValue}>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder='Create your blog here...'
                    spellCheck
                    autoFocus
                    className='w-[80%] mx-auto max-w-[800px] border border-[var(--brown-500)] p-[20px] rounded-md'
                />
            </Slate>
        </>
    )
}


