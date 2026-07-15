import { Inject, Injectable } from '@nestjs/common';
import { CreatePostInput, Post } from './schemas/trpc.schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/database/database.module';
import { post } from './schemas/schema';
import { UsersService } from 'src/auth/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly usersService: UsersService,
  ) {}

  async createPost(createPostDto: CreatePostInput, userId: string) {
    const [newPost] = await this.database
      .insert(post)
      .values({
        caption: createPostDto.caption,
        userId: userId,
        image: '',
        createdAt: new Date(),
        likes: 0,
      })
      .returning();

    return this.formatPostResponse(newPost, userId);
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.database.query.post.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
      with: {
        user: true,
      },
    });
    return posts?.map((post) => ({
      id: post.id,
      caption: post.caption,
      image: post.image,
      likes: post.likes,
      timestamp: post.createdAt.toISOString(),
      comments: 0,
      user: {
        avatar: '',
        username: post.user?.name,
      },
    }));
  }

  private async formatPostResponse(
    savedPost: typeof post.$inferSelect,
    userId: string,
  ): Promise<Post> {
    const userInfo = await this.usersService.findById(userId);
    return {
      id: savedPost.id,
      caption: savedPost.caption,
      image: savedPost.image,
      likes: savedPost.likes,
      timestamp: savedPost.createdAt.toISOString(),
      comments: 0,
      user: {
        avatar: '',
        username: userInfo?.name,
      },
    };
  }
}
