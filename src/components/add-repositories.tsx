"use client";

import { api } from "~/trpc/client";

import { Plus } from "react-feather";
import { GithubRepository } from "~/github/github";
import { useRouter } from "next/navigation";

export default function AddRepositories({
  repository,
}: {
  repository: GithubRepository;
}) {
  const router = useRouter();

  const mutation = api.post.create;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          mutation.mutate({ repositoryId: repository.id }).then((r) => {
            router.refresh();
          });
        }}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-400"
      >
        <Plus className="h-4 w-4 text-slate-400" />
      </button>
    </div>
  );
}
