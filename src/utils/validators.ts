import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    bio: z.string().optional(),
    imageId: z.string().optional(),
    imageUrl: z.string().optional(),
})