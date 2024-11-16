import { BlogContent } from "../types/blog";
import { Descendant } from "slate";

export default function formatContentToDescendantType(blocks: BlogContent[]): Descendant[] {
    const blogContent = blocks.map(block => {
        // Check if block is a list

        if (block.type === 'numbered-list' || block.type === 'bulleted-list') {
            return {
                type: block.type,
                children: block.children
                    .filter(child => child.type === 'list-item') // only list items
                    .map(child => ({
                        type: child.type,
                        children: child.children?.
                            map(nested => ({
                                text: nested.text || '',
                                bold: nested.bold || false,
                                italic: nested.italic || false,
                                underline: nested.underline || false,
                            })) || [],
                    })),
            };
        } else {
            // For non-list types, exclude `children`
            return {

                type: block.type || 'paragraph', // default to 'paragraph' if type is missing
                children: [
                    {
                        text: block.children?.[0]?.text || '',
                        bold: block.children?.[0]?.bold || false,
                        italic: block.children?.[0]?.italic || false,
                        underline: block.children?.[0]?.underline || false,
                    }
                ]
            };
        }
    });
    return blogContent as Descendant[];
}
