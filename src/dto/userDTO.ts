export interface userDTO {
    id: string;
    name: string;
    username: string;
    email: string;
    bio?: string | null;
    imageId?: string | null;
    imageUrl?: string | null;
    createdAt: Date;
  
    // Only include IDs for relationships
    postIds: string[];
    commentIds: string[];
    likeIds: string[];
    saveIds: string[];
    followerIds: string[];
    followingIds: string[];
  }
  