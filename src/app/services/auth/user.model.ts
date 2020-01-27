export enum Role {
    ADMIN = 'Admin',
    USER = 'User'
}

export interface IUser {
    username: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
    token: string;
}
