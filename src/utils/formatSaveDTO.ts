import { saveDTO } from "../dto/saveDTO";

export function formatSaveDTO(save: any): saveDTO {
    return {
      id: save.id,
      userId: save.userId,
      postId: save.postId,
      createdAt: save.createdAt,
    };
  }
  