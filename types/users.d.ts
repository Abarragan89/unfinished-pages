interface UserData {
    id?: string; // Mark as optional
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export interface Data {
    expires: string;
    isAuthor?: boolean;
    isAdmin?: boolean;
    user?: UserData;
}

export interface Session {
    data?: Data | null;
    status: string;
    isAuthor?: boolean;
    isAdmin?: boolean;
    update: (data: Partial<Data>) => void;
}

export interface UserImage {
    id: string;
    url: string;
    alt: string;
    width: number;
    height: number;
    isBlogCover: boolean;
}

interface AuthorRequest {
    id: string; 
    aboutText: string; 
    whyBlogText: string; 
    topicsText: string; 
    replyMessage?: string;
    status: string;
    userId: string; 
    user: UserData; 
    createdAt: Date;
}