import { z } from "zod";

import { Repository, getRepositories, getUser } from "~/github/github";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const createPost = protectedProcedure
  .input(z.object({ repositoryId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.post.create({
      data: {
        repositoryId: input.repositoryId,
        order: 0,
        createdBy: { connect: { id: ctx.session.user.id } },
      },
    });
  });

export const postRouter = createTRPCRouter({
  repositories: protectedProcedure.query(async ({ ctx, input }) => {
    let repositoryGroups: Repository[] = [];

    const userId = ctx.session.user.id;

    const account = await ctx.prisma.account.findFirst({
      where: {
        userId,
      },
    });

    if (account && account.access_token) {
      // const githubUser = await getUser(account.access_token);
      repositoryGroups = await getRepositories(account.access_token);
    }

    return repositoryGroups;
  }),

  create: createPost,

  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
