import { PrismaClient } from "@prisma/client";
import { CreatePostInput } from "../models/post";

const prisma = new PrismaClient();

export async function createPost(data: CreatePostInput) {
    const post = await prisma.post.create({
        data: {
            ...data,
        },
    });
    return post;
}

export async function likePost(postId: string, userId: string) {
    //get postId from system that is calling it
    //use that id to increment its like counter
    //add userId to that postId's likedBy[]
    //add postId to user's likes[]
    

    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { likedBy: true },
    });

    if (!post) {
        throw new Error("Post doesn't exist")
    }
    
}

export async function commentOnPost(postId: string, userId: string, comment: string) {
    //get postId and userId from system that is calling it
    //increment post comment counter
    //add user's comment to post's comment string[]

}