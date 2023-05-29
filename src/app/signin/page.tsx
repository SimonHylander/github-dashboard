import SignInButton from "../_components/auth/sign-in-button";
import { getServerAuthSession } from "~/server/auth";

import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session && session.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#65CCB8] p-4 text-[#182628]">
      <SignInButton />
    </div>
  );
}
