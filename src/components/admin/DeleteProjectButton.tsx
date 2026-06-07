"use client";

import { useRouter } from "next/navigation";

interface DeleteProjectButtonProps {
  id: string;
  title: string;
}

export default function DeleteProjectButton({ id, title }: DeleteProjectButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    await fetch(`/api/projects/${id}`, { method: "DELETE" });
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
