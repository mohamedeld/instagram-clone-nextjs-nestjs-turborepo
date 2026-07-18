"use client";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircle, User } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import { getImageUrl } from "@/utils/getImageUrl";
import { ToogleLiked } from "./ToogleLiked";
import type { Post } from "@repo/trpc/schemas";

export const Feed = () => {
  const posts = trpc.postsRouter.finalAll.useQuery();
  const mockPosts: Post[] = posts?.data || [];

  return (
    <div className="space-y-6">
      {mockPosts?.map((post) => {
        const avatarUrl = getImageUrl(post?.user?.avatar);
        const postImageUrl = getImageUrl(post?.image);

        return (
          <Card key={post?.id} className="overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={post?.user?.username}
                    width={64}
                    height={64}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted-foreground flex items-center justify-center">
                    <User className="w-4 h-4 text-muted" />
                  </div>
                )}

                <span className="font-semibold text-sm">
                  {post?.user?.username}
                </span>
              </div>
            </div>
            <div className="aspect-square relative">
              {postImageUrl ? (
                <Image
                  src={postImageUrl}
                  alt={post?.caption}
                  fill={true}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ToogleLiked postId={post?.id} isLiked={post?.isLiked} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {}}
                    className="p-0 h-auto"
                  >
                    <MessageCircle className="size-6 text-foreground" />
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
            </div>
          </Card>
        );
      })}
    </div>
  );
};
