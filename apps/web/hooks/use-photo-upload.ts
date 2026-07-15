"use client";
import { useState } from "react";

export const usePhotoUpload = () => {
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
    }));
  };
  const handleCreatePost = async (file: File, caption: string) => {
    const formData = new FormData();
    formData.append("image", file);

    const uploadResponse = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }

    const { filename } = await uploadResponse.json();
    //   await createPost.mutateAsync({
    //     image: filename,
    //     caption,
    //   });
  };

  const handleUpload = async () => {
    if (!state?.selectedFile || !state.caption.trim()) return;

    setState((prev) => ({ ...prev, isUploading: true }));
    try {
      await handleCreatePost(state.selectedFile, state.caption.trim());
      clearSelection();
    } catch (err) {
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
