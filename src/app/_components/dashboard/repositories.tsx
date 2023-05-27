"use client";

import Image from "next/image";
import Link from "next/link";
import { GithubRepository } from "~/github/github";

import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";

export const Repositories = async ({
  repositories,
}: {
  repositories: GithubRepository[];
}) => {
  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="grid grid-cols-4 gap-4" ref={parent}>
      {repositories.map((repository, i) => (
        <Link
          key={i}
          className="flex items-center gap-4 rounded-md border border-[#444c56] bg-[#22272e] p-4 hover:bg-[#1c2128]"
          href={repository.html_url}
          target="_blank"
        >
          <Image
            src={repository.owner.avatar_url}
            alt={repository.name}
            width={20}
            height={20}
            className="rounded"
            style={{ height: 20 }}
          />
          <h3 className="text-2xl font-bold">{repository.name}</h3>
        </Link>
      ))}
    </div>
  );
};
