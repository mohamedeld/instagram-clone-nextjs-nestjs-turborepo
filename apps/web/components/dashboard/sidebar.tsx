"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Card } from "../ui/card";
import { authClient } from "@/lib/auth/client";
import { ModeToggle } from "../toggle-mode";
import { Button } from "../ui/button";
import { SuggestedUsers } from "./suggested-users";

export const Sidebar = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User Avatar"
            width={60}
            height={60}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{session?.user?.email}</div>
            <div className="text-sm text-muted-foreground truncate">
              {session?.user?.name}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
              title="Sign Out"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
      <SuggestedUsers />
    </div>
  );
};
