"use client";

import Image from "next/image";
import Link from "next/link";
import { GithubRepository } from "~/github/github";

import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/button";

import { Plus } from "react-feather";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";

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
import { useZodForm } from "~/utils/form";
import { api } from "~/trpc/client";

export const Repositories = async ({
  repositories,
}: {
  repositories: GithubRepository[];
}) => {
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<string>();

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="grid grid-cols-4 gap-4" ref={parent}>
      {repositories.map((repository, i) => (
        <Link
          key={i}
          className="transition-color flex flex-col items-center gap-4 rounded-lg border-2 border-gray-500 bg-slate-800 p-4 duration-200 hover:bg-slate-700"
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
          <h2 className="text-2xl font-bold">{repository.name}</h2>
        </Link>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="transition-color flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-gray-500 bg-slate-500 p-4 duration-200 ">
          <Plus />
        </DialogTrigger>
        <DialogContent className="bg-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {product ? "Edit bookmark" : "Add bookmark"}
            </DialogTitle>
            <DialogDescription>
              {product ? "Edit the" : "Add a"} bookmark.
            </DialogDescription>
          </DialogHeader>

          <BookmarkForm toggle={() => {
            setOpen(false);

            if (product) {
              setProduct(undefined);
            }
          }}>
          </BookmarkForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};



function BookmarkForm ({ toggle }: { toggle: () => void }) {
  const [productId, setProductId] = useState<string>("");

  const { data: products } = api.product.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const form = useZodForm({
    schema: bookmarkSchema,
  });

  const { errors } = form.formState;

  const utils = api.useContext();

  const { data: plans } = api.plan.getByProductId.useQuery(
    { productId },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: !!productId,
    }
  );

  const { mutate: addProduct } = api.license.add.useMutation({
    onSuccess: () => {
      form.reset();
      toggle();
      utils.license.list.invalidate();
    },
  });

  const onSubmit = (data: z.infer<typeof licenseSchema>) => {
    addProduct(data);
  };

  console.log(errors);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identifier</FormLabel>
              <FormControl>
                <Input placeholder="Identifier" {...field} />
              </FormControl>
              <FormDescription>Your user identifier</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Product</FormLabel>
          <FormControl>
            <Select onValueChange={(e) => setProductId(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product" />
              </SelectTrigger>

              <SelectContent>
                {products?.map((product, i) => (
                  <SelectItem value={product.id} key={i}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Plan</FormLabel>
          <FormControl>
            <Select onValueChange={(planId) => form.setValue("planId", planId)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>

              <SelectContent>
                {plans?.map((plan, i) => (
                  <SelectItem value={plan.id} key={i}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit">Save</Button>
      </form>
    </Form>
}