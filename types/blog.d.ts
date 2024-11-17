export interface BlogData {
    id: string;
    title: string;
    description: string;
    date: string;
    pictureURL: string;
    likes: number;
    dislikes: number;
}

export interface NestedListChildren {
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

export interface BlogDetails {
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    children?: NestedListChildren[]
    type?: string;

}

export interface BlogContent {
    type: string
    children: BlogDetails[]
    url?: string
}