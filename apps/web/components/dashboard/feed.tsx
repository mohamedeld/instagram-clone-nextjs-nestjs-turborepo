"use client";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, MessageCircle } from "lucide-react";

type PostProps = {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
};

const mockPosts: PostProps[] = [
  {
    id: "1",
    user: {
      username: "john_doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    caption: "A beautiful scenery",
    likes: 120,
    comments: 15,
    timestamp: "2024-06-01T12:00:00Z",
  },
  {
    id: "2",
    user: {
      username: "jane_doe",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    caption: "A beautiful scenery",
    likes: 120,
    comments: 15,
    timestamp: "2024-06-01T12:00:00Z",
  },
];

export const Feed = () => {
  return (
    <div className="space-y-6">
      {mockPosts?.map((post) => (
        <Card key={post?.id} className="overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Image
                src={post?.user?.avatar}
                alt={post?.user?.username}
                width={64}
                height={64}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold text-sm">
                {post?.user?.username}
              </span>
            </div>
          </div>
          <div className="aspect-square relative">
            <Image
              src={post?.image}
              alt={post?.caption}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="p-0 h-auto"
                >
                  <Heart className="size-6 text-foreground" />
                </Button>
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
      ))}
    </div>
  );
};
