export const getImageUrl = (filename?: string | null) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl || !filename?.trim()) {
    return null;
  }

  return `${apiUrl}/uploads/images/${filename}`;
};
