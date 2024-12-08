import { commentDTO } from "../dto/commentDTO";

export function formatCommentDTO(comment: any): commentDTO {
    return {
      id: comment.id,
      postId: comment.postId,
      userId: comment.userId,
      content: comment.content,
      createdAt: comment.createdAt,
    };
  }
  