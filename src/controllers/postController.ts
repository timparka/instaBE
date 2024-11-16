import { createPost } from "../service/postService";
import { Request, Response } from "express";


export const createPostHandler = async (req: Request, res: Response) => {
    try {
        const postData = req.body;
        const post = await createPost(postData);
        res.status(201).json({ data: post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
