import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { omit, orderBy } from 'lodash';
import { CreateUserInput } from "../models/user";
import { CreatePostInput } from "../models/post";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(data: Prisma.UserCreateInput) {
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

export async function getHomeFeed(userId: string, postId: string) {
    //need userIds of user who is calling this methods following list
    //from here we grab the most recent posts ids (createdAt flag)
    //get post's imageurls
}

export async function getUsersPage(userId: string) {
    //grab userId and get all postid from that user
    const userPage = await prisma.user.findMany({
        where: {
            id: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            imageUrl: true,
        },
    });

    if (!userPage || !userPage.posts) {
        return [];
    }

    return userPage.posts.map((post: CreatePostInput) => post.imageUrl);
    //return all post image urls for that user
}

export async function getUsersFeed(userId: string, postId: string) {
    //grab userId and post id from that user
    const userFeed = await prisma.user.findMany({
        where: {
            
        }
    })
    //use functions below to grab likes and comments for each unique post
    //return that and imageUrls
}

export async function followUser(userId: string) {
    //add followed usersId to user's following list
    //add following usersId to user's followed list
}

export async function showFollows(userId: string) {
    //return users follower and following count
}
