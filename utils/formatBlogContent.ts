import { BlogContent } from "../types/blog";
import { Descendant } from "slate";

export default function formatContentToDescendantType(blocks: BlogContent[]): Descendant[] {
    return blocks.map(block => {
        if (block.type === 'numbered-list' || block.type === 'bulleted-list') {
            // Handle lists
            return {
                type: block.type,
                children: block.children
                    .filter(child => child.type === 'list-item') // Only list items
                    .map(child => ({
                        type: child.type,
                        children: child.children?.map(nested => ({
                            text: nested.text || '',
                            bold: nested.bold || false,
                            italic: nested.italic || false,
                            underline: nested.underline || false,
                        })) || [],
                    })),
            };
        } else {
            // Handle non-list types
            return {
                type: block.type || 'paragraph', // Default to 'paragraph' if type is missing
                url: block?.url || null,
                children: block.children?.map(child => ({
                    text: child.text || '',
                    bold: child.bold || false,
                    italic: child.italic || false,
                    underline: child.underline || false,
                }))
            };
        }
    }) as Descendant[];
}
