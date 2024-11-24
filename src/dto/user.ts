export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    username?: string;
    bio?: string;
    imageId?: string;
    imageUrl?: string;
}