"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import FileUploadArea from "./file-upload-area";
import { usePhotoUpload } from "@/hooks/use-photo-upload";
import { Plus, X } from "lucide-react";
import { Label } from "../ui/label";
import { Fab } from "../fab";

export const PhotoUpload = () => {
  const { state, setState, handleFileSelect, handleUpload, clearSelection } =
    usePhotoUpload();
  return (
    <Dialog
      open={state.open}
      onOpenChange={(open) => setState((prev) => ({ ...prev, open }))}
    >
      <DialogTrigger>
        <Fab onClick={() => setState((prev) => ({ ...prev, open: true }))}>
          <Plus className="h-6 w-6" />
        </Fab>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create new Post</DialogTitle>
        </DialogHeader>
        {!state?.preview ? (
          <FileUploadArea onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={state?.preview}
                alt="Preview"
                height={64}
                width={64}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                onClick={clearSelection}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <textarea
                id="caption"
                placeholder="Write a caption..."
                value={state.caption}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, caption: e.target.value }))
                }
                rows={3}
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={clearSelection}
                disabled={state.isUploading}
              >
                Back
              </Button>
              <Button
                onClick={handleUpload}
                disabled={state.isUploading || !state.caption.trim()}
              >
                Share
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
