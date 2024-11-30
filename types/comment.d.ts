import { UserData } from "./users";
import { BlogData } from "./blog";

export interface Comment {
    id: string;
    text: string;
    likes: number;
    createdAt: Date;
    replies: ReplyComment[];
    userId: string;
    blogId: string;
    user: UserData; // Assuming `User` is another interface you have defined
    blog: BlogData; // Assuming `Blog` is another interface you have defined
}

export interface ReplyComment {
    id: string;
    text: string;
    likes: number;
    createdAt: Date;
    userId: string;
    commentId: string;
    user: UserData; // Assuming `User` is another interface you have defined
    comment: Comment; // Relationship back to the parent comment
}