import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import type { CreatePostInput } from './schemas/trpc.schema';
import { createPostSchema, postSchema } from './schemas/trpc.schema';
import { PostsService } from './posts.service';
import z from 'zod';

@Router()
export class PostsRouter {
  constructor(private readonly postsService: PostsService) {}
  @Mutation({
    input: createPostSchema,
    output: postSchema,
  })
  async create(@Input() createPostDto: CreatePostInput) {
    return this.postsService.createPost(createPostDto, '123');
  }

  @Query({
    output: z.array(postSchema),
  })
  async finalAll() {
    return this.postsService.getPosts();
  }
}
