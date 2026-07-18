import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from 'nestjs-trpc';

import { PostsService } from './posts.service';
import z from 'zod';
import type { CreatePostInput, LikePostInput } from '@repo/trpc/schemas';
import {
  createPostSchema,
  likePostSchema,
  postSchema,
} from '@repo/trpc/schemas';
import { AuthTrpcMiddleware } from 'src/auth/auth-trpc.middleware';
import type { IAppContext } from 'src/app-context.interface';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class PostsRouter {
  constructor(private readonly postsService: PostsService) {}

  @Mutation({
    input: createPostSchema,
  })
  async create(
    @Input() createPostDto: CreatePostInput,
    @Ctx() context: IAppContext,
  ) {
    return this.postsService.createPost(createPostDto, context.user.id);
  }

  @Query({
    output: z.array(postSchema),
  })
  async finalAll(@Ctx() context: IAppContext) {
    return this.postsService.getPosts(context.user.id);
  }

  @Mutation({
    input: likePostSchema,
  })
  async likePost(
    @Input() likePostDto: LikePostInput,
    @Ctx() context: IAppContext,
  ) {
    return this.postsService.likePost(likePostDto.postId, context.user.id);
  }
}
