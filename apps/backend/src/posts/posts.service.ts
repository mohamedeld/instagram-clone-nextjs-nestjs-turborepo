import { Inject, Injectable } from '@nestjs/common';
import type { CreatePostInput, Post } from '@repo/trpc/schemas';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/database/database.module';
import { like, post } from './schemas/schema';
import { UsersService } from 'src/auth/users/users.service';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly usersService: UsersService,
  ) {}

  async createPost(createPostDto: CreatePostInput, userId: string) {
    await this.database.insert(post).values({
      caption: createPostDto.caption,
      userId: userId,
      image: createPostDto.image,
      createdAt: new Date(),
    });
  }

  async getPosts(userId: string): Promise<Post[]> {
    const posts = await this.database.query.post.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
      with: {
        user: true,
        likes: true,
      },
    });
    return posts?.map((post) => ({
      id: post.id,
      caption: post.caption,
      image: post.image,
      likes: post.likes.length,
      timestamp: post.createdAt.toISOString(),
      comments: 0,
      user: {
        avatar: post.user?.image || '',
        username: post.user?.name,
      },
      isLiked: post.likes.some((like) => like.userId === userId),
    }));
  }

  async likePost(postId: number, userId: string) {
    const existingLike = await this.database.query.like.findFirst({
      where: and(eq(like.postId, postId), eq(like.userId, userId)),
    });
    if (existingLike) {
      await this.database.delete(like).where(eq(like.id, existingLike.id));
    } else {
      await this.database.insert(like).values({
        postId: postId,
        userId: userId,
      });
    }
  }
}
