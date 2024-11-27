import { postDTO } from "../dto/postDTO";


export function formatPostDTO(post: any): postDTO {
    return {
        postId: post.id,
        imageUrl: post.imageUrl,
        caption: post.caption,
        tags: post.tags ?? [], 
        location: post.location ?? null, 
        createdAt: post.createdAt,
        user: {
            userId: post.user.id,
            username: post.user.username,
            userImageUrl: post.user.imageUrl,
        },
        likeCount: post._count.likes,
        commentCount: post._count.comments,
        likes: post.likes.map((like: any) => like.user.username),
        comments: post.comments.map((comment: any) => ({
            username: comment.user.username,
            content: comment.content,
            createdAt: comment.createdAt,
        })),
    };
}
export function mapToPostDTO(posts: any[]): postDTO[] {
    return posts.map(formatPostDTO);
}
