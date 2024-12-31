import { Comment } from "./comment";
import { UserImage, UserData } from "./users";

export interface BlogData {
    id?: string;
    title?: string;
    description?: string;
    date?: string;
    coverPhotoUrl?: string;
    coverPhotoAlt?: string;
    likes?: BlogLike[];
    likeCount?: Int;
    isPublished?: boolean;
    tags?: string;
    publishedDate?: Date;
    categories?: Category[]
    content?: BlogContent;
    readDuration?: number;
    comments?: Comment[]
    _count?: {
        comments?: number
    }
}

export interface Category {
    name: string;
    displayName: string;
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
    id: string;          
    userId: string;      
    blogId: string;     
    user: {
        id: string;       
        name?: string;    
        email: string;    
    };
    blog: {
        id: string; 
        title: string;  
        description?: string;
    };
}