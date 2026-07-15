"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

type SuggestedUser = {
  id: string;
  username: string;
  avatar: string;
  followedBy: string;
};

const mockSuggestedUsers: SuggestedUser[] = [
  {
    id: "1",
    username: "john_doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    followedBy: "jane_doe",
  },
  {
    id: "2",
    username: "jane_doe",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    followedBy: "john_doe",
  },
];

export const SuggestedUsers = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-muted-foreground">
          Suggestions for you
        </h3>
      </div>
      <div className="space-y-3">
        {mockSuggestedUsers?.map((user) => (
          <div className="flex items-center space-x-3" key={user?.id}>
            <Image
              src={user?.avatar}
              alt={user?.username}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{user.username}</div>
              {user?.followedBy && (
                <div className="text-xs text-muted-foreground">
                  Followed by {user?.followedBy}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/90 text-xs"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
