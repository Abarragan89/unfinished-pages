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
        } else if (block.type === 'image' && block.image) {
            return {
                type: block.type,
                children: block.children?.map(child => ({
                    text: child.text || '',
                    bold: child.bold || false,
                    italic: child.italic || false,
                    underline: child.underline || false,
                })),
                image: {
                    id: block.image.id,
                    url: block.image.url,
                    alt: block.image.alt,
                    width: block.image.width,
                    height: block.image.height
                }
            }
        }
        else {
            return {
                type: block.type || 'paragraph',
                children: block.children?.map(child => {
                    if (child.type === 'link') {
                        // Ensure links have valid children
                        return {
                            type: 'link',
                            url: child.url || '',
                            children: child.children?.map(nested => ({
                                text: nested.text || '',
                                bold: nested.bold || false,
                                italic: nested.italic || false,
                                underline: nested.underline || false,
                            })) || [],
                        };
                    } else {
                        // Text nodes
                        return {
                            text: child.text || '',
                            bold: child.bold || false,
                            italic: child.italic || false,
                            underline: child.underline || false,
                        };
                    }
                }) || [],
            };
        }
    }) as Descendant[];
}
