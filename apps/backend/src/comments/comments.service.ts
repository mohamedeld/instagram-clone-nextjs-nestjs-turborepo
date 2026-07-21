import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentInput } from '@repo/trpc/schemas';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema } from 'src/database/database.module';
import { comment } from './schema/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async createComment(commentDto: CreateCommentInput, userId: string) {
    await this.database.insert(comment).values({
      postId: commentDto.postId,
      text: commentDto.text,
      userId,
      createdAt: new Date(),
    });
  }
  async getByPostId(postId: number) {
    const comments = await this.database.query.comment.findMany({
      where: eq(comment.postId, postId),
      with: {
        user: true,
      },
    });

    return comments?.map((comment) => ({
      id: comment.id,
      text: comment.text,
      user: {
        username: comment.user.name,
        avatar: comment.user.image || '',
      },
      createdAt: comment.createdAt.toISOString(),
    }));
  }
  async deleteComment(commentId: number, userId: string) {
    await this.database
      .delete(comment)
      .where(and(eq(comment.id, commentId), eq(comment.userId, userId)));
  }
}
