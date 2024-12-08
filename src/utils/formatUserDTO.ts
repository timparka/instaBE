import { User, Comment, Post, Save, Follow } from "@prisma/client";
import { userDTO } from "../dto/userDTO";
import { formatPostDTO } from "./formatPostDTO";

export function formatUserDTO(user: any): userDTO {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || null,
      imageId: user.imageId || null,
      imageUrl: user.imageUrl || null,
      createdAt: user.createdAt,
  
      postIds: user.posts ? user.posts.map((post: any) => post.id) : [],
      commentIds: user.comments ? user.comments.map((comment: any) => comment.id) : [],
      likeIds: user.likes ? user.likes.map((like: any) => like.id) : [],
      saveIds: user.saves ? user.saves.map((save: any) => save.id) : [],
      followerIds: user.followedBy ? user.followedBy.map((follower: any) => follower.id) : [],
      followingIds: user.following ? user.following.map((followee: any) => followee.id) : [],
    };
  }
  