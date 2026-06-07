"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
    >
      Sign Out
    </button>
  );
}
