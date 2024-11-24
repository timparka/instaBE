export interface PostDTO {
    postId: string;
    imageUrl: string;
    caption: string | null;
    createdAt: Date;
    user: {
        userId: string;
        username: string;
        userImageUrl: string | null;
    };
    likeCount: number;
    commentCount: number;
}