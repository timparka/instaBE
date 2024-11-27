export interface postDTO {
    postId: string;
    imageUrl: string;
    caption: string | null;
    createdAt: Date;
    tags?: string[]; // Optional array of strings for tags
    location?: string | null; // Optional location field
    user: {
        userId: string;
        username: string;
        userImageUrl: string | null;
    };
    likeCount: number;
    commentCount: number;
    likes: string[]; // List of recent usernames who liked the post
    comments: {
        username: string;
        content: string;
        createdAt: Date;
    }[];
}
