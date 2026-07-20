import { PostsService } from './posts.service';
import type { CreatePostInput, LikePostInput } from '@repo/trpc/schemas';
import type { IAppContext } from 'src/app-context.interface';
export declare class PostsRouter {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostInput, context: IAppContext): Promise<void>;
    finalAll(context: IAppContext): Promise<{
        id: number;
        user: {
            username: string;
            avatar: string;
        };
        image: string;
        caption: string;
        likes: number;
        comments: number;
        timestamp: string;
        isLiked?: boolean | undefined;
    }[]>;
    likePost(likePostDto: LikePostInput, context: IAppContext): Promise<void>;
}
//# sourceMappingURL=posts.router.d.ts.map