import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { CreateUserInput } from "../models/user";

const prisma = new PrismaClient();

export async function createUser(data: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword
        },
    });
    return omit(user, "password");
}

export async function validatePassword(email: string, password: string) {
    const user = await prisma.user.findUnique({where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? omit(user, "password") : null;
}

export async function findUser(id: string) {
    const user = await prisma.user.findUnique({where: { id }});
    if (!user) {
        return null;
    } else {
        return user;
    }
}

