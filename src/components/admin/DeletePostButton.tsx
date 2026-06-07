"use client";

import { useRouter } from "next/navigation";

interface DeletePostButtonProps {
  id: string;
  title: string;
}

export default function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-gray-500 hover:text-red-400 text-sm cursor-pointer transition-colors"
    >
      Delete
    </button>
  );
}
