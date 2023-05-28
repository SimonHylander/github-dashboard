"use client";

import Link from "next/link";

import Image from "next/image";
import { ScrollArea } from "~/ui/scroll-area";

import AddRepositories from "~/components/add-repositories";
import { Input } from "~/ui/input";
import { Repository } from "~/github/github";
import { useMemo, useState } from "react";

export default function RepositoryList({ groups }: { groups: Repository[] }) {
  const [search, setSearch] = useState<string>();
  console.log(search);

  return (
    <ScrollArea className="flex h-[420px] w-[25%] flex-col gap-4 rounded-md border border-[#444c56] bg-[#22272e] p-4 text-[#F2F2F2]">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 border border-[#444c56]"
      />

      {groups.map((group, i) => (
        <div className="mb-4 flex flex-col gap-2" key={i}>
          <div className="flex items-center gap-2">
            <Image
              src={group.ownerAvatar}
              alt={group.owner}
              width={20}
              height={20}
              className="rounded"
              style={{ height: 20 }}
            />

            <h3 className="text-2xl font-bold text-[#adbac7]">{group.owner}</h3>
          </div>

          <div className="flex flex-col">
            {(search
              ? group.repositories.filter((repo) =>
                  repo.name.toLowerCase().includes(search.toLowerCase())
                )
              : group.repositories
            ).map((repository, i) => (
              <div className="flex gap-2" key={i}>
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
  );
}
