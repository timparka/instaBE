import { Prisma, PrismaClient } from "@prisma/client";
import { orderBy } from "lodash";
import { formatPostDTO } from "../utils/formatPostDTO";

const prisma = new PrismaClient();

export async function createPost(data: Prisma.PostCreateInput) {
    const post = await prisma.post.create({
        data: {
            ...data,
        },
    });
    return post;
}

export async function fetchManyPostDetails(followeeIds: string[]) {
    const posts = await prisma.post.findMany({
        where: {
            userId: {
                in: followeeIds,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    imageUrl: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                    comments: true,
                },
            },
            likes: {
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
            comments: {
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
        },
    });

    if (!posts || posts.length === 0) {
        return [];
    }

    return posts.map(formatPostDTO);
}


export async function fetchPostDetails(postId: string) {
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    imageUrl: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                    comments: true,
                },
            },
            likes: {
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
            comments: {
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
        },
    });

    if (!post) {
        throw new Error("Post not found");
    }

    return formatPostDTO(post);
}


export async function updatePost(postId: string, userId: string, data: { caption?: string; tags?: string[] }) {
    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        throw new Error('Post not found');
    }

    if (post.userId !== userId) {
        throw new Error('Unauthorized action');
    }

    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data,
    });

    return updatedPost;
}

export async function deletePost(postId: string, userId: string) {
    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        throw new Error('Post not found');
    }

    if (post.userId !== userId) {
        throw new Error('Unauthorized action');
    }

    await prisma.post.delete({
        where: { id: postId },
    });

    return { message: 'Post deleted successfully' };
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

export async function getUsernameOfLikes(postId: string) {
    const recentLikes = await prisma.like.findMany({
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
    return recentLikes.map((like) => like.user.username);
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