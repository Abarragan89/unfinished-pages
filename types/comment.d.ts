import { UserData } from "./users";
import { BlogData } from "./blog";

export interface Comment {
    id: string;
    text: string;
    likes: CommentLike[];
    likeCount: number;
    createdAt: Date;
    replies: Comment[];
    userId: string;
    blogId: string;
    user: UserData; // Assuming `User` is another interface you have defined
    blog: BlogData; // Assuming `Blog` is another interface you have defined
}


interface CommentLike {
    id: string;           // Unique identifier for the like
    userId?: string;       // The ID of the user who liked the comment
    commentId?: string;  // The ID of the comment that was liked
    parentId?: string;
    user?: {
        id: string;         // The user's ID
        name?: string;      // Optional: The user's name
        email: string;      // The user's email
    };
    comment?: {
        id: string;         // The comment's ID
        text: string;       // The text of the comment
        likes: number;      // The number of likes the comment has
        createdAt: Date;    // When the comment was created
    };
}