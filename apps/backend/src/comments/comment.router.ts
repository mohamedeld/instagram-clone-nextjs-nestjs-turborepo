import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from 'nestjs-trpc';
import { AuthTrpcMiddleware } from 'src/auth/auth-trpc.middleware';
import { CommentsService } from './comments.service';
import {
  commentSchema,
  createCommentSchema,
  deleteComment,
  getCommentsSchema,
} from '@repo/trpc/schemas';
import type {
  CreateCommentInput,
  DeleteCommentInput,
  GetCommentsInput,
} from '@repo/trpc/schemas';
import type { IAppContext } from '../app-context.interface';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class CommentsRouter {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation({ input: createCommentSchema })
  async createComment(
    @Input() createCommentDto: CreateCommentInput,
    @Ctx() context: IAppContext,
  ) {
    return this.commentsService.createComment(
      createCommentDto,
      context.user.id,
    );
  }

  @Query({ input: getCommentsSchema })
  async getByPostId(@Input() getCommentInput: GetCommentsInput) {
    return this.commentsService.getByPostId(getCommentInput.postId);
  }

  @Mutation({ input: deleteComment })
  async deleteComment(
    @Input() deleteCommentInput: DeleteCommentInput,
    @Ctx() context: IAppContext,
  ) {
    return this.commentsService.deleteComment(
      deleteCommentInput.commentId,
      context.user.id,
    );
  }
}
