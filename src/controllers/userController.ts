import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const userClient = new PrismaClient().user;

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const user = await userClient.create({
            data: userData,
        });

        res.status(201).json({ data: user });
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await userClient.findUnique({
            where: {
                id: userId,
            },
        });

        res.status(200).json({ data: user });
    } catch (error) {
        console.log(error);
    }
}