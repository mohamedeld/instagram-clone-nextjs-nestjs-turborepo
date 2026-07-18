"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

type IProps = { postId: number; isLiked?: boolean };

export const ToogleLiked = ({ postId, isLiked }: IProps) => {
  const utils = trpc.useUtils();
  const likePost = trpc.postsRouter.likePost.useMutation({
    onMutate: ({ postId }) => {
      utils.postsRouter.finalAll.setData(undefined, (oldPosts) => {
        if (!oldPosts) return oldPosts;
        return oldPosts?.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            };
          }
          return post;
        });
      });
    },
    onSuccess: () => {
      utils.postsRouter.finalAll.invalidate();
    },
  });
  const handleLike = () => {
    likePost.mutate({ postId });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className="p-0 h-auto"
    >
      <Heart
        className={cn(
          "size-6 ",
          isLiked ? "fill-red-500 text-red-500" : "text-foreground",
        )}
      />
    </Button>
  );
};
