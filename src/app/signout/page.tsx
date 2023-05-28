"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    // signOut();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#65CCB8] via-[#65CCB8] to-[#65CCB8] p-4 text-[#182628]"></div>
  );
}
