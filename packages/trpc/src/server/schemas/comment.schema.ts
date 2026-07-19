import z from "zod";

export const createCommentSchema = z.object({
  text: z.string().min(1, "Comment is required"),
  postId: z.number(),
});

export const deleteComment = z.object({
  commentId: z.number(),
});

export const getCommentsSchema = z.object({
  postId: z.number(),
});

export const commentSchema = z.object({
  id: z.number(),
  user: z.object({
    username: z.string(),
    avatar: z.string(),
  }),
  text: z.string(),
  timestamp: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type DeleteCommentInput = z.infer<typeof deleteComment>;
export type GetCommentsInput = z.infer<typeof getCommentsSchema>;
