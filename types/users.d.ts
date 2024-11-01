interface UserData {
    id?: string; // Mark as optional
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export interface Data {
    expires: string;
    user?: UserData;
}

export interface Session {
    data?: Data | null;
    status: string;
    update: (data: Partial<Data>) => void;
}