"use client";

import Link from "next/link";

import Image from "next/image";
import { ScrollArea } from "~/ui/scroll-area";

import AddRepositories from "~/components/add-repositories";
import { Input } from "~/ui/input";
import { Repository } from "~/github/github";
import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";

import { Plus, FileText } from "react-feather";

export default function RepositoryList({ groups }: { groups: Repository[] }) {
  const [search, setSearch] = useState<string>();
  console.log(search);

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<string>();

  const [notes] = useState([
    {
      id: 1,
      name: "untitled note",
    },
    {
      id: 2,
      name: "untitled note",
    },
    {
      id: 3,
      name: "untitled note",
    },
    {
      id: 4,
      name: "untitled note",
    },
    {
      id: 5,
      name: "untitled note",
    },
    {
      id: 6,
      name: "untitled note",
    },
  ]);

  return (
    <div className="flex w-[25%] flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="transition-color flex w-[100px] items-center justify-center gap-2 rounded-lg bg-slate-800 p-2 duration-200 hover:bg-slate-700">
          <Plus />
          New
        </DialogTrigger>
        <DialogContent className="bg-slate-800 p-0 text-white">
          <DialogHeader className="p-6">
            <DialogTitle>
              {product ? "Edit bookmark" : "Add bookmark"}
            </DialogTitle>
            <DialogDescription>
              {product ? "Edit the" : "Add a"} bookmark.
            </DialogDescription>
          </DialogHeader>

          <div className="mb-6 flex flex-col">
            <div className="p-4 text-[#F2F2F2]">Notes</div>

            <button
              type="button"
              className="flex items-center justify-between p-4 text-xs text-[#F2F2F2] hover:bg-[#65CCB8]"
            >
              <div className="flex items-center gap-4">
                <FileText />
                <div className="text-[#F2F2F2]">untitled note</div>
              </div>

              <div>Last modified today</div>
            </button>
          </div>

          <div className="mb-6 flex w-full flex-col text-[#F2F2F2]">
            <div className="p-4">Notes</div>

            <div className="flex gap-4 px-4 text-xs">
              <div className="grid grid-cols-6">
                {notes.map(() => (
                  <div className="group flex w-[100px] flex-col items-center gap-4">
                    <FileText />
                    <div className="opacity-0 transition ease-in-out group-hover:opacity-100">
                      untitled note
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ScrollArea className="flex h-[420px] flex-col gap-4 rounded-md border border-[#3B945E] bg-slate-800 p-4 text-white">
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

              <h3 className="text-2xl font-bold">{group.owner}</h3>
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
                    className="text-xl font-semibold text-slate-400"
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
  );
}
