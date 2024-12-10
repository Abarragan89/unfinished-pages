import { UserData } from "./users";
import { BlogData } from "./blog";

export interface Notification {
    id: string;
    userId: string;
    user?: User; // Assuming a User interface exists
    blogId: string;
    blog?: Blog; // Assuming a Blog interface exists
    url: string;
    message: string;
    createdAt: Date;
    isRead: boolean;
}