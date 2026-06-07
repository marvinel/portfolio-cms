"use client";

import { useRouter } from "next/navigation";

export default function MarkReadButton({ id }: { id: string }) {
  const router = useRouter();

  const handleMarkRead = async () => {
    await fetch(`/api/messages/${id}`, { method: "PUT" });
    router.refresh();
  };

  return (
    <button
      onClick={handleMarkRead}
      className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
    >
      Mark read
    </button>
  );
}
