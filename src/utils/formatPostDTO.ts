import { PostDTO } from "../dto/postDTO";

export function formatPostDTO(post: any): PostDTO {
    return {
        postId: post.id,
        imageUrl: post.imageUrl,
        caption: post.caption,
        createdAt: post.createdAt,
        user: {
            userId: post.user.id,
            username: post.user.username,
            userImageUrl: post.user.imageUrl,
        },
        likeCount: post._count.likes,
        commentCount: post._count.comments,
    };
}

export function mapToPostDTO(posts: any[]): PostDTO[] {
    return posts.map(formatPostDTO);
}