"use client";
import { trpc } from "@/lib/trpc/client";
import Comments from "./comments";

interface PostComments {
  postId: number;
  expandedComments: Set<number>;
}

export default function PostComments({
  postId,
  expandedComments,
}: PostComments) {
  const utils = trpc.useUtils();
  const { data: comments } = trpc.commentsRouter.getByPostId.useQuery({
    postId,
  });

  const createComment = trpc.commentsRouter.createComment.useMutation({
    onSuccess: (_, variables) => {
      utils.commentsRouter.getByPostId.invalidate({
        postId: postId,
      });

      utils.postsRouter.finalAll.setData(undefined, (old) => {
        if (!old) return old;

        return old.map((post) => {
          if (post.id === postId) {
            return { ...post, comments: post.comments + 1 };
          }
          return post;
        });
      });
    },
  });

  const deleteComment = trpc.commentsRouter.deleteComment.useMutation({
    onSuccess: () => {
      utils.commentsRouter.getByPostId.invalidate();
      utils.postsRouter.finalAll.invalidate();
    },
  });
  return (
    <>
      {expandedComments.has(postId) && (
        <div className="pt-4 border-t">
          <Comments
            comments={comments || []}
            onAddComment={(text) => {
              createComment.mutate({ postId, text });
            }}
            onDeleteComment={(commentId) => {
              deleteComment.mutate({ commentId });
            }}
          />
        </div>
      )}
    </>
  );
}
