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

export async function getHomeFeed(params:type) {
    //need userIds of user who is calling this methods following list
    //from here we grab the most recent posts ids (createdAt flag)
    //get post's imageurls
    //call methods below for comments and likes
}

export async function getUsersPage() {
    //grab userId and get all postid from that user
    //return all post image urls for that user
}

export async function getUsersFeed(params:type) {
    //grab userId and post id from that user
    //use functions below to grab likes and comments for each unique post
    //return that and imageUrls
}

export async function addLike(postId: string, userId: string) {
    //get postId and userId
    //make new like object with that postId and userId
    const like = await prisma.like.create({
        where: {
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

export async function recentUsernameOfLikes() {
    //get 3 most recent tables of that post's userIds and return 3 usernames
}

export async function addComment(postId: string, userId: string, comment: string) {
    //get postId and userId from system that is calling it
    //new entry in comment table using the contents provided
}

export async function getCommentCount() {
    //count comments by querying database of that post
}

export async function getCommentDetails(params:type) {
    //get all comments in that posts table
    //return userId and contents of that comment
}