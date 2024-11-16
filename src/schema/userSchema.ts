import { object, string } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'password must be at least 8 characters long'
        }).min(8, 'password must be at least 8 characters long'),
        passwordConfirmation: string({
            required_error: 'password must be the same'
        }),
        email: string({
            required_error: 'Email must be provided'
        }).email('invalid email'),
    }).refine((data))
});