import 'next-auth';
import { UserData } from './users';

declare module 'next-auth' {
    interface Session {
        isAuthor?: boolean; // Add your custom field
        isAdmin?: boolean
        user?: UserData
    }
}