import { createUser, findUser, validatePassword } from "../service/userService";
import { Request, Response } from "express";


export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const user = await createUser(userData);
        res.status(201).json({ data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await findUser(userId);
        res.status(200).json({ data: user });
    } catch (error) {
        console.log(error);
    }
}