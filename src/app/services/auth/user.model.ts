export enum Role {
    ADMIN = 'Admin',
    USER = 'User'
}

export interface IUser {
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
}
