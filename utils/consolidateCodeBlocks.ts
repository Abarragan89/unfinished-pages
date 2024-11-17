import { BlogContent } from "../types/blog";

export default function consolidateCodeBlocks(data: BlogContent[]) {
    const result: BlogContent[] = [];
    let currentCodeBlock: BlogContent | null = null;
    data.forEach((block) => {
        if (block.type === 'code') {
            // If it's a code block, accumulate its content
            if (!currentCodeBlock) {
                currentCodeBlock = { type: 'code', children: [] };
                result.push(currentCodeBlock);
            }
            // Add the text of this block to the current code block
            currentCodeBlock.children.push(...block.children);
        } else {
            // If it's not a code block, close any ongoing code block
            currentCodeBlock = null;
            result.push(block); // Add the non-code block as-is
        }
    });
    return result;
}