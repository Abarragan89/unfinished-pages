import { UserImage } from "./users";

export interface BlogData {
    id?: string;
    title?: string;
    description?: string;
    date?: string;
    coverPhotoUrl?: string;
    coverPhotoAlt?: string;
    likes?: number;
    dislikes?: number;
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