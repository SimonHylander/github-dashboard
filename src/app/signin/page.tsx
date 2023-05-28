"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#65CCB8] via-[#65CCB8] to-[#65CCB8] p-4 text-[#182628]">
      <button
        type="button"
        className="text-2xl font-bold"
        onClick={() => signIn("github")}
      >
        Signin with Github
      </button>
    </div>
  );
}
