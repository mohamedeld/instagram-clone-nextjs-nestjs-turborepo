import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

type Story = {
  id: string;
  username: string;
  avatar: string;
};

const mockStories: Story[] = [
  {
    id: "1",
    username: "john_doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    username: "jane_doe",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    username: "john_doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "4",
    username: "jane_doe",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "5",
    username: "john_doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "6",
    username: "jane_doe",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

export const Stories = () => {
  return (
    <Card className="p-4">
      <div className="flex space-x-4 overflow-x-auto  pb-2">
        {mockStories?.map((story) => (
          <div
            key={story?.id}
            className="flex flex-col items-center space-y-1 shrink-0"
          >
            <div className="relative">
              <div className="p-0.5 rounded-full bg-linear-to-tr from-yellow-400 to-fuchsia-600 bg-gray-200">
                <Image
                  src={story?.avatar}
                  alt={story?.username}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>
            <span className="text-xs text-center w-16 truncate">
              {story?.username}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
