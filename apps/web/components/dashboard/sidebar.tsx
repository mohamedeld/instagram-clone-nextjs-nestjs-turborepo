"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Card } from "../ui/card";
import { authClient } from "@/lib/auth/client";
import { ModeToggle } from "../toggle-mode";
import { Button } from "../ui/button";
import { SuggestedUsers } from "./suggested-users";
import AvatarUpload from "./avatar-photot";
import { getImageUrl } from "@/utils/getImageUrl";

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
          <div className="relative">
            {session?.user.image ? (
              <Image
                src={getImageUrl(session?.user.image) ?? ""}
                alt="Your profile"
                width={60}
                height={60}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <AvatarUpload />
          </div>
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
