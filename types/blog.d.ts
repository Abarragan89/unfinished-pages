import { UserImage, UserData } from "./users";

export interface BlogData {
    id?: string;
    title?: string;
    description?: string;
    date?: string;
    coverPhotoUrl?: string;
    coverPhotoAlt?: string;
    likes?: BlogLike[];
    isPublished?: boolean;
    publishedDate?: Date;
    content?: BlogContent;
    readDuration?: number;
}

export interface NestedListChildren {
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    type?: string;
    url?: string;
    children?: NestedListChildren[]
}

export interface BlogDetails {
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    children?: NestedListChildren[]
    type?: string;
    url?: string;
}

export interface BlogContent {
    type: string
    children: BlogDetails[]
    image?: UserImage
    url?: string;
    videoUrl?: string;
}

interface BlogLike {
    id: string;           // Unique identifier for the like
    userId: string;       // The ID of the user who liked the blog
    blogId: string;       // The ID of the blog that was liked
    user: {
        id: string;         // The user's ID
        name?: string;      // Optional: The user's name (assuming the User model has a name field)
        email: string;      // The user's email
    };
    blog: {
        id: string;         // The blog's ID
        title: string;      // The title of the blog
        description?: string; // Optional: A brief description of the blog
    };
}