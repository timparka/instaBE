import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePostInput } from "../models/post";
import { orderBy } from "lodash";

const prisma = new PrismaClient();

export async function createPost(data: Prisma.PostCreateInput) {
    const post = await prisma.post.create({
        data: {
            ...data,
        },
    });
    return post;
}

export async function addLike(postId: string, userId: string) {
    //get postId and userId
    //make new like object with that postId and userId
    const like = await prisma.like.create({
        data: {
            postId: postId,
            userId: userId,
        },
    });
}

export async function getLikes(postId: string) {
    //count likes by querying database of that post
    const count = await prisma.like.count({
        where: {
            postId: postId,
        },
    });
    return count;
}

export async function recentUsernameOfLikes(postId: string) {
    const recentLikes = await prisma.like.findMany({
        where: {
            postId: postId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 3,
        include: {
            user: {
                select: {
                    username: true,
                },
            },
        },
    });
    const usernames = recentLikes.map((like) => like.user.username);
    if (recentLikes.length === 0) {
        return [];
    }
    return usernames;
}

export async function addComment(postId: string, userId: string, commentId: string) {
    //get postId and userId from system that is calling it
    const comment = await prisma.comment.create({
        data: {
            userId: userId,
            postId: postId,
            content: commentId,
        }
    })
    //new entry in comment table using the contents provided
}

export async function getCommentCount(postId: string) {
    //count comments by querying database of that post
    const count = await prisma.comment.count({
        where: {
            postId: postId,
        },
    });
    return count;
}

export async function getCommentDetails(postId: string) {
    //get all comments in that posts table
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            user: {
                select: {
                    username: true,
                },
            },
        },
    });
    return comments.map((comment) => ({
        username: comment.user.username,
        content: comment.content,
        createdAt: comment.createdAt,
    }));
    //return userId and contents of that comment
}

export async function addSave(postId: string, userId: string) {
    const save = await prisma.save.create({
        data: {
            postId: postId,
            userId: userId,
        },
    });
}