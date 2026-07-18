"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Camera, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePhotoUpload } from "@/hooks/use-photo-upload";
import { authClient } from "@/lib/auth/client";
import { trpc } from "@/lib/trpc/client";
import { getImageUrl } from "@/utils/getImageUrl";
import FileUploadArea from "./file-upload-area";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentAvatar?: string | null;
}

export default function AvatarUpload({ currentAvatar }: AvatarUploadProps) {
  const utils = trpc.useUtils();
  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const uploadResponse = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });
    console.log("first", uploadResponse);
    if (!uploadResponse.ok) {
      toast.error(uploadResponse?.statusText || "Failed to upload avatar");
      throw new Error("Failed to upload avatar");
    }

    const { filename } = await uploadResponse.json();
    await authClient.updateUser({ image: filename });
    await utils.postsRouter.finalAll.refetch();
  };
  const { state, setState, handleFileSelect, handleUpload, clearSelection } =
    usePhotoUpload(handleAvatarUpload);
  const { preview, isUploading } = state;

  return (
    <Dialog
      open={state.open}
      onOpenChange={(open) => setState({ ...state, open })}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setState({ ...state, open: true })}
          title="Change avatar"
          className="absolute bottom-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full p-1 hover:bg-primary/90"
        >
          <Camera className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        {!preview ? (
          <div>
            <div className="space-y-4">
              {currentAvatar && (
                <div className="flex justify-center">
                  <Image
                    src={getImageUrl(currentAvatar) ?? ""}
                    alt="Current avatar"
                    height={64}
                    width={64}
                    className="w-24 h-24 rounded-full object-cover border-2 border-muted"
                  />
                </div>
              )}
              <FileUploadArea onFileSelect={handleFileSelect} />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={preview}
                  alt="Preivew"
                  height={64}
                  width={64}
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-2 -right-2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
                  onClick={clearSelection}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={clearSelection}
                disabled={isUploading}
              >
                Back
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Updating..." : "Update Avatar"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
