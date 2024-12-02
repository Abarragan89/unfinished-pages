import 'next-auth';

declare module 'next-auth' {
    interface Session {
        isAuthor?: boolean; // Add your custom field
        isAdmin?: boolean
    }
}