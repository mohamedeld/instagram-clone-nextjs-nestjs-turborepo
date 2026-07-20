import type { CreatePostInput, Post } from '@repo/trpc/schemas';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/database/database.module';
import { UsersService } from 'src/auth/users/users.service';
export declare class PostsService {
    private readonly database;
    private readonly usersService;
    constructor(database: NodePgDatabase<typeof schema>, usersService: UsersService);
    createPost(createPostDto: CreatePostInput, userId: string): Promise<void>;
    getPosts(userId: string): Promise<Post[]>;
    likePost(postId: number, userId: string): Promise<void>;
}
//# sourceMappingURL=posts.service.d.ts.map