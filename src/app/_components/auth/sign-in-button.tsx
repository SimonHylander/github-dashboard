"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      type="button"
      className="text-2xl font-bold"
      onClick={() => signIn("github")}
    >
      Signin with Github
    </button>
  );
}
