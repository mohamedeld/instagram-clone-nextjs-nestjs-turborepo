"use client";
import { Post } from "@repo/trpc/schemas";
import React, { useState } from "react";
import { ToogleLiked } from "./ToogleLiked";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import PostComments from "./post-comments";

type PostCommentContainerProps = {
  post: Post;
};

export const PostCommentContainer = ({ post }: PostCommentContainerProps) => {
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set(),
  );

  const router = useRouter();
  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ToogleLiked postId={post?.id} isLiked={post?.isLiked} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleComments(post.id)}
            className="p-0 h-auto"
          >
            <MessageCircle
              className={`w-6 h-6 ${expandedComments.has(post.id) ? "fill-primary text-primary" : "text-foreground"}`}
            />
          </Button>
        </div>
      </div>
      <div className="text-sm font-semibold">{post?.likes} likes</div>
      <div className="text-sm">
        <span className="font-semibold">{post?.user?.username}</span>{" "}
        {post?.caption}
      </div>
      {post?.comments > 0 && (
        <div className="text-sm text-muted-foreground">
          View all {post?.comments} comments
        </div>
      )}
      <div className="text-xs text-muted-foreground uppercase">
        {new Date(post?.timestamp).toLocaleDateString()}
      </div>
      <PostComments expandedComments={expandedComments} postId={post?.id} />
    </div>
  );
};
