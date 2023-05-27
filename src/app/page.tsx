import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import Image from "next/image";
import { ScrollArea } from "~/ui/scroll-area";
import { Repositories } from "./_components/dashboard/repositories";
import { Suspense } from "react";
import { LoadingPage } from "~/components/loading";

import AddRepositories from "~/components/add-repositories";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center gap-2 bg-[#1c2128]"></div>
    );
  }

  const repositoryGroups = await api.post.repositories.query();

  const posts = await api.post.list.query();
  const repoIds = posts.map((p) => p.repositoryId);

  const repositories = repositoryGroups
    .flatMap((group) => group.repositories)
    .filter((r) => repoIds.includes(r.id));

  return (
    <main className="flex min-h-screen flex-col bg-[#1c2128] px-4 text-white">
      <div className="flex flex-col gap-12 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight  sm:text-[5rem]">
          Github <span className="text-[#adbac7]">T3</span> App
        </h1>

        <div className="flex gap-4">
          <div className="w-[80%]">
            <Suspense fallback={<LoadingPage />}>
              {/* @ts-expect-error - Async Server Component */}
              <Repositories repositories={repositories} />
            </Suspense>
          </div>

          <ScrollArea className="flex h-[420px] w-[25%] flex-col gap-4 rounded-md border border-[#444c56] bg-[#22272e] p-4 text-white">
            {repositoryGroups.map((group, i) => (
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={group.ownerAvatar}
                    alt={group.owner}
                    width={20}
                    height={20}
                    className="rounded"
                    style={{ height: 20 }}
                  />

                  <h3 className="text-2xl font-bold text-[#adbac7]">
                    {group.owner}
                  </h3>
                </div>

                <div className="flex flex-col">
                  {group.repositories.map((repository, i) => (
                    <div className="flex gap-2">
                      <AddRepositories repository={repository} />

                      <Link
                        key={i}
                        href={repository.html_url}
                        target="_blank"
                        className="text-xl font-semibold"
                      >
                        {repository.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}

/* async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.list.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        latestPost.map((p, i) => (
          <p className="truncate">Your most recent post: {p.id}</p>
        ))
      ) : (
        <p>You have no posts yet.</p>
      )}

      <form action={createPost} className="flex flex-col gap-2">
        <input
          type="text"
          name="repositoryId"
          placeholder="Title"
          className="w-full rounded bg-primary p-2 text-background"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
 */
