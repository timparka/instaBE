import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { omit, orderBy } from 'lodash';
import { Prisma } from "@prisma/client";
import { mapToPostDTO } from "../utils/formatPostDTO";
import { PostDTO } from "../dto/postDTO";

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

export async function getFollowingIds(userId: string): Promise<string[]> {
    //need userIds of user who is calling this methods following list
    const followingList = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            following: {
                select: {
                    followeeId: true,
                },
            },
        },
    });

    if (!followingList || followingList.following.length === 0) {
        // If the user isn't following anyone, return an empty array
        return [];
    }
    //put 
    return followingList.following.map(followee => followee.followeeId);
    //from here we grab the most recent posts ids (createdAt flag)
    //get post's imageurls
}

export async function fetchPostDetails(followeeIds: string[]) {
    return await prisma.post.findMany({
        where: {
            userId: {
                in: followeeIds,
            },
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    imageUrl: true
                }
            },
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            },
        },
    });
}

export async function getHomeFeed(userId: string): Promise<PostDTO[]> {
    const followeeIds = await getFollowingIds(userId);

    const posts = await fetchPostDetails(followeeIds);

    return mapToPostDTO(posts);
}

export async function getUsersPage(userId: string) {
    // Fetch the user's posts ordered by createdAt in descending order
    const userPage = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        posts: {
          orderBy: {
            createdAt: 'desc', // Order posts by createdAt
          },
          select: {
            imageUrl: true, // Only fetch image URLs
          },
        },
      },
    });
  
    // If no user or no posts, return an empty array
    if (!userPage || !userPage.posts) {
      return [];
    }
  
    // Map over posts to extract image URLs
    return userPage.posts.map((post) => post.imageUrl);
  }
  
  

export async function getUsersFeed(userId: string, postId: string) {
    //grab userId and post id from that user
    const userFeed = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            posts: {
              orderBy: {
                createdAt: 'desc', // Order posts by createdAt
              },
              select: {
                imageUrl: true, // Only fetch image URLs
              },
            },
        },
    });
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

