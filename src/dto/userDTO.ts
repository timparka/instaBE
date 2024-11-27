export interface userDTO {
    userId: string;
    name: string;
    email: string;
    password: string;
    username: string;
    bio?: string | null;
    imageId?: string | null;
    imageUrl?: string | null;
}