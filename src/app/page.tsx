import Link from "next/link";
import { createPost } from "~/app/actions";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Button } from "~/ui/button";

import { GithubRepository, getRepositories } from "~/github/github";

export default async function Home() {
  const session = await getServerAuthSession();

  let repositories: GithubRepository[] = [];
  if (session?.user.id) {
    repositories = await getRepositories(session.user.id);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1c2128]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {repositories.map((repository, i) => (
            <Link
              key={i}
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">{repository.name}</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>

          {/* @ts-expect-error - Async Server Component */}
          {/* <CrudShowcase /> */}
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  console.log("I run on the server");
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.text}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <form action={createPost} className="flex flex-col gap-2">
        <input
          type="text"
          name="text"
          placeholder="Title"
          className="w-full rounded bg-primary p-2 text-background"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
