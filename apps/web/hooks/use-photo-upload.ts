"use client";
import { trpc } from "@/lib/trpc/client";
import { useState } from "react";
import { toast } from "sonner";

export const usePhotoUpload = (
  onSubmit: (file: File, caption?: string) => Promise<void>,
  isPost?: boolean,
) => {
  const [state, setState] = useState({
    open: false,
    preview: "",
    selectedFile: null as File | null,
    isUploading: false,
    caption: "",
  });

  const handleFileSelect = (file: File) => {
    setState((prev) => ({ ...prev, selectedFile: file }));
    const reader = new FileReader();
    reader.onload = () => {
      setState((prev) => ({ ...prev, preview: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const clearSelection = () => {
    setState((prev) => ({
      ...prev,
      selectedFile: null,
      preview: "",
      caption: "",
      open: false,
    }));
  };

  const handleUpload = async () => {
    if (!state?.selectedFile || (isPost && !state.caption.trim())) return;

    setState((prev) => ({ ...prev, isUploading: true }));
    try {
      const result = await onSubmit(state.selectedFile, state.caption.trim());
      clearSelection();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
      console.error("Error creating post", err);
    } finally {
      setState((prev) => ({ ...prev, isUploading: false }));
    }
  };
  return {
    state,
    setState,
    handleFileSelect,
    handleUpload,
    clearSelection,
  };
};
